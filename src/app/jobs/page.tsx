"use client"

import { useState, useMemo } from "react"
import { Container } from "@/components/container"
import { SearchInput } from "@/components/search-input"
import { JobFilterBar } from "@/components/job-filter-bar"
import { JobCard } from "@/components/job-card"
import { EmptyState } from "@/components/empty-state"
import { getAllJobs, filterJobs, type JobFilters } from "@/lib/jobs"

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({ query: "" })
  const allJobs = getAllJobs()
  
  const filteredJobs = useMemo(() => {
    return filterJobs(filters)
  }, [filters])

  const handleSearchChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }))
  }

  const handleFiltersChange = (newFilters: JobFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="py-12 md:py-16">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Role
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover opportunities that match your skills, values, and career aspirations from our curated selection of world-class companies.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md">
            <SearchInput
              value={filters.query || ""}
              onChange={handleSearchChange}
              placeholder="Search by title, company, or skills..."
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <JobFilterBar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            totalJobs={allJobs.length}
            filteredCount={filteredJobs.length}
          />
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.slug} job={job} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No jobs match your criteria"
            description="Try adjusting your search terms or filters, or let us know what you're looking for."
          />
        )}
      </Container>
    </div>
  )
}

