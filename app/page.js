"use client"

import { websiteContent } from "@/lib/data"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { Benefits } from "@/components/benefits"
import { DetailedFeatures } from "@/components/detailed-features"
import { Testimonials } from "@/components/testimonials"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import DoctorExpertsSection from "@/components/doctor-expert"
import MonthlyMeetups from "@/components/meetups"
import MentorTypes from "@/components/hireme-section"
import StartupGrowthTimeline from "@/components/timeline"

export default function Home() {
  return (
    <main>
      <Hero content={websiteContent.hero} />
      <Problem content={websiteContent.problem} featuresContent = {websiteContent.features} />
      <Benefits content={websiteContent.benefits} />
      <MonthlyMeetups/>
      <StartupGrowthTimeline />
      <MentorTypes />
      <DetailedFeatures content={websiteContent.detailedFeatures} />
      <DoctorExpertsSection />
      <Testimonials content={websiteContent.testimonials} />
      <CtaSection content={websiteContent.cta} />
      <Footer content={websiteContent.footer} />
    </main>
  )
}

