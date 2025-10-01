"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  Building2,
  Clock,
  Users,
  Briefcase
} from "lucide-react"
import { Job } from "@/lib/jobs"

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingJob, setDeletingJob] = useState<string | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs")
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return
    }

    setDeletingJob(slug)
    try {
      const response = await fetch(`/api/admin/jobs/${slug}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setJobs(jobs.filter(job => job.slug !== slug))
      } else {
        alert("Failed to delete job")
      }
    } catch (error) {
      console.error("Error deleting job:", error)
      alert("Error deleting job")
    } finally {
      setDeletingJob(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground mb-6">
          <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Management</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Manage all job postings, create new positions, and track applications with powerful tools designed for efficiency.
        </p>
        
        <Button asChild size="lg" className="h-12 px-8">
          <Link href="/admin/jobs/new" className="flex items-center space-x-2 text-base">
            <Plus className="h-5 w-5" />
            <span>Create New Job</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{jobs.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-200 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Jobs</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">{jobs.length}</p>
              </div>
              <div className="h-12 w-12 bg-green-200 dark:bg-green-800 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Departments</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                  {new Set(jobs.map(job => job.dept)).size}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-200 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first job posting
            </p>
            <Button asChild>
              <Link href="/admin/jobs/new">Create First Job</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">All Job Positions</h2>
            <p className="text-muted-foreground">{jobs.length} jobs found</p>
          </div>
          
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.slug} className="border-0 shadow-lg bg-background/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                          <p className="text-lg text-muted-foreground leading-relaxed">{job.pitch}</p>
                        </div>
                      </div>
                      
                      {/* Job Meta */}
                      <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                        <div className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span className="font-medium">{job.dept}</span>
                        </div>
                        <div className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="font-medium">{job.workType}</span>
                        </div>
                        <div className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="font-medium">{job.experience}</span>
                        </div>
                        <div className="flex items-center bg-muted/50 rounded-lg px-3 py-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="font-medium">Posted {formatDate(job.postedAt)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3 ml-8">
                      <Button variant="outline" asChild className="h-10 px-4">
                        <Link href={`/jobs/${job.slug}`} target="_blank" className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </Link>
                      </Button>
                      
                      <Button variant="outline" asChild className="h-10 px-4">
                        <Link href={`/admin/jobs/${job.slug}/edit`} className="flex items-center space-x-2">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </Button>
                      
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(job.slug)}
                        disabled={deletingJob === job.slug}
                        className="h-10 px-4"
                      >
                        {deletingJob === job.slug ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
