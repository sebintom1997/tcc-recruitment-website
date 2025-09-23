import { NextRequest, NextResponse } from "next/server"
import { createPresignedPostForCV } from "@/lib/s3"

export async function POST(request: NextRequest) {
  try {
    const { filename, fileType } = await request.json()

    if (!filename || !fileType) {
      return NextResponse.json(
        { error: "Filename and file type are required" },
        { status: 400 }
      )
    }

    const presignedPost = await createPresignedPostForCV(filename, fileType)

    return NextResponse.json({
      success: true,
      data: presignedPost,
    })
  } catch (error) {
    console.error("Error creating presigned post:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to create upload URL", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}
