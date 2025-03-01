"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, Users, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"; // Import useRouter

export default function DoctorExpertsSection() {
  const [ setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        style={{
          backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
          transition: "background-position 0.3s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-500/10 blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/10 to-indigo-500/10 blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Join Our Expert Network
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Medical Expert
              </span>{" "}
              in Our Growing Community
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join our network of distinguished healthcare professionals. Share your expertise, collaborate with peers,
              and make a meaningful impact on patient care worldwide.
            </motion.p>

            <motion.div
      className="pt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.button
        onClick={() => router.push("/doctor-form")} // Navigate on click
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-0.5 font-medium text-white shadow-md transition-all duration-300 ease-out hover:shadow-lg"
      >
        <span className="relative flex items-center gap-2 rounded-md bg-white px-6 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 group-hover:text-white transition-colors duration-300">
            Register as an Expert
          </span>
          <ArrowRight className="h-4 w-4 text-indigo-600 group-hover:text-white transition-colors duration-300" />
        </span>
      </motion.button>
    </motion.div>


            <motion.div
              className="flex flex-wrap gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <Award className="h-6 w-6 text-indigo-600" />,
                  title: "Verified Credentials",
                  desc: "Recognized expertise",
                },
                {
                  icon: <Users className="h-6 w-6 text-indigo-600" />,
                  title: "Global Network",
                  desc: "Connect with peers",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-full bg-indigo-100 p-2 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right content - Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 blur-xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100"></div>

                <div className="relative p-6 sm:p-10">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
                    <img
                      src="/images/doctor-main.jpg"
                      alt="Doctor experts collaborating"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
                          <img
                            src={`/images/doctor${i + 1}.jpg`}
                            alt={`Expert ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 ring-2 ring-white">
                        <span className="text-xs font-medium text-indigo-600">+42</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-900">Trusted by 500+ medical professionals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

