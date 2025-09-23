import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { S3Client } from "@aws-sdk/client-s3"

const S3_BUCKET = process.env.S3_BUCKET
const S3_REGION = process.env.S3_REGION || "us-east-1"
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY

export type PresignedPostData = {
  url: string
  fields: Record<string, string>
}

export type S3UploadConfig = {
  bucket?: string
  region?: string
  maxFileSize?: number
  allowedFileTypes?: string[]
  expiresIn?: number
  keyPrefix?: string
}

class S3Error extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = "S3Error"
  }
}

function getS3Client(): S3Client {
  if (!S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    throw new S3Error("S3 credentials are not configured")
  }

  return new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  })
}

export async function createPresignedPostForCV(
  filename: string,
  fileType: string,
  config: S3UploadConfig = {}
): Promise<PresignedPostData> {
  try {
    if (!S3_BUCKET) {
      throw new S3Error("S3 bucket is not configured")
    }

    // Validate file type
    const allowedTypes = config.allowedFileTypes || [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(fileType)) {
      throw new S3Error(`File type ${fileType} is not allowed. Allowed types: ${allowedTypes.join(", ")}`)
    }

    const client = getS3Client()
    const maxFileSize = config.maxFileSize || 10 * 1024 * 1024 // 10MB default
    const expiresIn = config.expiresIn || 3600 // 1 hour default
    
    // Generate unique key with timestamp and sanitized filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_")
    const key = `${config.keyPrefix || "cvs/"}${timestamp}-${sanitizedFilename}`

    const presignedPost = await createPresignedPost(client, {
      Bucket: S3_BUCKET,
      Key: key,
      Fields: {
        "Content-Type": fileType,
      },
      Conditions: [
        ["content-length-range", 0, maxFileSize],
        ["eq", "$Content-Type", fileType],
      ],
      Expires: expiresIn,
    })

    return {
      url: presignedPost.url,
      fields: presignedPost.fields,
    }
  } catch (error) {
    console.error("Error creating presigned post:", error)
    if (error instanceof S3Error) {
      throw error
    }
    throw new S3Error(`Failed to create presigned post: ${error instanceof Error ? error.message : "Unknown error"}`, error)
  }
}

export function getFileUrl(bucket: string, key: string, region?: string): string {
  const s3Region = region || S3_REGION
  return `https://${bucket}.s3.${s3Region}.amazonaws.com/${key}`
}

export function extractKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    // Handle both path-style and virtual-hosted-style URLs
    const pathname = urlObj.pathname
    return pathname.startsWith("/") ? pathname.slice(1) : pathname
  } catch {
    return null
  }
}

export function validateFileForUpload(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]
  const allowedExtensions = [".pdf", ".doc", ".docx"]

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
    }
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "File must be a PDF, DOC, or DOCX document",
    }
  }

  // Check file extension as additional validation
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: "File must have a .pdf, .doc, or .docx extension",
    }
  }

  return { valid: true }
}

// Upload file directly to S3 using presigned post
export async function uploadFileToS3(
  file: File,
  presignedPost: PresignedPostData,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    
    // Add all fields from presigned post
    Object.entries(presignedPost.fields).forEach(([key, value]) => {
      formData.append(key, value)
    })
    
    // Add the file last
    formData.append("file", file)

    const xhr = new XMLHttpRequest()

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      })
    }

    xhr.addEventListener("load", () => {
      if (xhr.status === 204) {
        // S3 returns 204 for successful uploads
        const fileUrl = `${presignedPost.url}/${presignedPost.fields.key}`
        resolve(fileUrl)
      } else {
        reject(new S3Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`))
      }
    })

    xhr.addEventListener("error", () => {
      reject(new S3Error("Upload failed due to network error"))
    })

    xhr.addEventListener("abort", () => {
      reject(new S3Error("Upload was aborted"))
    })

    xhr.open("POST", presignedPost.url)
    xhr.send(formData)
  })
}

// Utility function to check if S3 is properly configured
export function isS3Configured(): boolean {
  return !!(S3_BUCKET && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY)
}

export { S3Error }
