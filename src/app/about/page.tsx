import { Container } from "@/components/container";
import { Section } from "@/components/section";

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About TCC Recruitment
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              We&apos;re on a mission to connect exceptional talent with
              world-class opportunities, building meaningful career
              relationships that last.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-6">
              TCC Recruitment was established in 2020 with a bold vision: to
              transform the way organizations think about hiring. Born in
              Ireland, we quickly positioned ourselves as the country’s leading
              Alternative Staffing Solutions Provider by challenging outdated
              models of recruitment. We recognized that traditional recruitment
              methods were expensive, inflexible, and often misaligned with the
              needs of modern businesses. To solve this, we pioneered
              Recruitment as a Service (RaaS) — a cost-effective, transparent,
              and scalable solution that brings both innovation and measurable
              value to our clients. From day one, our mission has been clear: to
              radically reduce recruitment spend while delivering exceptional
              talent solutions. Today, we are not only reshaping recruitment
              domestically but also expanding our impact abroad, driven by our
              commitment to efficiency, transparency, and results.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
            <p className="mb-4">
              Our approach is built on three core pillars that ensure every
              client engagement is strategic, streamlined, and successful:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                Smart Recruiters We collaborate with highly skilled recruiters
                who embrace flexible, smart working models. They bring deep
                industry knowledge and a modern mindset to sourcing and
                managing talent.
              </li>
              <li>
                Technology-Driven Solutions By leveraging industry-leading
                technology platforms, we streamline processes, eliminate
                inefficiencies, and provide clients with real-time insights.
                Our tech-first approach ensures we remain agile and
                data-driven at every stage.
              </li>
              <li>
                Project Management Excellence Every recruitment project is
                guided by proven project management methodologies. This
                ensures we deliver on time, within budget, and aligned with
                the unique goals of each client.
              </li>
            </ul>
            <p className="mb-6">
              To provide further reassurance, we also wrap every project in a
              full governance framework. This includes transparent pricing
              models and executive-level reporting metrics, giving our clients
              visibility, accountability, and confidence in every hire.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                Cost Savings: Our model is designed to be a minimum of 50%
                cheaper than traditional recruitment firms.
              </li>
              <li>
                Transparency: With clear pricing structures and reporting, there
                are no hidden costs — only measurable value.
              </li>
              <li>
                Scalability: Whether you’re hiring one role or building an
                entire team, our approach adapts to your business needs.
              </li>
              <li>
                Global Perspective: While rooted in Ireland, we bring an
                international mindset to talent acquisition, ensuring best
                practices are applied wherever you operate.
              </li>
              <li>
                Innovation at the Core: By combining people, process, and
                technology, we’re setting a new standard for recruitment
                excellence.
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
