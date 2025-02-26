import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function Benefits({ content }) {
  return (
    <section className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl rounded-xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#6C5CE7] md:text-5xl">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.subtitle}</p>
        </div>

        {/* Added image section */}
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-2xl">
            <Image
              src="/images/innovative_minds.jpg"
              alt="Healthcare Innovation"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Transforming Healthcare Together</h3>
              <p className="text-gray-600">
                Our ecosystem brings together innovative minds, cutting-edge technology, and comprehensive support to
                drive meaningful change in healthcare. Through collaboration and continuous learning, we're building the
                future of healthcare innovation.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#6C5CE7]" />
                  Expert-led workshops and training sessions
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#6C5CE7]" />
                  Access to state-of-the-art facilities
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#6C5CE7]" />
                  Collaborative research opportunities
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {content.cards.map((card, index) => (
            <Card key={index} className={index === 1 || index === 2 ? "bg-[#1E2B58] text-white" : ""}>
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                <p className={index === 1 || index === 2 ? "text-gray-300" : "text-gray-600"}>{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

