"use client"

import { useState, useEffect } from "react"

export default function StartupGrowthTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 4 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const timelineSteps = [
    {
      title: "Personal Events & Sessions",
      description:
        "Connect with like-minded individuals through curated events and interactive sessions designed to spark innovation and collaboration.",
      color: "from-white to-[#f5f7fd]",
      hoverColor: "from-[#f5f7fd] to-[#e8edfb]",
      textColor: "text-[#1E2B58]",
    },
    {
      title: "Orientations",
      description:
        "Get acquainted with our community through comprehensive orientations that introduce you to our resources, mentors, and growth opportunities.",
      color: "from-white to-[#f0f3fa]",
      hoverColor: "from-[#f0f3fa] to-[#e3e9f8]",
      textColor: "text-[#1E2B58]",
    },
    {
      title: "Technical Advisers",
      description:
        "Gain insights from experienced technical advisers who provide personalized guidance to help navigate complex technological challenges.",
      color: "from-white to-[#eaeff7]",
      hoverColor: "from-[#eaeff7] to-[#dde6f5]",
      textColor: "text-[#1E2B58]",
    },
    {
      title: "Business Strategy",
      description:
        "Develop robust business strategies with expert-led advertising and marketing sessions tailored to your startup's unique value proposition.",
      color: "from-white to-[#e5ebf5]",
      hoverColor: "from-[#e5ebf5] to-[#d8e2f2]",
      textColor: "text-[#1E2B58]",
    },
    {
      title: "Pitching on Stage",
      description:
        "Showcase your refined pitch on our prestigious stages, connecting with investors and partners to take your startup to the next level.",
      color: "from-white to-[#e0e7f2]",
      hoverColor: "from-[#e0e7f2] to-[#d3def0]",
      textColor: "text-[#1E2B58]",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className={`max-w-7xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2B58] mb-4 tracking-tight">
            <span className="bg-clip-text text-[#1E2B58]">
              Your Startup Growth Journey
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-[#1E2B58] opacity-90">
            HealthQuarter.AI guides you through every stage of your startup&apos;s evolution
          </p>
        </div>

        {/* Timeline for larger screens */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1E2B58]/30 to-[#1E2B58]/50 rounded-full"></div>

          <div className="space-y-24">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <div
                      className={`
                        p-6 rounded-2xl shadow-xl transition-all duration-500
                        bg-gradient-to-br ${step.color} hover:bg-gradient-to-br ${step.hoverColor}
                        transform hover:-translate-y-1 hover:shadow-2xl
                        border border-[#1E2B58]/10 backdrop-blur-sm
                      `}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <h3 className="text-2xl font-bold text-[#1E2B58] mb-3">{step.title}</h3>
                      <p className={`${step.textColor}`}>{step.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full border-4 transition-all duration-500
                        ${
                          activeIndex === index
                            ? "border-[#1E2B58] bg-white scale-125"
                            : "border-[#1E2B58]/50 bg-white"
                        }
                      `}
                    >
                      <span className="flex items-center justify-center h-full text-[#1E2B58] font-bold">{index + 1}</span>
                    </div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline for mobile screens */}
        <div className="md:hidden space-y-8">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`
                      w-8 h-8 rounded-full border-4 flex items-center justify-center
                      ${
                        activeIndex === index
                          ? "border-[#1E2B58] bg-white scale-110"
                          : "border-[#1E2B58]/50 bg-white"
                      }
                    `}
                  >
                    <span className="text-[#1E2B58] font-bold text-sm">{index + 1}</span>
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-[#1E2B58]/30 to-[#1E2B58]/50 my-1"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className={`
                      p-5 rounded-xl shadow-lg transition-all duration-500
                      bg-gradient-to-br ${step.color} hover:bg-gradient-to-br ${step.hoverColor}
                      transform hover:-translate-y-1 hover:shadow-xl
                      border border-[#1E2B58]/10 backdrop-blur-sm
                    `}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <h3 className="text-xl font-bold text-[#1E2B58] mb-2">{step.title}</h3>
                    <p className={`text-sm ${step.textColor}`}>{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div
          className={`mt-20 text-center transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-[#1E2B58] to-[#1E2B58]/80">
            <button className="px-8 py-3 rounded-full bg-white text-[#1E2B58] font-bold text-lg hover:bg-[#f5f7fd] transition-all duration-300 transform hover:scale-105">
              Join HealthQuarter.AI Community
            </button>
          </div>
          <p className="mt-4 text-[#1E2B58] max-w-md mx-auto">
            Take the first step towards accelerating your startup&apos;s growth journey with our expert community
          </p>
        </div>
      </div>
    </div>
  )
}