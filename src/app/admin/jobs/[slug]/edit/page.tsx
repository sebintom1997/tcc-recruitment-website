"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { X } from "lucide-react"
import { Job } from "@/lib/jobs"

const DEPARTMENTS = ["Engineering", "Data", "Design", "Product", "Marketing", "Operations", "Other"]
const WORK_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]
const EXPERIENCE_LEVELS = ["Graduate", "Mid-level", "Senior", "Executive"]

interface EditJobPageProps {
  params: Promise<{ slug: string }>
}

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter()
  const [slug, setSlug] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [formData, setFormData] = useState<Omit<Job, "slug" | "postedAt">>({
    title: "",
    pitch: "",
    location: "",
    dept: "Engineering",
    workType: "Full-time",
    experience: "Mid-level",
    tags: [],
    description: "",
  })

  useEffect(() => {
    const fetchJobData = async (jobSlug: string) => {
      try {
        const response = await fetch(`/api/admin/jobs/${jobSlug}`)
        if (response.ok) {
          const data = await response.json()
          const { slug, postedAt, ...jobData } = data.job
          setFormData(jobData)
        } else {
          alert("Job not found")
          router.push("/admin/jobs")
        }
      } catch (error) {
        console.error("Error fetching job:", error)
        alert("Error loading job")
        router.push("/admin/jobs")
      } finally {
        setIsLoading(false)
      }
    }

    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
      fetchJobData(resolvedParams.slug)
    }
    getParams()
  }, [params, router])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/jobs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/jobs")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to update job")
      }
    } catch (error) {
      console.error("Error updating job:", error)
      alert("Error updating job")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading job...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <p className="text-muted-foreground">
          Update the job details below
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Senior Full Stack Engineer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pitch">Job Pitch *</Label>
                <Textarea
                  id="pitch"
                  value={formData.pitch}
                  onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                  placeholder="A compelling one-liner that describes this role..."
                  rows={3}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This appears as the job summary on listings
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Remote, New York, Hybrid"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dept">Department *</Label>
                  <Select 
                    value={formData.dept} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, dept: value as Job["dept"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workType">Work Type *</Label>
                  <Select 
                    value={formData.workType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, workType: value as Job["workType"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {WORK_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select 
                    value={formData.experience} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value as Job["experience"] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="tags">Skills/Technologies</Label>
                <div className="flex gap-2 mt-1 mb-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g. React, Node.js, TypeScript"
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Add relevant skills, technologies, or keywords
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Write the full job description here. You can use Markdown formatting..."
                  rows={15}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Supports Markdown formatting. Include sections like Mission, Impact, Requirements, Perks, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Job"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/admin/jobs")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
