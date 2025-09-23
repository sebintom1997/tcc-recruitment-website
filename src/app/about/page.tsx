import { Container } from "@/components/container"
import { Section } from "@/components/section"

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About TCC Careers</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              We&apos;re on a mission to connect exceptional talent with world-class opportunities, 
              building meaningful career relationships that last.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-6">
              Founded with the belief that great careers are built on more than just skills and requirements, 
              TCC Careers bridges the gap between talented professionals and companies that value human potential. 
              We understand that the best matches happen when values, culture, and aspirations align.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="mb-6">
              We take a personalized approach to recruitment, getting to know both candidates and companies 
              on a deeper level. This isn&apos;t about filling positions quickly – it&apos;s about creating lasting 
              professional relationships that drive success for everyone involved.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Curated opportunities from vetted, high-quality companies</li>
              <li>Personal guidance throughout your entire job search journey</li>
              <li>Deep understanding of industry trends and market dynamics</li>
              <li>Commitment to finding the right cultural and professional fit</li>
              <li>Ongoing support even after successful placement</li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
