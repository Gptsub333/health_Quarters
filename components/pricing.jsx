import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function Pricing({ content }) {
  return (
    <section className="bg-gradient-to-br from-pink-50 to-yellow-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          La <span className="text-gray-400">diferencia</span> que te hará{" "}
          <span className="text-pink-500">destacar</span>.
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-bold">{content.free.title}</h3>
              <p className="mb-6 text-gray-600">{content.free.description}</p>
              <Button
                variant="outline"
                className="w-full border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white"
              >
                {content.free.cta}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2B58] text-white">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-bold">{content.premium.title}</h3>
              <div className="mb-6">
                <span className="text-lg text-gray-400 line-through">${content.premium.originalPrice}</span>
                <div className="text-4xl font-bold">${content.premium.price}</div>
              </div>
              <p className="mb-6 text-gray-300">{content.premium.description}</p>
              <ul className="mb-8 space-y-4">
                {content.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#6C5CE7] hover:bg-[#5A4ED1]">Empieza ahora</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

