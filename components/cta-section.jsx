import { Button } from "@/components/ui/button"

export function CtaSection({ content }) {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 md:px-8"
      style={{
        background: "linear-gradient(135deg, #FFE1E9 0%, #FFF8E1 100%)",
      }}
    >
      {/* Decorative dashed circle */}
      <div
        className="absolute left-8 top-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          border: "1px dashed rgba(0, 0, 0, 0.2)",
        }}
      ></div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold leading-tight tracking-normal md:text-5xl lg:text-6xl">
            {content.title}
            <br />
            <span className="font-light text-gray-900">{content.subtitle}</span>
          </h2>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-[#6C5CE7] hover:bg-[#5A4ED1] p-5 px-[3rem] text-white rounded-[150px]">
                {content.primaryButton}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white rounded px-4"
              >
                {content.secondaryButton}
              </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

