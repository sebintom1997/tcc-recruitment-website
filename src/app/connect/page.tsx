"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Check, Upload } from "lucide-react"
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

  if (submitted) {
    return (
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We&apos;ve received your information and will be in touch soon with relevant opportunities.
            </p>
            <Button onClick={() => setSubmitted(false)}>
              Submit Another Form
            </Button>
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

                {/* Step 3: Contact */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email address"
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                      )}
                    </div>


                    <div>
                      <Label htmlFor="cvFile">Upload CV (Optional)</Label>
                      <div className="mt-1">
                        <input
                          id="cvFile"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Label
                          htmlFor="cvFile"
                          className="flex items-center justify-center w-full h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        >
                          {watchedFile ? (
                            <div className="text-center">
                              <p className="text-sm font-medium">{watchedFile.name}</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm">Click to upload CV</p>
                            </div>
                          )}
                        </Label>
                      </div>
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
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
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
