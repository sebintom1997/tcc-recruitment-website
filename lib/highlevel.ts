// HighLevel (GoHighLevel) API v2 integration utilities

const GHL_BASE_URL = process.env.GHL_BASE_URL || "https://services.leadconnectorhq.com"
const GHL_API_VERSION = process.env.GHL_API_VERSION || "2021-07-28"
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID
const GHL_STAGE_ID = process.env.GHL_STAGE_ID
const GHL_TOKEN = process.env.GHL_TOKEN

// Custom field IDs for storing additional data
const GHL_CF_CV_URL = process.env.GHL_CF_CV_URL

export type Contact = {
  id?: string
  email: string
  name?: string
  phone?: string
  cvUrl?: string
  source?: string
  tags?: string[]
  customFields?: Record<string, string | number | boolean>
}

export type Opportunity = {
  id?: string
  contactId: string
  name: string
  pipelineId: string
  stageId: string
  status: "open" | "won" | "lost" | "abandoned"
  monetaryValue?: number
  assignedTo?: string
  source?: string
  notes?: string
}

class HighLevelError extends Error {
  constructor(message: string, public status?: number, public response?: unknown) {
    super(message)
    this.name = "HighLevelError"
  }
}

async function makeRequest(endpoint: string, options: RequestInit = {}) {
  if (!GHL_TOKEN) {
    throw new HighLevelError("HighLevel API token is not configured")
  }

  const url = `${GHL_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    "Authorization": `Bearer ${GHL_TOKEN}`,
    "Content-Type": "application/json",
    "Version": GHL_API_VERSION,
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new HighLevelError(
        `HighLevel API error: ${response.status} ${response.statusText}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof HighLevelError) {
      throw error
    }
    throw new HighLevelError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function searchContactByEmail(email: string): Promise<Contact | null> {
  try {
    const response = await makeRequest(`/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}`)
    
    if (response.contacts && response.contacts.length > 0) {
      const contact = response.contacts[0]
      return {
        id: contact.id,
        email: contact.email,
        name: contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.firstName || contact.lastName,
        phone: contact.phone,
        cvUrl: GHL_CF_CV_URL ? contact.customFields?.[GHL_CF_CV_URL] : undefined,
        source: contact.source,
        tags: contact.tags,
      }
    }
    
    return null
  } catch (error) {
    console.error("Error searching contact by email:", error)
    throw error
  }
}

export async function upsertContact(contactData: Contact): Promise<string> {
  try {
    // First, try to find existing contact by email
    const existingContact = await searchContactByEmail(contactData.email)
    
    const payload = {
      locationId: GHL_LOCATION_ID,
      email: contactData.email,
      firstName: contactData.name?.split(" ")[0] || "",
      lastName: contactData.name?.split(" ").slice(1).join(" ") || "",
      phone: contactData.phone || "",
      source: contactData.source || "Website",
      tags: contactData.tags || [],
      customFields: {
        ...(contactData.cvUrl && GHL_CF_CV_URL ? { [GHL_CF_CV_URL]: contactData.cvUrl } : {}),
        ...contactData.customFields,
      },
    }

    if (existingContact?.id) {
      // Update existing contact
      await makeRequest(`/contacts/${existingContact.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
      return existingContact.id
    } else {
      // Create new contact
      const response = await makeRequest("/contacts/", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      return response.contact?.id || response.id
    }
  } catch (error) {
    console.error("Error upserting contact:", error)
    throw error
  }
}

export async function createOpportunity(opportunityData: Opportunity): Promise<string> {
  try {
    const payload = {
      locationId: GHL_LOCATION_ID,
      pipelineId: opportunityData.pipelineId,
      stageId: opportunityData.stageId,
      contactId: opportunityData.contactId,
      name: opportunityData.name,
      status: opportunityData.status,
      monetaryValue: opportunityData.monetaryValue || 0,
      assignedTo: opportunityData.assignedTo,
      source: opportunityData.source || "Website",
      notes: opportunityData.notes || "",
    }

    const response = await makeRequest("/opportunities/", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    return response.opportunity?.id || response.id
  } catch (error) {
    console.error("Error creating opportunity:", error)
    throw error
  }
}

export async function createJobApplication(
  jobSlug: string,
  candidateName: string,
  candidateEmail: string,
  linkedinUrl?: string, // kept for backward compatibility but not used
  cvUrl?: string
): Promise<{ contactId: string; opportunityId: string }> {
  try {
    // Create or update contact
    const contactId = await upsertContact({
      email: candidateEmail,
      name: candidateName,
      cvUrl,
      source: "Job Application",
      tags: ["Job Applicant"],
    })

    // Create opportunity for the job application
    const opportunityId = await createOpportunity({
      contactId,
      name: `${jobSlug} — ${candidateName}`,
      pipelineId: GHL_PIPELINE_ID!,
      stageId: GHL_STAGE_ID!,
      status: "open",
      source: "Job Application",
      notes: `Applied for position: ${jobSlug}${cvUrl ? `\nCV: ${cvUrl}` : ""}`,
    })

    return { contactId, opportunityId }
  } catch (error) {
    console.error("Error creating job application:", error)
    throw error
  }
}

export async function createTalentPoolEntry(
  candidateName: string,
  candidateEmail: string,
  interests: string[],
  goals: string,
  linkedinUrl?: string, // kept for backward compatibility but not used
  cvUrl?: string
): Promise<{ contactId: string; opportunityId: string }> {
  try {
    // Create or update contact
    const contactId = await upsertContact({
      email: candidateEmail,
      name: candidateName,
      cvUrl,
      source: "Talent Pool",
      tags: ["Talent Pool", ...interests],
    })

    // Create opportunity for talent pool
    const opportunityId = await createOpportunity({
      contactId,
      name: `Talent Pool — ${candidateName}`,
      pipelineId: GHL_PIPELINE_ID!,
      stageId: GHL_STAGE_ID!,
      status: "open",
      source: "Talent Pool",
      notes: `Interests: ${interests.join(", ")}\nGoals: ${goals}${cvUrl ? `\nCV: ${cvUrl}` : ""}`,
    })

    return { contactId, opportunityId }
  } catch (error) {
    console.error("Error creating talent pool entry:", error)
    throw error
  }
}

// Utility function to check if HighLevel is properly configured
export function isHighLevelConfigured(): boolean {
  return !!(GHL_TOKEN && GHL_LOCATION_ID && GHL_PIPELINE_ID && GHL_STAGE_ID)
}

export { HighLevelError }
