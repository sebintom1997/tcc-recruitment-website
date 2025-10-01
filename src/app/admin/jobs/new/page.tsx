"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { X, Plus } from "lucide-react"
import { Job } from "@/lib/jobs"

const DEPARTMENTS = ["Engineering", "Data", "Design", "Product", "Marketing", "Operations", "Other"]
const WORK_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]
const EXPERIENCE_LEVELS = ["Graduate", "Mid-level", "Senior", "Executive"]

export default function NewJobPage() {
  const router = useRouter()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/jobs")
      } else {
        const error = await response.json()
        alert(error.error || "Failed to create job")
      }
    } catch (error) {
      console.error("Error creating job:", error)
      alert("Error creating job")
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

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground mb-6">
          <Plus className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Create New Job</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Fill in the details below to create a compelling job posting that attracts top talent to your organization.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center">
                <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
                </div>
                Basic Information
              </CardTitle>
              <p className="text-muted-foreground">Core details about the job position</p>
            </CardHeader>
            <CardContent className="grid gap-6 pt-0">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pitch" className="text-base font-medium">Job Pitch *</Label>
                <Textarea
                  id="pitch"
                  value={formData.pitch}
                  onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                  placeholder="A compelling one-liner that describes this role..."
                  rows={4}
                  className="text-base"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  This appears as the job summary on listings and should capture attention immediately
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Remote, New York, Hybrid"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dept" className="text-base font-medium">Department *</Label>
                  <Select 
                    value={formData.dept} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, dept: value as Job["dept"] }))}
                  >
                    <SelectTrigger className="h-12 text-base">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="workType" className="text-base font-medium">Work Type *</Label>
                  <Select 
                    value={formData.workType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, workType: value as Job["workType"] }))}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {WORK_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-base font-medium">Experience Level *</Label>
                  <Select 
                    value={formData.experience} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value as Job["experience"] }))}
                  >
                    <SelectTrigger className="h-12 text-base">
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
          <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center">
                <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
                Skills & Tags
              </CardTitle>
              <p className="text-muted-foreground">Technologies, skills, and keywords for this position</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-base font-medium">Skills/Technologies</Label>
                  <div className="flex gap-3">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g. React, Node.js, TypeScript"
                      className="h-12 text-base flex-1"
                    />
                    <Button type="button" onClick={addTag} variant="outline" className="h-12 px-6">
                      Add
                    </Button>
                  </div>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Added Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-destructive" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground">
                  Add relevant skills, technologies, or keywords that candidates should have
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center">
                <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <div className="h-4 w-4 bg-purple-600 rounded-full"></div>
                </div>
                Job Description
              </CardTitle>
              <p className="text-muted-foreground">Detailed description including requirements, responsibilities, and benefits</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">Full Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Write the full job description here. You can use Markdown formatting...

## Mission
What will this person accomplish?

## Impact
How will their work matter?

## Must-have
Required skills and experience

## Nice-to-have
Preferred but not required

## Perks
Benefits and compensation

## Process
Interview and hiring process"
                  rows={20}
                  className="text-base font-mono"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Supports Markdown formatting. Include sections like Mission, Impact, Requirements, Perks, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/8 via-accent/6 to-primary/10">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button type="submit" disabled={isSubmitting} size="lg" className="h-12 px-8 text-base">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Job...
                    </>
                  ) : (
                    "Create Job Posting"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  className="h-12 px-8 text-base"
                  onClick={() => router.push("/admin/jobs")}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
