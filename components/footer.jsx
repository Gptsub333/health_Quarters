export function Footer({ content }) {
  return (
    <footer className="border-t bg-white px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
      <div className="h-12 w-auto text-[30px] font-extrabold">
            HEALTHQUARTERS AI.
          </div>
        <div className="mb-4 text-gray-500 md:mb-0">{content.copyright}</div>
       
        <a href="#" className="text-gray-500 transition-colors hover:text-gray-700">
          {content.terms} →
        </a>
      </div>
    </footer>
  )
}

