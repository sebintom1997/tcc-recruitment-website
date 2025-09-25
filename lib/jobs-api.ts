// Dynamic job management with GoHighLevel integration
import { Job } from './jobs'

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
    
    const data = await response.json()
    
    // Transform GoHighLevel opportunities to Job format
    return data.opportunities
      .filter((opp: any) => opp.tags?.includes('job-posting'))
      .map((opp: any) => transformGHLToJob(opp))
  } catch (error) {
    console.error('Error fetching jobs from GoHighLevel:', error)
    // Fallback to static jobs if API fails
    return []
  }
}

function transformGHLToJob(ghlOpportunity: any): Job {
  return {
    slug: generateSlug(ghlOpportunity.name),
    title: ghlOpportunity.name,
    pitch: ghlOpportunity.description?.substring(0, 200) || '',
    location: ghlOpportunity.customFields?.location || 'Remote',
    dept: ghlOpportunity.customFields?.department || 'Other',
    workType: ghlOpportunity.customFields?.workType || 'Full-time',
    experience: ghlOpportunity.customFields?.experience || 'Mid-level',
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

// Webhook endpoint to sync jobs when updated in GoHighLevel
export async function syncJobFromWebhook(webhookData: any) {
  // This would be called from an API route
  // Update local cache or trigger revalidation
}
