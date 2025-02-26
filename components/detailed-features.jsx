export function DetailedFeatures({ content }) {
  return (
    <section className="bg-white px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-gray-400">{content.title}</span>{" "}
            <span className="text-gray-400">{content.subtitle}</span>{" "}
            <span className="text-gray-800">{content.highlight}</span>
          </h2>
        </div>

        <div className="space-y-12">
          {content.features.map((feature) => (
            <div key={feature.id} className="border-t border-b py-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-6xl font-bold text-gray-200">{feature.id}</div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                </div>
                <div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

