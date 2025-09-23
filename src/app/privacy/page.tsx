import { Container } from "@/components/container"
import { Section } from "@/components/section"

export default function PrivacyPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-6">
              We collect information you provide directly to us, such as when you create an account, 
              apply for jobs, or contact us for support.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-6">
              We use the information we collect to provide, maintain, and improve our services, 
              process job applications, and communicate with you.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="mb-6">
              We may share your information with employers when you apply for jobs, and with 
              service providers who assist us in operating our platform.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="mb-6">
              You have the right to access, update, or delete your personal information. 
              Contact us if you wish to exercise these rights.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please contact us at 
              privacy@tcc-careers.com.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
