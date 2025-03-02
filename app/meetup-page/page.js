"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, User, Users, MessageSquare, ThumbsUp, Filter, Search } from "lucide-react"

export default function HealthMeetups() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [meetups, setMeetups] = useState([])

  // Simulated data for past meetups
  useEffect(() => {
    // In a real app, this would be fetched from an API
    const pastMeetups = [
      {
        id: 1,
        date: "March 15, 2025",
        time: "2:00 PM - 4:30 PM",
        title: "Advances in Preventive Medicine",
        location: "Virtual Event",
        category: "research",
        image: "/images/meetup1.avif",
        speaker: {
          name: "Dr. Sarah Johnson",
          title: "Chief of Preventive Medicine, Metro Hospital",
          image: "/images/doctor1.jpg",
          bio: "Leading researcher in preventive healthcare with over 15 years of experience",
        },
        description:
          "An in-depth discussion on the latest advances in preventive medicine and how AI is transforming early diagnosis protocols.",
        insights: [
          "New screening methods using AI have shown 37% higher accuracy",
          "Preventive care reduces healthcare costs by up to 40%",
          "Integration of wearable data has revolutionized patient monitoring",
        ],
        attendees: 156,
        testimonials: [
          {
            name: "Michael Chen",
            role: "Healthcare Administrator",
            comment:
              "The insights on AI-driven preventive protocols were immediately applicable to our hospital systems.",
          },
          {
            name: "Dr. Lisa Patel",
            role: "Family Physician",
            comment: "Dr. Johnson's presentation changed how I approach patient screening in my practice.",
          },
        ],
      },
      {
        id: 2,
        date: "February 28, 2025",
        time: "1:00 PM - 3:00 PM",
        title: "Mental Health in the Digital Age",
        location: "HealthQuarters Hub, New York",
        category: "wellness",
        image: "/images/meetup2.avif",
        speaker: {
          name: "Dr. Marcus Williams",
          title: "Clinical Psychologist, Digital Wellness Institute",
          image: "/images/doctor3.jpg",
          bio: "Specializes in the intersection of technology and mental health",
        },
        description:
          "Exploring the impact of digital technologies on mental health and innovative therapeutic approaches using AI.",
        insights: [
          "Digital interventions show comparable efficacy to traditional therapy in mild to moderate cases",
          "AI-powered mood tracking improves treatment adherence by 28%",
          "Virtual reality exposure therapy demonstrates promising results for anxiety disorders",
        ],
        attendees: 203,
        testimonials: [
          {
            name: "Emma Rodriguez",
            role: "Mental Health Advocate",
            comment: "The discussion on accessibility through digital platforms was eye-opening and hopeful.",
          },
          {
            name: "Dr. James Kim",
            role: "Psychiatrist",
            comment:
              "I've already implemented some of the AI screening tools discussed and seen positive patient engagement.",
          },
        ],
      },
      {
        id: 3,
        date: "January 20, 2025",
        time: "10:00 AM - 12:30 PM",
        title: "Nutritional Genomics: Personalized Diet Plans",
        location: "Medical Sciences Building, Boston",
        category: "nutrition",
        image: "/images/meetup1.avif",
        speaker: {
          name: "Dr. Amara Patel",
          title: "Nutritional Geneticist, Genome Health Institute",
          image: "/images/doctor4.jpg",
          bio: "Pioneer in the field of nutritional genomics and personalized nutrition",
        },
        description:
          "How genetic testing is revolutionizing nutritional advice and enabling truly personalized diet plans.",
        insights: [
          "Genetic factors influence nutrient metabolism by up to 70% in some pathways",
          "Personalized nutrition plans show 3x better adherence rates than generic diets",
          "AI algorithms can predict nutritional needs based on genetic markers with 82% accuracy",
        ],
        attendees: 178,
        testimonials: [
          {
            name: "Thomas Wright",
            role: "Dietitian",
            comment: "Dr. Patel's research has transformed how I develop nutrition plans for my clients.",
          },
          {
            name: "Dr. Sophia Garcia",
            role: "Endocrinologist",
            comment:
              "The integration of genomic data with nutritional science presents exciting possibilities for treating metabolic disorders.",
          },
        ],
      },
      {
        id: 4,
        date: "December 10, 2024",
        time: "3:00 PM - 5:00 PM",
        title: "AI in Medical Imaging: Current Applications",
        location: "Virtual Event",
        category: "technology",
        image: "/images/meetup2.avif",
        speaker: {
          name: "Dr. Robert Chen",
          title: "Head of Radiology AI Research, Tech Medical Center",
          image: "/images/doctor1.jpg",
          bio: "Leading expert in AI applications for medical imaging with multiple patents",
        },
        description:
          "A comprehensive overview of how artificial intelligence is transforming diagnostic imaging across specialties.",
        insights: [
          "AI-assisted diagnosis reduces radiologist reading time by up to 30%",
          "Deep learning algorithms now detect certain abnormalities with 94% accuracy",
          "Integration with electronic health records improves diagnostic context by 40%",
        ],
        attendees: 245,
        testimonials: [
          {
            name: "Dr. Olivia Martinez",
            role: "Radiologist",
            comment:
              "The practical demonstrations of AI tools were incredibly valuable for understanding implementation.",
          },
          {
            name: "Kevin Johnson",
            role: "Healthcare IT Director",
            comment: "Dr. Chen provided clear guidance on infrastructure needs for AI imaging systems.",
          },
        ],
      },
      {
        id: 5,
        date: "November 5, 2024",
        time: "1:00 PM - 4:00 PM",
        title: "Telemedicine Best Practices for Clinicians",
        location: "HealthQuarters Hub, Chicago",
        category: "clinical",
        image: "/images/meetup1.avif",
        speaker: {
          name: "Dr. Jennifer Lee",
          title: "Director of Virtual Care, National Health Network",
          image: "/images/doctor3.jpg",
          bio: "Pioneered telemedicine programs across multiple healthcare systems",
        },
        description:
          "Essential guidelines and best practices for delivering high-quality care through telemedicine platforms.",
        insights: [
          "Proper telemedicine setup improves diagnostic accuracy by 25%",
          "Patient satisfaction increases 32% with optimized virtual workflows",
          "Remote monitoring integration reduces hospital readmissions by 18%",
        ],
        attendees: 189,
        testimonials: [
          {
            name: "Dr. David Wilson",
            role: "Primary Care Physician",
            comment:
              "The practical tips for creating rapport in virtual visits have dramatically improved my patient interactions.",
          },
          {
            name: "Sarah Thompson",
            role: "Nurse Practitioner",
            comment:
              "I've implemented the remote monitoring protocols shared and seen significant improvements in chronic disease management.",
          },
        ],
      },
    ]

    setMeetups(pastMeetups)
  }, [])

  // Filter meetups based on category and search query
  const filteredMeetups = meetups.filter((meetup) => {
    const matchesCategory = activeFilter === "all" || meetup.category === activeFilter
    const matchesSearch =
      meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Meetups" },
    { id: "research", name: "Research" },
    { id: "wellness", name: "Wellness" },
    { id: "nutrition", name: "Nutrition" },
    { id: "technology", name: "Technology" },
    { id: "clinical", name: "Clinical Practice" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 font-sans">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#1E2B58] to-[#2A3A6A] text-white py-16 px-4 md:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">HealthQuartersAI Community Meetups</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90 leading-relaxed">
            Explore our past health and medical focused events, featuring leading experts, groundbreaking research, and
            valuable insights from our community.
          </p>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter className="h-4 w-4 text-[#1E2B58]" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-[#1E2B58] text-white shadow-md"
                      : "bg-blue-50 text-[#1E2B58] hover:bg-blue-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meetups, speakers, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full border border-blue-100 focus:outline-none focus:ring-2 focus:ring-[#1E2B58]/30 focus:border-[#1E2B58]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meetups Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeetups.length > 0 ? (
            filteredMeetups.map((meetup) => (
              <div
                key={meetup.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-50"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px)",
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  const centerX = rect.width / 2
                  const centerY = rect.height / 2
                  const rotateX = (y - centerY) / 20
                  const rotateY = (centerX - x) / 20

                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(1000px)"
                }}
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#1E2B58]/90 text-white shadow-md">
                    {meetup.category.charAt(0).toUpperCase() + meetup.category.slice(1)}
                  </span>
                </div>

                {/* Meetup Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B58]/80 to-transparent z-10"></div>
                  <img
                    src={meetup.image || "/placeholder.svg"}
                    alt={meetup.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">{meetup.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-b from-white to-blue-50/30">
                  <h3 className="text-xl font-bold text-[#1E2B58] mb-3 group-hover:text-[#2A3A6A] transition-colors">
                    {meetup.title}
                  </h3>

                  {/* Speaker Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#1E2B58]/20">
                      <img
                        src={meetup.speaker.image || "/placeholder.svg"}
                        alt={meetup.speaker.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1E2B58]">{meetup.speaker.name}</h4>
                      <p className="text-xs text-gray-600">{meetup.speaker.title}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-5">
                    <p className="text-sm text-gray-700 line-clamp-2">{meetup.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-[#1E2B58]/70" />
                      <span>{meetup.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-[#1E2B58]/70" />
                      <span>{meetup.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 text-[#1E2B58]/70" />
                      <span>{meetup.attendees} Attendees</span>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="mb-5">
                    <h5 className="text-sm font-semibold text-[#1E2B58] mb-2 flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      Key Insights
                    </h5>
                    <ul className="space-y-1">
                      {meetup.insights.map((insight, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-1.5">
                          <span className="text-[#1E2B58] mt-0.5">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonials */}
                  <div>
                    <h5 className="text-sm font-semibold text-[#1E2B58] mb-2 flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Attendee Feedback
                    </h5>
                    <div className="space-y-3">
                      {meetup.testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-blue-50">
                          <p className="text-xs italic text-gray-700 mb-1">&quot;{testimonial.comment}&quot;</p>
                          <div className="flex items-center gap-1.5">
                            <User className="h-3 w-3 text-[#1E2B58]/70" />
                            <span className="text-xs font-medium text-[#1E2B58]">{testimonial.name}</span>
                            <span className="text-xs text-gray-500">• {testimonial.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-[#1E2B58]/50" />
              </div>
              <h3 className="text-xl font-medium text-[#1E2B58] mb-2">No meetups found</h3>
              <p className="text-gray-600 max-w-md">
                We couldn&apos;t find any meetups matching your current filters. Try adjusting your search criteria or browse
                all meetups.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all")
                  setSearchQuery("")
                }}
                className="mt-4 px-4 py-2 bg-[#1E2B58] text-white rounded-full hover:bg-[#2A3A6A] transition-colors"
              >
                View All Meetups
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E2B58] text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">HealthQuartersAI Community</h2>
              <p className="text-blue-100 max-w-md">
                Join our community of healthcare professionals, researchers, and innovators dedicated to advancing
                medical knowledge through technology.
              </p>
            </div>
            <div className="flex flex-col md:items-end justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
                <h3 className="text-lg font-medium mb-3">Stay Updated</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Subscribe to receive notifications about upcoming meetups and events.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 flex-1"
                  />
                  <button className="px-4 py-2 bg-white text-[#1E2B58] font-medium rounded-r-lg hover:bg-blue-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-sm text-blue-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} HealthQuartersAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

