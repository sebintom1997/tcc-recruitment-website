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

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// GET /api/admin/jobs - Get all jobs
export async function GET() {
  try {
    const jobs = readJobsFromFile()
    return NextResponse.json({ jobs })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    )
  }
}

// POST /api/admin/jobs - Create new job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const jobs = readJobsFromFile()

    // Create new job with generated slug
    const newJob: Job = {
      ...body,
      slug: generateSlug(body.title),
      postedAt: new Date().toISOString(),
    }

    // Check if slug already exists
    const existingJob = jobs.find(job => job.slug === newJob.slug)
    if (existingJob) {
      return NextResponse.json(
        { error: "A job with this title already exists" },
        { status: 400 }
      )
    }

    jobs.push(newJob)
    writeJobsToFile(jobs)

    return NextResponse.json({ job: newJob }, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    )
  }
}
