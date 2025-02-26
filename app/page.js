"use client"

import { websiteContent } from "@/lib/data"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Problem } from "@/components/problem"
import { Benefits } from "@/components/benefits"
import { Stats } from "@/components/stats"
import { DetailedFeatures } from "@/components/detailed-features"
import { ImageGallery } from "@/components/image-gallery"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Hero content={websiteContent.hero} />
      {/* <Features content={websiteContent.features} /> */}
      <Problem content={websiteContent.problem} featuresContent = {websiteContent.features} />
      <Benefits content={websiteContent.benefits} />
      <Stats content={websiteContent.stats} />
      {/* <ImageGallery /> */}
      <DetailedFeatures content={websiteContent.detailedFeatures} />
      <Testimonials content={websiteContent.testimonials} />
      {/* <Pricing content={websiteContent.pricing} /> */}
      <CtaSection content={websiteContent.cta} />
      <Footer content={websiteContent.footer} />
    </main>
  )
}

