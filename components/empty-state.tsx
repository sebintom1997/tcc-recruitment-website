import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface EmptyStateProps {
  title?: string
  description?: string
  showConnectCTA?: boolean
}

export function EmptyState({ 
  title = "No jobs found", 
  description = "Try adjusting your search criteria or explore our other opportunities.",
  showConnectCTA = true 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {showConnectCTA && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Don&apos;t see the perfect role? Let us know what you&apos;re looking for.
          </p>
          <Button asChild>
            <Link href="/connect" className="group">
              Connect with Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
