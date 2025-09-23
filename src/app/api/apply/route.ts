import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createJobApplication, isHighLevelConfigured } from "@/lib/highlevel"
import { isValidUrl } from "@/lib/utils"

const applySchema = z.object({
  jobSlug: z.string().min(1, "Job slug is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  cvUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = applySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const { jobSlug, name, email, cvUrl } = validationResult.data

    // Check if HighLevel is configured
    if (!isHighLevelConfigured()) {
      console.log("HighLevel not configured, logging application data:", {
        jobSlug, name, email, cvUrl
      })
      
      return NextResponse.json({
        success: true,
        message: "Application received (HighLevel not configured - check server logs)",
        data: { jobSlug, name, email },
      })
    }

    // Create job application in HighLevel
    const result = await createJobApplication(
      jobSlug,
      name,
      email,
      undefined, // linkedinUrl removed
      cvUrl
    )

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully to HighLevel",
      data: result,
    })
  } catch (error) {
    console.error("Error submitting job application:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to submit application", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}
