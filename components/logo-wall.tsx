"use client"

import { motion } from "framer-motion"
import { Container } from "./container"
import { Section } from "./section"

const companies = [
  "Stripe", "Airbnb", "Spotify", "Netflix", "Figma", "Linear"
]

export function LogoWall() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-muted-foreground mb-8"
          >
            Trusted by talent from world-class companies
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center h-16 bg-background rounded-lg border border-border/50 shadow-sm"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
