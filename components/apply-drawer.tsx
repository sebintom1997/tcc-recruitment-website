"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import type { Job } from "@/lib/jobs";

interface ApplyDrawerProps {
  job: Job;
  trigger: React.ReactNode;
}

export function ApplyDrawer({ job, trigger }: ApplyDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Load GoHighLevel form script when component mounts
  useEffect(() => {
    // Check if script is already loaded
    if (
      !document.querySelector(
        'script[src="https://link.msgsndr.com/js/form_embed.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Construct form URL with job details
  const getFormUrl = () => {
    const baseUrl =
      "https://api.leadconnectorhq.com/widget/form/LAGeiR5JImVkLTXvHzGu";
    const params = new URLSearchParams({
      // Basic job info
      job_title: job.title,
      job_slug: job.slug,
      job_department: job.dept,
      job_location: job.location,
      job_type: job.workType,
      job_experience: job.experience,

      // Additional tracking info
      job_pitch: job.pitch?.substring(0, 200) || "", // First 200 chars
      job_tags: job.tags.join(","),
      job_posted_date: job.postedAt,
      source: "website_application",

      // Timestamp when they applied
      application_timestamp: new Date().toISOString(),

      // Page URL for reference
      page_url: typeof window !== "undefined" ? window.location.href : "",
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full max-w-2xl flex flex-col">
          <SheetHeader className="mb-6">
            <SheetTitle>Apply for {job.title}</SheetTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {job.dept} • {job.location} • {job.workType}
            </p>
          </SheetHeader>

          {/* GoHighLevel Embedded Form */}
          <div
            className="w-full flex-1 rounded-lg overflow-hidden border"
            style={{ overflow: "scroll" }}
          >
            <iframe
              src={getFormUrl()}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '3px'
              }}
              title="Apply job form"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
