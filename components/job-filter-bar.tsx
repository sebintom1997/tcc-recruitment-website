"use client"

import { ChevronDown, X } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/src/components/ui/dropdown-menu"
import { getDepartments, getWorkTypes, getExperienceLevels } from "@/lib/jobs"
import type { JobFilters } from "@/lib/jobs"

interface JobFilterBarProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
  totalJobs: number
  filteredCount: number
}

export function JobFilterBar({ 
  filters, 
  onFiltersChange, 
  totalJobs, 
  filteredCount 
}: JobFilterBarProps) {
  const departments = getDepartments()
  const workTypes = getWorkTypes()
  const experienceLevels = getExperienceLevels()

  const handleDepartmentToggle = (dept: string) => {
    const current = filters.dept || []
    const updated = current.includes(dept)
      ? current.filter(d => d !== dept)
      : [...current, dept]
    onFiltersChange({ ...filters, dept: updated.length ? updated : undefined })
  }

  const handleWorkTypeToggle = (type: string) => {
    const current = filters.workType || []
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type]
    onFiltersChange({ ...filters, workType: updated.length ? updated : undefined })
  }

  const handleExperienceToggle = (level: string) => {
    const current = filters.experience || []
    const updated = current.includes(level)
      ? current.filter(e => e !== level)
      : [...current, level]
    onFiltersChange({ ...filters, experience: updated.length ? updated : undefined })
  }

  const clearAllFilters = () => {
    onFiltersChange({ query: filters.query })
  }

  const hasActiveFilters = (filters.dept?.length || 0) + (filters.workType?.length || 0) + (filters.experience?.length || 0) > 0

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Department Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9">
              Department
              {filters.dept && filters.dept.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1 text-xs">
                  {filters.dept.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Department</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {departments.map((dept) => (
              <DropdownMenuCheckboxItem
                key={dept}
                checked={filters.dept?.includes(dept) || false}
                onCheckedChange={() => handleDepartmentToggle(dept)}
              >
                {dept}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Work Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9">
              Work Type
              {filters.workType && filters.workType.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1 text-xs">
                  {filters.workType.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Work Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.workType?.includes(type) || false}
                onCheckedChange={() => handleWorkTypeToggle(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Experience Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9">
              Experience
              {filters.experience && filters.experience.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1 text-xs">
                  {filters.experience.length}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Experience Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {experienceLevels.map((level) => (
              <DropdownMenuCheckboxItem
                key={level}
                checked={filters.experience?.includes(level) || false}
                onCheckedChange={() => handleExperienceToggle(level)}
              >
                {level}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-9">
            <X className="h-4 w-4 mr-2" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.dept?.map((dept) => (
            <Badge key={dept} variant="secondary" className="text-xs">
              {dept}
              <button
                onClick={() => handleDepartmentToggle(dept)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.workType?.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type}
              <button
                onClick={() => handleWorkTypeToggle(type)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.experience?.map((level) => (
            <Badge key={level} variant="secondary" className="text-xs">
              {level}
              <button
                onClick={() => handleExperienceToggle(level)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredCount} of {totalJobs} jobs
        </span>
      </div>
    </div>
  )
}
