"use client"

import { useState, useEffect } from "react"
import { Star, Clock, ChevronRight, Search } from "lucide-react"
import Image from "next/image"

export default function HealthcareExperts() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredExperts, setFilteredExperts] = useState([])

  const categories = [
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
    },
  ]

  // Generate experts data with names, specialties, and hourly rates
  const experts = [
    // Clinical Leadership
    {
      id: 101,
      name: "Dr. Sarah Johnson",
      specialty: "Hospital Administration",
      hourlyRate: 195,
      rating: 4.9,
      availability: "Available next week",
      categoryId: 1,
      image: "/images/doctor1.jpg",
    },
    {
      id: 102,
      name: "Dr. Michael Chen",
      specialty: "Clinical Director",
      hourlyRate: 210,
      rating: 4.8,
      availability: "Available tomorrow",
      categoryId: 1,
      image: "/images/doctor2.jpg",
    },
    {
      id: 103,
      name: "Dr. Emily Rodriguez",
      specialty: "Medical Leadership",
      hourlyRate: 185,
      rating: 4.9,
      availability: "Available today",
      categoryId: 1,
      image: "/images/doctor3.jpg",
    },

    // Research & Innovation
    {
      id: 201,
      name: "Dr. James Wilson",
      specialty: "Clinical Research",
      hourlyRate: 225,
      rating: 4.8,
      availability: "Available next week",
      categoryId: 2,
      image: "/images/doctor4.jpg",
    },
    {
      id: 202,
      name: "Dr. Aisha Patel",
      specialty: "Medical Innovations",
      hourlyRate: 215,
      rating: 4.7,
      availability: "Available in 3 days",
      categoryId: 2,
      image: "/images/doctor1.jpg",
    },
    {
      id: 203,
      name: "Dr. Robert Kim",
      specialty: "Research Methods",
      hourlyRate: 190,
      rating: 4.9,
      availability: "Available today",
      categoryId: 2,
      image: "/images/doctor1.jpg",
    },

    // Healthcare Technology
    {
      id: 301,
      name: "Dr. Lisa Zhang",
      specialty: "Digital Health",
      hourlyRate: 205,
      rating: 4.7,
      availability: "Available tomorrow",
      categoryId: 3,
      image: "/images/doctor1.jpg",
    },
    {
      id: 302,
      name: "Dr. David Nguyen",
      specialty: "AI in Medicine",
      hourlyRate: 230,
      rating: 4.8,
      availability: "Available next week",
      categoryId: 3,
      image: "/images/doctor1.jpg",
    },
    {
      id: 303,
      name: "Dr. Sophia Martinez",
      specialty: "Health Informatics",
      hourlyRate: 200,
      rating: 4.6,
      availability: "Available today",
      categoryId: 3,
      image: "/images/doctor1.jpg",
    },

    // Patient Care Excellence
    {
      id: 401,
      name: "Dr. Thomas Brown",
      specialty: "Patient Experience",
      hourlyRate: 180,
      rating: 4.9,
      availability: "Available tomorrow",
      categoryId: 4,
      image: "/images/doctor1.jpg",
    },
    {
      id: 402,
      name: "Dr. Olivia Williams",
      specialty: "Care Protocols",
      hourlyRate: 195,
      rating: 4.8,
      availability: "Available today",
      categoryId: 4,
      image: "/images/doctor1.jpg",
    },
    {
      id: 403,
      name: "Dr. Benjamin Lee",
      specialty: "Quality Metrics",
      hourlyRate: 185,
      rating: 4.9,
      availability: "Available in 2 days",
      categoryId: 4,
      image: "/images/doctor1.jpg",
    },

    // Medical Education
    {
      id: 501,
      name: "Dr. Rachel Cohen",
      specialty: "Clinical Training",
      hourlyRate: 175,
      rating: 4.8,
      availability: "Available today",
      categoryId: 5,
      image: "/images/doctor1.jpg",
    },
    {
      id: 502,
      name: "Dr. Daniel Jackson",
      specialty: "Medical Education",
      hourlyRate: 190,
      rating: 4.7,
      availability: "Available tomorrow",
      categoryId: 5,
      image: "/images/doctor1.jpg",
    },
    {
      id: 503,
      name: "Dr. Natalie Singh",
      specialty: "Skill Development",
      hourlyRate: 165,
      rating: 4.9,
      availability: "Available next week",
      categoryId: 5,
      image: "/images/doctor1.jpg",
    },

    // Healthcare Strategy
    {
      id: 601,
      name: "Dr. Andrew Thompson",
      specialty: "Strategic Planning",
      hourlyRate: 220,
      rating: 4.7,
      availability: "Available in 3 days",
      categoryId: 6,
      image: "/images/doctor1.jpg",
    },
    {
      id: 602,
      name: "Dr. Jennifer Garcia",
      specialty: "Healthcare Policy",
      hourlyRate: 210,
      rating: 4.8,
      availability: "Available tomorrow",
      categoryId: 6,
      image: "/images/doctor1.jpg",
    },
    {
      id: 603,
      name: "Dr. Kevin Park",
      specialty: "Operations Management",
      hourlyRate: 200,
      rating: 4.6,
      availability: "Available today",
      categoryId: 6,
      image: "/images/doctor1.jpg",
    },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredExperts(experts)
    } else {
      const filtered = experts.filter(
        (expert) =>
          expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredExperts(filtered)
    }
  }, [searchQuery])

  useEffect(() => {
    setFilteredExperts(experts)
  }, [])

  const getCategoryGradient = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.gradient : ""
  }

  const getCategoryShadow = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.shadowColor : ""
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1E2B58]">Healthcare Professionals</h1>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search experts..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E2B58]/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
            onClick={() => setActiveCategory(0)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 0
                ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Experts
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.title}
            </button>
          ))}
          
        </div>

        {/* Category Sections */}
        {categories.map(
          (category) =>
            (activeCategory === 0 || activeCategory === category.id) && (
              <div key={category.id} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#1E2B58]">{category.title}</h2>
                    <p className="text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
                    <span className="font-medium">{category.members} Experts</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                      <span>{category.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Experts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredExperts
                    .filter((expert) => expert.categoryId === category.id)
                    .map((expert) => (
                      <div
                        key={expert.id}
                        className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
                        style={{
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        {/* Gradient overlay that appears on hover */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${getCategoryGradient(expert.categoryId)}`}
                        ></div>

                        {/* Gradient border top */}
                        <div className={`h-1 w-full bg-gradient-to-r ${getCategoryGradient(expert.categoryId)}`}></div>

                        <div className="p-5">
                          <div className="flex items-center gap-4">
                            <div
                              className={`relative w-16 h-16 rounded-full overflow-hidden border-2 border-white ${getCategoryShadow(expert.categoryId)}`}
                            >
                              <Image 
                                src={expert.image}
                                alt={expert.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{expert.name}</h3>
                              <p className="text-sm text-gray-600">{expert.specialty}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                              <span className="text-sm font-medium">{expert.rating}</span>
                            </div>
                            <div className="text-xl font-bold text-[#1E2B58]">
                              ${expert.hourlyRate}
                              <span className="text-sm font-normal text-gray-500">/hr</span>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {expert.availability}
                          </div>

                          <button
                            className={`mt-4 w-full py-2 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r ${getCategoryGradient(expert.categoryId)} hover:shadow-md flex justify-center items-center`}
                          >
                            Hire Me <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ),
        )}

        {/* No results message */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No experts found matching your search</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <footer className="bg-[#1E2B58] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Healthcare Professionals Network. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

