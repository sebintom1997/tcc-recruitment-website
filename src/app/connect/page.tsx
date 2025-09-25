"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Container } from "@/components/container"
import { Section } from "@/components/section"

const connectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  goals: z.string().min(10, "Please provide more detail about your goals"),
  cvFile: z.instanceof(File).optional(),
})

type ConnectFormData = z.infer<typeof connectSchema>

const interestOptions = [
  "Engineering",
  "Data",
  "Design", 
  "Product",
  "Marketing",
  "Operations",
  "Other"
]

export default function ConnectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ConnectFormData>({
    resolver: zodResolver(connectSchema),
    defaultValues: {
      interests: []
    }
  })

  const watchedFile = watch("cvFile")

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

  // Construct form URL with interests and goals
  const getFormUrl = () => {
    const baseUrl = "https://api.leadconnectorhq.com/widget/form/qC6yGWQ1taUkHNoycyci"
    const params = new URLSearchParams({
      // Pass selected interests and goals
      interests_from_website: selectedInterests.join(','),
      goals_from_website: watch("goals") || '',
      source: 'website_connect',
      
      // Timestamp when they reached step 3
      connect_timestamp_from_website: new Date().toISOString(),
      
      // Page URL for reference
      page_url: typeof window !== 'undefined' ? window.location.href : ''
    })
    return `${baseUrl}?${params.toString()}`
  }

  const handleInterestToggle = (interest: string) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest]
    
    setSelectedInterests(updated)
    setValue("interests", updated)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue("cvFile", file)
    }
  }

  const onSubmit = async (data: ConnectFormData) => {
    setIsSubmitting(true)
    
    try {
      console.log("Submitting connect form:", data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitted(true)
      reset()
      setSelectedInterests([])
      setStep(1)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  // Redirect to home page after showing thank you message
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push('/')
      }, 3000) // 3 seconds delay

      return () => clearTimeout(timer)
    }
  }, [submitted, router])

  if (submitted) {
    return (
      <Section>
        <Container>
          <div className="max-w-md mx-auto text-center py-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Thank You!</h1>
            <p className="text-muted-foreground mb-4">
              We&apos;ve received your information and will be in touch soon.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to home page in a few seconds...
            </p>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect with Us</h1>
            <p className="text-xl text-muted-foreground">
              Tell us about yourself and what you&apos;re looking for. We&apos;ll connect you with the perfect opportunities.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      stepNumber < step ? "bg-gradient-to-r from-primary to-accent" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Your Interests"}
                {step === 2 && "Your Goals"}
                {step === 3 && "Contact Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Interests */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label>What areas are you interested in? *</Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {interestOptions.map((interest) => (
                          <Badge
                            key={interest}
                            variant={selectedInterests.includes(interest) ? "default" : "outline"}
                            className={`cursor-pointer transition-all ${
                              selectedInterests.includes(interest) 
                                ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" 
                                : "hover:bg-primary/10 hover:border-primary/30"
                            }`}
                            onClick={() => handleInterestToggle(interest)}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      {errors.interests && (
                        <p className="text-sm text-red-600 mt-1">{errors.interests.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Goals */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="goals">What are your career goals? *</Label>
                      <Textarea
                        id="goals"
                        {...register("goals")}
                        placeholder="Tell us about your career aspirations, what type of role you're looking for, company culture preferences, etc."
                        className="mt-2 min-h-[120px]"
                      />
                      {errors.goals && (
                        <p className="text-sm text-red-600 mt-1">{errors.goals.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: GoHighLevel Form */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        Complete your information below
                      </p>
                    </div>
                    
                    {/* GoHighLevel Embedded Form */}
                    <div className="w-full h-[800px] rounded-lg overflow-auto border">
                      <iframe
                        src={getFormUrl()}
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: '800px',
                          border: 'none',
                          borderRadius: '8px'
                        }}
                        title="Connect With Us Form"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={step === 1 && selectedInterests.length === 0}
                    >
                      Next
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Complete the form above to submit
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
