import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function ImageGallery() {
  const images = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Healthcare Innovation Lab",
      title: "Innovation Challenges",
      description: "Engage in competitions that encourage out-of-the-box thinking, leading to the development of novel healthcare solutions.",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Collaborative Meeting",
      title: "Collaborative Sessions",
      description: "Participate in hands-on sessions designed to stimulate creativity and problem-solving, addressing real-world healthcare challenges.",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Medical Technology",
      title: "Networking Events",
      description: "Connect with a diverse community of innovators, investors, and industry leaders to foster partnerships and collaborations.",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mentorship Session",
      title: "Expert Mentorship",
      description: "Receive guidance from seasoned professionals who provide insights and advice to refine and advance your projects.",
    },
  ]

  return (
    <section className="bg-gray-50 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Where Innovation Happens</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/images/1.png"
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{image.title}</h3>
                  <p className="text-gray-600">{image.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

