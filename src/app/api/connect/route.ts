import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createTalentPoolEntry } from "@/lib/highlevel"
import { isValidUrl } from "@/lib/utils"

const connectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  goals: z.string().min(10, "Please provide more detail about your goals"),
  cvUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = connectSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.issues 
        },
        { status: 400 }
      )
    }

    const { name, email, interests, goals, cvUrl } = validationResult.data

    // Create talent pool entry in HighLevel
    const result = await createTalentPoolEntry(
      name,
      email,
      interests,
      goals,
      undefined, // linkedinUrl removed
      cvUrl
    )

    return NextResponse.json({
      success: true,
      message: "Successfully added to talent pool",
      data: result,
    })
  } catch (error) {
    console.error("Error creating talent pool entry:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to submit your information", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}
