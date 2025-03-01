"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function MonthlyMeetups() {
  const [selectedMeetup, setSelectedMeetup] = useState(null)
  const [showAll, setShowAll] = useState(false)

  // Sample data - In real app, this would come from your API
  const meetups = [
    {
      id: 1,
      title: "Advanced Cardiac Care Symposium",
      date: "February 2024",
      attendees: 156,
      speakers: 4,
      location: "Grand Medical Center",
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description:
        "A comprehensive discussion on the latest advances in cardiac care, featuring leading cardiologists and innovative treatment methods.",
      highlights: [
        "Panel discussion on minimally invasive procedures",
        "Live demonstration of new diagnostic tools",
        "Networking session with industry leaders",
      ],
      stats: {
        satisfaction: 98,
        newConnections: 234,
        presentations: 12,
      },
    },
    {
      id: 2,
      title: "Neurology Updates 2024",
      date: "January 2024",
      attendees: 142,
      speakers: 3,
      location: "Medical Research Center",
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      description: "Exploring breakthrough research in neurology and its practical applications in clinical settings.",
      highlights: ["Latest research findings presentation", "Interactive case studies", "Expert panel discussion"],
      stats: {
        satisfaction: 96,
        newConnections: 189,
        presentations: 8,
      },
    },
    // Add more meetups as needed
  ]

  const MeetupCard = ({ meetup, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
        featured ? "col-span-full lg:col-span-2" : ""
      }`}
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src="/images/meetup1.avif"
          alt={meetup.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="absolute bottom-0 w-full p-6 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">{meetup.date}</span>
          <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
            {meetup.attendees} Attendees
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">{meetup.title}</h3>
        <p className="line-clamp-2 text-sm text-white/80">{meetup.description}</p>
      </div>

      <button
        onClick={() => setSelectedMeetup(meetup)}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100"
      >
        <span className="rounded-full bg-white px-4 py-2 font-medium text-gray-900">View Details</span>
      </button>
    </motion.div>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-200/20 blur-3xl"></div>
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Community Meetups & Events
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Join our monthly gatherings where medical professionals share knowledge, network, and grow together.
              </p>
            </motion.div>

            
          </div>

          {/* Meetups Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meetups.slice(0, showAll ? undefined : 3).map((meetup, index) => (
              <MeetupCard key={meetup.id} meetup={meetup} featured={index === 0} />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 font-medium text-white shadow-md transition-all duration-300 ease-out hover:shadow-lg"
            >
              <span className="relative flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm transition-all duration-300 ease-out group-hover:bg-opacity-0">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:text-white transition-colors duration-300">
                  {showAll ? "Show Less" : "View All Meetups"}
                </span>
                <svg
                  className="h-4 w-4 text-indigo-600 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedMeetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedMeetup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-6 shadow-xl"
            >
              <button
                onClick={() => setSelectedMeetup(null)}
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <img
                      src="/images/meetup2.avif"
                      alt={selectedMeetup.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {selectedMeetup.gallery.map((image, index) => (
                      <div key={index} className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src="/images/meetup2.avif"
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMeetup.title}</h3>
                    <p className="mt-2 text-gray-600">{selectedMeetup.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Satisfaction", value: `${selectedMeetup.stats.satisfaction}%` },
                      { label: "Connections", value: selectedMeetup.stats.newConnections },
                      { label: "Presentations", value: selectedMeetup.stats.presentations },
                    ].map((stat, index) => (
                      <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
                        <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Highlights</h4>
                    <ul className="space-y-2">
                      {selectedMeetup.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-4">
                    <div>
                      <div className="text-sm text-indigo-600">Location</div>
                      <div className="font-medium text-gray-900">{selectedMeetup.location}</div>
                    </div>
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

