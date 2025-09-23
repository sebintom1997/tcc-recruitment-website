"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  delay?: number
}

export function Section({ children, className, animate = true, delay = 0 }: SectionProps) {
  if (!animate) {
    return (
      <section className={cn("py-12 md:py-16 lg:py-20", className)}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={cn("py-12 md:py-16 lg:py-20", className)}
    >
      {children}
    </motion.section>
  )
}
