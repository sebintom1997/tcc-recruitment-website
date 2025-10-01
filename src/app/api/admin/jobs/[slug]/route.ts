import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { Job } from "@/lib/jobs"

const JOBS_FILE_PATH = path.join(process.cwd(), "data", "jobs.json")

// Helper function to read jobs from file
function readJobsFromFile(): Job[] {
  try {
    const fileContent = fs.readFileSync(JOBS_FILE_PATH, "utf-8")
    return JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading jobs file:", error)
    return []
  }
}

// Helper function to write jobs to file
function writeJobsToFile(jobs: Job[]): void {
  try {
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2))
  } catch (error) {
    console.error("Error writing jobs file:", error)
    throw new Error("Failed to save jobs")
  }
}

// GET /api/admin/jobs/[slug] - Get specific job
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const jobs = readJobsFromFile()
    const job = jobs.find(j => j.slug === slug)

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ job })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/jobs/[slug] - Update job
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const jobs = readJobsFromFile()
    const jobIndex = jobs.findIndex(j => j.slug === slug)

    if (jobIndex === -1) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    // Update job but keep the original slug and postedAt
    const updatedJob: Job = {
      ...body,
      slug: jobs[jobIndex].slug,
      postedAt: jobs[jobIndex].postedAt,
    }

    jobs[jobIndex] = updatedJob
    writeJobsToFile(jobs)

    return NextResponse.json({ job: updatedJob })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/jobs/[slug] - Delete job
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const jobs = readJobsFromFile()
    const jobIndex = jobs.findIndex(j => j.slug === slug)

    if (jobIndex === -1) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    jobs.splice(jobIndex, 1)
    writeJobsToFile(jobs)

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
}
