// Dynamic job management with GoHighLevel integration
import { Job } from './jobs'

interface GHLOpportunity {
  name: string
  description?: string
  customFields?: {
    location?: string
    department?: string
    workType?: string
    experience?: string
    jobDescription?: string
  }
  tags?: string[]
  dateAdded: string
}

interface GHLResponse {
  opportunities: GHLOpportunity[]
}

// This would replace the static JSON file approach
export async function getJobsFromGoHighLevel(): Promise<Job[]> {
  try {
    // Call GoHighLevel API to fetch jobs
    const response = await fetch(`${process.env.GHL_BASE_URL}/opportunities`, {
      headers: {
        'Authorization': `Bearer ${process.env.GHL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs from GoHighLevel')
    }
    
    const data: GHLResponse = await response.json()
    
    // Transform GoHighLevel opportunities to Job format
    return data.opportunities
      .filter((opp) => opp.tags?.includes('job-posting'))
      .map((opp) => transformGHLToJob(opp))
  } catch (error) {
    console.error('Error fetching jobs from GoHighLevel:', error)
    // Fallback to static jobs if API fails
    return []
  }
}

function transformGHLToJob(ghlOpportunity: GHLOpportunity): Job {
  return {
    slug: generateSlug(ghlOpportunity.name),
    title: ghlOpportunity.name,
    pitch: ghlOpportunity.description?.substring(0, 200) || '',
    location: ghlOpportunity.customFields?.location || 'Remote',
    dept: (ghlOpportunity.customFields?.department as Job["dept"]) || 'Other',
    workType: (ghlOpportunity.customFields?.workType as Job["workType"]) || 'Full-time',
    experience: (ghlOpportunity.customFields?.experience as Job["experience"]) || 'Mid-level',
    tags: ghlOpportunity.tags?.filter((tag: string) => tag !== 'job-posting') || [],
    postedAt: ghlOpportunity.dateAdded,
    description: ghlOpportunity.customFields?.jobDescription || '',
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
