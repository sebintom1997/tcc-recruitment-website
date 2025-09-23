import jobsData from "@/data/jobs.json"

export type Job = {
  slug: string
  title: string
  pitch: string
  location: string
  dept: "Engineering" | "Data" | "Design" | "Product" | "Marketing" | "Operations" | "Other"
  workType: "Full-time" | "Part-time" | "Contract" | "Internship"
  experience: "Graduate" | "Mid-level" | "Senior" | "Executive"
  tags: string[]
  postedAt: string
  description: string
  applyExternalUrl?: string
}

export type JobFilters = {
  dept?: string[]
  workType?: string[]
  experience?: string[]
  query?: string
}

export function getAllJobs(): Job[] {
  return jobsData as Job[]
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobsData.find((job) => job.slug === slug) as Job | undefined
}

export function getRecentJobs(limit: number = 6): Job[] {
  return jobsData
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, limit) as Job[]
}

export function filterJobs(filters: JobFilters): Job[] {
  let filteredJobs = jobsData as Job[]

  // Filter by query (searches title, pitch, and tags)
  if (filters.query && filters.query.trim()) {
    const searchTerm = filters.query.toLowerCase()
    filteredJobs = filteredJobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.pitch.toLowerCase().includes(searchTerm) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      job.location.toLowerCase().includes(searchTerm)
    )
  }

  // Filter by department
  if (filters.dept && filters.dept.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.dept!.includes(job.dept))
  }

  // Filter by work type
  if (filters.workType && filters.workType.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.workType!.includes(job.workType))
  }

  // Filter by experience level
  if (filters.experience && filters.experience.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.experience!.includes(job.experience))
  }

  return filteredJobs
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Today"
  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  
  return date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  })
}

export function getDepartments(): string[] {
  return ["Engineering", "Data", "Design", "Product", "Marketing", "Operations", "Other"]
}

export function getWorkTypes(): string[] {
  return ["Full-time", "Part-time", "Contract", "Internship"]
}

export function getExperienceLevels(): string[] {
  return ["Graduate", "Mid-level", "Senior", "Executive"]
}

// Get unique tags from all jobs
export function getAllTags(): string[] {
  const tags = new Set<string>()
  jobsData.forEach((job) => {
    job.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
