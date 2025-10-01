"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Container } from "./container"
import { Section } from "./section"

const testimonials = [
  {
    content: "TCC Recruitment helped me find my dream role at a company that truly values my skills and growth. The process was seamless and the team was incredibly supportive throughout.",
    author: "Sarah Chen",
    role: "Senior Product Designer",
    company: "Tech Startup",
    rating: 5,
  },
  {
    content: "I was skeptical about recruitment agencies, but TCC changed my mind completely. They understood my goals and connected me with opportunities I never would have found on my own.",
    author: "Marcus Johnson",
    role: "Full Stack Engineer",
    company: "Fortune 500",
    rating: 5,
  },
  {
    content: "The personalized approach and genuine care for candidate success sets TCC apart. They don't just fill positions – they build lasting career relationships.",
    author: "Emma Rodriguez",
    role: "Data Scientist",
    company: "AI Company",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What our candidates say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Real stories from professionals who found their perfect match
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="h-6 w-6 text-muted-foreground mb-4" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
