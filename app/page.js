"use client"

import { websiteContent } from "@/lib/data"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Benefits } from "@/components/benefits"
import { Stats } from "@/components/stats"
import { DetailedFeatures } from "@/components/detailed-features"
import { Testimonials } from "@/components/testimonials"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero content={websiteContent.hero} />
      <Problem content={websiteContent.problem} featuresContent = {websiteContent.features} />
      <Benefits content={websiteContent.benefits} />
      <Stats content={websiteContent.stats} />
      <DetailedFeatures content={websiteContent.detailedFeatures} />
      <Testimonials content={websiteContent.testimonials} />
      <CtaSection content={websiteContent.cta} />
      <Footer content={websiteContent.footer} />
    </main>
  )
}

