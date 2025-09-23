import Link from "next/link"
import { ArrowRight, Briefcase, Users, Target } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Hero } from "@/components/hero"
import { JobCard } from "@/components/job-card"
import { LogoWall } from "@/components/logo-wall"
import { Testimonials } from "@/components/testimonial"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { getRecentJobs } from "@/lib/jobs"

const features = [
  {
    icon: Briefcase,
    title: "Curated Opportunities",
    description: "Hand-picked roles from companies that value exceptional talent and offer meaningful career growth."
  },
  {
    icon: Users,
    title: "Personal Guidance",
    description: "Dedicated support throughout your journey, from initial conversation to successful placement and beyond."
  },
  {
    icon: Target,
    title: "Perfect Matches",
    description: "Our proven process ensures alignment between your skills, values, and career aspirations with the right opportunity."
  }
]

export default function Home() {
  const recentJobs = getRecentJobs(6)

  return (
    <>
      <Hero />
      
      <LogoWall />
      
      {/* Recent Jobs Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Openings
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover your next opportunity from our latest curated positions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentJobs.map((job, index) => (
              <JobCard key={job.slug} job={job} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/jobs" className="group">
                View All Jobs
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Why Work With Us Section */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why work with us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re more than a recruitment agency – we&apos;re your career partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-border/50 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Testimonials />

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="text-center bg-gradient-to-br from-primary/8 via-accent/6 to-primary/10 rounded-2xl p-12 md:p-16 border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find your perfect match?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who&apos;ve discovered their ideal career opportunity through our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/jobs" className="group">
                  Browse Jobs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/connect">Connect with Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
