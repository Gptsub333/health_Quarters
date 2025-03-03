import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation";
import hq from '../public/images/healthQuarters.svg'

export function Hero({ content }) {
  const router = useRouter();
  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 px-4 py-16 sm:py-12 md:py-16 md:px-8 mb-10 sm:mb-16 md:mb-20 overflow-hidden">
      <div className="mx-auto w-full sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-[1700px]">
        <nav className="mb-8 sm:mb-12 md:mb-16 lg:mb-[9rem] flex justify-between items-center">
        <Image
            src={hq}
            alt="My SVG Icon"
            width={150}
            height={150}
            className="w-[100px] sm:w-[150px] md:w-[150px] lg:w-[200px] h-auto object-contain"
          />
        </nav>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 relative items-center md:items-end">
          <div className="order-2 md:order-1">
            <div className="mb-4 sm:mb-6 text-base sm:text-lg font-medium tracking-wider text-[#6C5CE7] text-outline-small">
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Innovate.</span>{" "}
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Collaborate.</span>{" "}
              <span className="inline-block transform transition-transform hover:translate-y-[-2px]">Thrive.</span>
            </div>
            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[1px] sm:tracking-[2px] md:tracking-[3px]">
              {content.title} <span className="text-[#6C5CE7]">{content.subtitle}</span>
            </h1>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-600">{content.description}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button onClick={() => router.push("/form")} size="lg" className="bg-[#6C5CE7] hover:bg-[#5A4ED1] p-3 sm:p-4 md:p-5 px-6 sm:px-8 md:px-[3rem] text-white rounded-full sm:rounded-[150px] text-sm sm:text-base">
                {content.cta}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white rounded px-3 sm:px-4 text-sm sm:text-base"
              >
                {content.secondaryCta}
              </Button>
            </div>
          </div>
          
          <div className="animate-[float_6s_ease-in-out_infinite] relative w-full self-center md:self-start order-1 md:order-2 mb-8 md:mb-0">
            <span className="text-outline hidden sm:block">
                HEALTHQUARTERS
            </span>
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
              <Image
                src="/images/hero_background.jpg"
                alt="Healthcare Innovation"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl z-2 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}