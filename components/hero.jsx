import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero({ content }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 px-4 py-16 md:px-8 mb-20 overflow-hidden">
      <div className="mx-auto w-[80%] max-w-[1700px]">
        <nav className="mb-[9rem] flex justify-between items-center">
          <div className="h-12 w-auto text-[30px] font-extrabold">
            HEALTHQUARTERS AI.
          </div>
        </nav>

        <div className="grid gap-12 md:grid-cols-2 relative items-end">
          <div>
            <div className="mb-6 text-lg font-medium tracking-wider text-[#6C5CE7] text-outline-small">
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Innovate.</span>{" "}
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Collaborate.</span>{" "}
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Thrive.</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-[3px] md:text-6xl">
              {content.title} <span className="text-[#6C5CE7]">{content.subtitle}</span>
            </h1>
            <p className="mb-8 text-lg text-gray-600">{content.description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#6C5CE7] hover:bg-[#5A4ED1] p-5 px-[3rem] text-white rounded-[150px]">
                {content.cta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white rounded px-4"
              >
                {content.secondaryCta}
              </Button>
            </div>
          </div>
          
          <div className="animate-[float_6s_ease-in-out_infinite] relative w-full self-start">
            <span className="text-outline">
                HEALTHQUARTERS
            </span>
            <Image
              src="/images/hero_background.jpg"
              alt="Healthcare Innovation"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl z-2 relative w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

