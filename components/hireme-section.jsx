"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";


export default function MentorTypes() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showAll] = useState(false)
  const router = useRouter();

  const mentorTypes = [
    {
      id: 1,
      title: "Clinical Leadership",
      description: "Expert guidance in medical leadership and clinical excellence",
      expertise: ["Hospital Management", "Clinical Protocols", "Team Leadership"],
      members: 48,
      rating: 4.9,
      gradient: "from-rose-400 to-orange-400",
      shadowColor: "shadow-rose-200",
    },
    {
      id: 2,
      title: "Research & Innovation",
      description: "Pioneering medical research and breakthrough innovations",
      expertise: ["Clinical Trials", "Research Methods", "Data Analysis"],
      members: 35,
      rating: 4.8,
      gradient: "from-blue-400 to-cyan-400",
      shadowColor: "shadow-blue-200",
    },
    {
      id: 3,
      title: "Healthcare Technology",
      description: "Digital transformation in healthcare delivery",
      expertise: ["Digital Health", "AI in Medicine", "Health Informatics"],
      members: 42,
      rating: 4.7,
      gradient: "from-violet-400 to-purple-400",
      shadowColor: "shadow-violet-200",
    },
    {
      id: 4,
      title: "Patient Care Excellence",
      description: "Advanced patient care and experience optimization",
      expertise: ["Patient Experience", "Care Protocols", "Quality Metrics"],
      members: 56,
      rating: 4.9,
      gradient: "from-emerald-400 to-teal-400",
      shadowColor: "shadow-emerald-200",
    },
    {
      id: 5,
      title: "Medical Education",
      description: "Training and development in healthcare",
      expertise: ["Clinical Training", "Medical Education", "Skill Development"],
      members: 39,
      rating: 4.8,
      gradient: "from-amber-400 to-yellow-400",
      shadowColor: "shadow-amber-200",
    },
    {
      id: 6,
      title: "Healthcare Strategy",
      description: "Strategic planning and healthcare management",
      expertise: ["Strategic Planning", "Healthcare Policy", "Operations"],
      members: 31,
      rating: 4.7,
      gradient: "from-pink-400 to-rose-400",
      shadowColor: "shadow-pink-200",
    }
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 px-4 py-20">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl"
          style={{
            transform: `translate(${hoveredCard ? hoveredCard * 10 : 0}px, ${hoveredCard ? hoveredCard * 5 : 0}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 blur-3xl"
          style={{
            transform: `translate(${hoveredCard ? -hoveredCard * 10 : 0}px, ${hoveredCard ? -hoveredCard * 5 : 0}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Expert Mentorship Programs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Connect with industry-leading mentors and accelerate your healthcare career through specialized guidance and expertise.
          </p>
        </motion.div>

        {/* Mentor Types Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mentorTypes.slice(0, showAll ? undefined : 6).map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(type.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${type.gradient} opacity-0 blur transition duration-300 group-hover:opacity-100`} />
              <div className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">

                {/* Card Content */}
                <h3 className="mb-2 text-xl font-bold text-gray-900">{type.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{type.description}</p>

                {/* Expertise Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {type.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white"
                        >
                          <img
                            src={`/images/doctor${i+1}.jpg`}
                            alt={`Mentor ${i+1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">+{type.members} mentors</span>
                  </div>
                  <button className="rounded-full bg-gradient-to-r from-black to-gray-800 p-0.5 transition-transform duration-300 hover:scale-105">
  <span className="block rounded-full bg-white px-4 py-1 font-medium transition-colors duration-300 hover:bg-opacity-0 hover:text-white">
    Connect
  </span>
</button>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => router.push("/healthcare-experts")}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-0.5 font-medium text-gray-900 hover:text-white"
          >
            <span className="relative flex items-center gap-2 rounded-full bg-white px-6 py-3 transition-all duration-300 ease-out group-hover:bg-opacity-0">
              {showAll ? 'View All Programs' : 'View All Programs'}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
