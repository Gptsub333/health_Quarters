import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function Testimonials({ content }) {
  return (
    <section className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Stories of Transformation</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {content.map((testimonial, index) => (
            <Card key={index} className={index % 2 === 1 ? "bg-[#1E2B58] text-white" : ""}>
              <CardContent className="p-8">
                <Quote className={`mb-4 h-8 w-8 ${index % 2 === 1 ? "text-blue-300" : "text-blue-600"}`} />
                <p className="mb-6 text-lg italic">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className={index % 2 === 1 ? "text-gray-300" : "text-gray-600"}>{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

