import Image from "next/image"
import { Card, CardContent } from "./ui/card"

export function Problem({ content,featuresContent }) {
  return (
    <section className="relative px-4 py-20 text-white md:px-8">
  <div className="absolute inset-0 w-[75%] bg-[#1E2B58] rounded-r-[3rem]"></div>

  <div className="relative mx-auto max-w-[90%]">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{content.title}</h2>
        <p className="text-lg text-gray-300 mb-4">{content.description}</p>
        <div className="grid gap-12 md:grid-cols-2">
          {featuresContent.map((feature) => (
            <Card key={feature.id} className="">
              <CardContent className="p-8">
                <div className="mb-4 text-6xl font-bold text-gray-200">{feature.id}</div>
                <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] overflow-hidden rounded-2xl">
        <Image
          src="/images/what_sets_us_apart.jpg"
          alt="Healthcare Innovation"
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
</section>

  )
}

