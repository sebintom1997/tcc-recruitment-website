import { notFound } from "next/navigation"
import { Metadata } from "next"
import { MapPin, Calendar, Building2, Clock, Users } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Container } from "@/components/container"
import { ApplyDrawer } from "@/components/apply-drawer"
import { getJobBySlug, getAllJobs, formatDate } from "@/lib/jobs"

interface JobPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const jobs = getAllJobs()
  return jobs.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  
  if (!job) {
    return {
      title: "Job Not Found - TCC Recruitment",
    }
  }

  return {
    title: `${job.title} - TCC Recruitment`,
    description: job.pitch,
    keywords: [job.title, job.dept, job.workType, job.experience, ...job.tags],
    openGraph: {
      title: `${job.title} - TCC Recruitment`,
      description: job.pitch,
      type: "website",
    },
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params
  const job = getJobBySlug(slug)

  if (!job) {
    notFound()
  }

  // JSON-LD structured data for job posting
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.pitch,
    hiringOrganization: {
      "@type": "Organization",
      name: "TCC Recruitment",
    },
    jobLocation: {
      "@type": "Place",
      address: job.location,
    },
    employmentType: job.workType.replace("-", "_").toUpperCase(),
    experienceRequirements: job.experience,
    skills: job.tags,
    datePosted: job.postedAt,
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />
      
      <div className="py-8 md:py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
                  
                  {/* Job Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{job.dept}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{job.workType}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Posted {formatDate(job.postedAt)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Pitch */}
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {job.pitch}
                  </p>
                </div>

                {/* Apply Button - Desktop */}
                <div className="lg:sticky lg:top-24">
                  <Card className="w-full lg:w-80">
                    <CardContent className="p-6">
                      <ApplyDrawer
                        job={job}
                        trigger={
                          <Button size="lg" className="w-full">
                            Apply for this role
                          </Button>
                        }
                      />
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Complete the application form
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mt-8 mb-4 first:mt-0">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold mt-6 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                }}
              >
                {job.description}
              </ReactMarkdown>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <Container>
          <ApplyDrawer
            job={job}
            trigger={
              <Button size="lg" className="w-full">
                Apply for this role
              </Button>
            }
          />
        </Container>
      </div>
    </>
  )
}
