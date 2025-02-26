import { Card, CardContent } from "@/components/ui/card"

export function Features({ content }) {
  return (
    <section className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          {content.map((feature) => (
            <Card key={feature.id} className="bg-gray-50">
              <CardContent className="p-8">
                <div className="mb-4 text-6xl font-bold text-gray-200">{feature.id}</div>
                <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

