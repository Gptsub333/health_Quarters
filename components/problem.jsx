import Image from "next/image"
import { Card, CardContent } from "./ui/card"

export function Problem({ content, featuresContent }) {
  return (
    <section className="relative px-4 py-12 sm:py-16 md:py-20 text-white md:px-8 overflow-hidden">
      {/* Background shape with responsive width */}
      <div className="absolute inset-0 w-full sm:w-[85%] md:w-[80%] lg:w-[75%] bg-[#1E2B58] rounded-r-[1.5rem] sm:rounded-r-[2rem] md:rounded-r-[3rem] transform transition-all duration-500"></div>

      <div className="relative mx-auto w-full sm:max-w-[95%] md:max-w-[90%]">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{content.title}</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">{content.description}</p>
            
            {/* Responsive card grid - single column on mobile, 2 columns on larger screens */}
            <div className="grid gap-4 sm:gap-6 md:gap-4 lg:gap-6 sm:grid-cols-2">
              {featuresContent.map((feature) => (
                <Card 
                  key={feature.id} 
                  className="bg-white/10 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 group"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="mb-2 sm:mb-4 text-4xl sm:text-5xl md:text-6xl font-bold text-[#6C5CE7]/80 group-hover:text-[#6C5CE7] transition-colors duration-300">{feature.id}</div>
                    <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl font-bold group-hover:text-white/95 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Responsive image container with decorative elements */}
          <div className="relative md:pl-8 order-1 md:order-2 mb-8 md:mb-0">
            <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#6C5CE7]/20 rounded-full -translate-y-1/2 translate-x-1/2 backdrop-blur-md"></div>
              
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl m-4 pointer-events-none"></div>
              
              <Image
                src="/images/what_sets_us_apart.jpg"
                alt="Healthcare Innovation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Decorative accent */}
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#6C5CE7]/30 rounded-full translate-y-1/3 -translate-x-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}