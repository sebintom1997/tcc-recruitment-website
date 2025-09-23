"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Job } from "@/lib/jobs"

interface JobCardProps {
  job: Job
  index?: number
}

export function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20 hover:shadow-primary/10 group">
        <CardContent className="p-6 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{job.location}</span>
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{formatDate(job.postedAt)}</span>
              </div>
            </div>
          </div>

          {/* Pitch */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {job.pitch}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {job.dept}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {job.workType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {job.experience}
            </Badge>
          </div>

          {/* Skills tags */}
          <div className="flex flex-wrap gap-1">
            {job.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs text-muted-foreground border-muted-foreground/30"
              >
                {tag}
              </Badge>
            ))}
            {job.tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs text-muted-foreground border-muted-foreground/30"
              >
                +{job.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button asChild variant="outline" className="w-full group/btn">
            <Link href={`/jobs/${job.slug}`}>
              View Role
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
