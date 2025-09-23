"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Users, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Container } from "./container"

const stats = [
  { icon: Users, label: "Active Candidates", value: "50K+" },
  { icon: Globe, label: "Countries", value: "45+" },
  { icon: TrendingUp, label: "Success Rate", value: "94%" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-28 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-accent/25 to-primary/15 rounded-full blur-3xl" />
        </div>
      </div>

      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Connect exceptional talent with{" "}
            <span className="text-primary">world-class opportunities</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed"
          >
            Join thousands of professionals who&apos;ve found their perfect match. 
            From startups to Fortune 500, we connect talent with purpose.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button asChild size="lg" className="text-base px-8 py-6">
              <Link href="/jobs" className="group">
                See Jobs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6">
              <Link href="/connect">Connect with Us</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/15 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-bold text-2xl md:text-3xl mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
