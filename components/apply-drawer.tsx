"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import { Button } from "@/src/components/ui/button"
import type { Job } from "@/lib/jobs"

interface ApplyDrawerProps {
  job: Job
  trigger: React.ReactNode
}

export function ApplyDrawer({ job, trigger }: ApplyDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Load GoHighLevel form script when component mounts
  useEffect(() => {
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const script = document.createElement('script')
      script.src = "https://link.msgsndr.com/js/form_embed.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])


  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full max-w-2xl flex flex-col">
        <SheetHeader className="mb-6">
          <div>
            <SheetTitle>Apply for {job.title}</SheetTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {job.dept} • {job.location} • {job.workType}
            </p>
          </div>
        </SheetHeader>
        
        {/* GoHighLevel Embedded Form */}
        <div className="w-full flex-1 rounded-lg overflow-hidden border" style={{ overflow: 'scroll' }}>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/LAGeiR5JImVkLTXvHzGu"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '600px',
              border: 'none',
              borderRadius: '8px'
            }}
            id="inline-LAGeiR5JImVkLTXvHzGu"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Job Application Form"
            data-height="600"
            data-layout-iframe-id="inline-LAGeiR5JImVkLTXvHzGu"
            data-form-id="LAGeiR5JImVkLTXvHzGu"
            title="Job Application Form"
          />
        </div>
      </SheetContent>
    </Sheet>
    </>
  )
}
