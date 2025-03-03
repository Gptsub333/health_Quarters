"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Input from "@/components/ui/input"
import { useForm } from "react-hook-form"
// import emailjs from "emailjs-com";


const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

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

export default function DoctorRegistrationForm() {
  const {  } = useForm()

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    license: "",
    hospital: "",
    city: "",
    country: "",
    bio: "",
    image: null,
    documents: null,
    terms: false,
    hourlyRate: "",
    availableDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    designation: "",
    category: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const router = useRouter()
  const [errors, setErrors] = useState({})

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleInputBlur = () => {
    setFocusedField("")
  }

  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "email":
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "phone":
        if (value && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)) {
          error = "Please enter a valid phone number"
        }
        break
      case "experience":
        if (value && (isNaN(value) || Number.parseInt(value) < 0)) {
          error = "Experience must be a positive number"
        }
        break
      case "hourlyRate":
        if (value && (isNaN(value) || Number.parseFloat(value) <= 0)) {
          error = "Hourly rate must be greater than zero"
        }
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    return !error
  }

  const Label = ({ className, ...props }) => {
    return (
      <label
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    )
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    if (type === "file") {
      const fileInput = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: fileInput.files?.[0] || null,
      }))
    } else if (type === "checkbox") {
      const checkbox = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Validate the field
      validateField(name, value)
    }
  }

  console.log(currentStep)

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    e.stopPropagation() // Prevent the form event from bubbling up the DOM
    console.log("Form submission started")



    setIsSubmitting(true)
    console.log("Validation passed, preparing form data")

    // Prepare the form data
    const fileData = new FormData()

    // Append all text fields to FormData
    fileData.append("Title", formData.title)
    fileData.append("FirstName", formData.firstName)
    fileData.append("LastName", formData.lastName || "")
    fileData.append("Email", formData.email)
    fileData.append("Phone", formData.phone)
    fileData.append("Specialization", formData.specialization)
    fileData.append("Experience", formData.experience)
    fileData.append("LicenseNumber", formData.license)
    fileData.append("Hospital", formData.hospital || "")
    fileData.append("City", formData.city || "")
    fileData.append("Country", formData.country || "")
    fileData.append("Bio", formData.bio || "")
    fileData.append("HourlyRate", formData.hourlyRate)
    fileData.append("Designation", formData.designation)
    fileData.append("Category", formData.category)
    fileData.append("TermsAccepted", formData.terms ? "Yes" : "No")

    // Append available days as a comma-separated string
    const availableDays = Object.keys(formData.availableDays)
      .filter((day) => formData.availableDays[day])
      .join(",")
    fileData.append("AvailableDays", availableDays)

    // Append files if they exist
    if (formData.image) {
      fileData.append("ProfileImage", formData.image)
      console.log("Profile image attached:", formData.image.name)
    }

    if (formData.documents) {
      fileData.append("LicenseDocument", formData.documents)
      console.log("License document attached:", formData.documents.name)
    }

    // Log the form data being submitted
    console.log("Form data being submitted:")
    console.log(fileData)
    for (const [key, value] of fileData.entries()) {
      // Don't log the full file objects, just their names
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name}`)
      } else {
        console.log(`${key}: ${value}`)
      }
    }

    try {
      console.log("Submitting to API endpoint...")
      // For FormData (with file uploads)
      // Replace with your actual API endpoint
      const response = await fetch("https://healthquarters-backend.onrender.com/upload_to_experts", {
        method: "POST",
        body: fileData,
        // Don't set Content-Type header when sending FormData
      })

      if (response.ok) {
        alert("Registration successful! Thank you for joining our medical expert community.")

        // const templateParams = {
        //   user_name: formData.firstName,
        //   user_email: formData.email, // User's email (dynamic)
        //   user_message: formData.title, // Message content
        //   owner_email: "gpt.subscription@springtown.ai", // Owner's email (fixed)
        // };
    
        // emailjs
        //   .send(
        //     "service_has3ls7", // Replace with EmailJS Service ID
        //     "template_aonjlu8", // Replace with EmailJS Template ID
        //     templateParams,
        //     "Xc8OdGbltUPViTZkq" // Replace with EmailJS Public Key
        //   )
        //   .then(() => {
        //     // alert("Email sent successfully to " + formData.email + " and owner!");
        //   })
        //   .catch((error) => {
        //     alert("Failed to send email: " + error.text);
        //   });

        // Redirect to success page or dashboard
        router.push("/")
      } else {
        const errorData = await response.json().catch(() => null)
        console.error("API error response:", errorData)
        alert(`Error submitting form: ${errorData?.message || "Please try again later"}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred while submitting the form. Please try again later.")
      setIsSubmitting(false)
    }

   
  }

  const nextStep = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let canProceed = true

    // Validate fields based on current step
    if (currentStep === 1) {
      const step1Fields = ["title", "firstName", "email", "phone"]
      step1Fields.forEach((field) => {
        if (!validateField(field, formData[field])) {
          canProceed = false
        }
      })

      // Additional validation for required fields
      if (!formData.title || !formData.firstName || !formData.email || !formData.phone) {
        canProceed = false
        alert("Please fill in all required fields before proceeding.")
      }
    } else if (currentStep === 2) {
      const step2Fields = ["specialization", "experience", "hourlyRate", "license"]
      step2Fields.forEach((field) => {
        if (!validateField(field, formData[field])) {
          canProceed = false
        }
      })

      // Check if at least one day is selected
      const hasSelectedDay = Object.values(formData.availableDays).some((day) => day)
      if (!hasSelectedDay) {
        canProceed = false
        alert("Please select at least one available day.")
      }

      // Additional validation for required fields
      if (!formData.specialization || !formData.experience || !formData.hourlyRate || !formData.license) {
        canProceed = false
        alert("Please fill in all required fields before proceeding.")
      }
    } else if (currentStep === 3) {
      if (!formData.category) {
        canProceed = false
        alert("Please select an expertise category before proceeding.")
      }
    }

    if (canProceed) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: !prev.availableDays[day],
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join Our Medical Expert Community
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Complete your profile to connect with patients and peers
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1">
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step <= currentStep ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-gray-200"
                      } text-white font-semibold transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {step}
                    </motion.div>
                  </div>
                  <div className="text-xs text-center mt-2 font-medium text-gray-600">
                    {step === 1
                      ? "Personal Info"
                      : step === 2
                        ? "Professional Details"
                        : step === 3
                          ? "Category"
                          : "Documents"}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={()=>handleSubmit()} className="space-y-6">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Title <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("title")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "title"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.title
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Dr">Dr.</option>
                          <option value="Prof">Prof.</option>
                          <option value="Assoc">Assoc. Prof.</option>
                        </select>
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="firstName" className="text-sm font-medium">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("firstName")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "firstName"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("email")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "email"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("phone")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "phone"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.phone
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="specialization" className="text-sm font-medium">
                          Specialization <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="specialization"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("specialization")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "specialization"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.specialization
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        >
                          <option value="">Select</option>
                          <option value="cardiology">Cardiology</option>
                          <option value="neurology">Neurology</option>
                          <option value="pediatrics">Pediatrics</option>
                          <option value="orthopedics">Orthopedics</option>
                        </select>
                        {errors.specialization && <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="experience" className="text-sm font-medium">
                          Years of Experience <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="number"
                          value={formData.experience}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("experience")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "experience"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.experience
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                          min="0"
                        />
                        {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="hourlyRate" className="text-sm font-medium">
                          Hourly Rate ($) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="hourlyRate"
                          name="hourlyRate"
                          type="number"
                          value={formData.hourlyRate}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("hourlyRate")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "hourlyRate"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : errors.hourlyRate
                                ? "border-red-500"
                                : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                          min="0"
                          step="0.01"
                        />
                        {errors.hourlyRate && <p className="mt-1 text-sm text-red-500">{errors.hourlyRate}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="designation" className="text-sm font-medium">
                          Designation <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="designation"
                          name="designation"
                          type="text"
                          value={formData.designation}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("designation")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "designation"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                          placeholder="e.g. Senior Consultant, Head of Department"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="license" className="text-sm font-medium">
                        Medical License Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="license"
                        name="license"
                        type="text"
                        value={formData.license}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("license")}
                        onBlur={handleInputBlur}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          focusedField === "license"
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : errors.license
                              ? "border-red-500"
                              : "border-gray-300"
                        } focus:outline-none transition-all duration-200`}
                        required
                      />
                      {errors.license && <p className="mt-1 text-sm text-red-500">{errors.license}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="hospital" className="text-sm font-medium">
                        Current Hospital/Clinic
                      </Label>
                      <Input
                        id="hospital"
                        name="hospital"
                        type="text"
                        value={formData.hospital}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("hospital")}
                        onBlur={handleInputBlur}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          focusedField === "hospital" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                        } focus:outline-none transition-all duration-200`}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Available Days <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        {Object.keys(formData.availableDays).map((day) => (
                          <div key={day} className="flex items-center">
                            <input
                              type="checkbox"
                              id={day}
                              checked={formData.availableDays[day]}
                              onChange={() => handleDayChange(day)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={day} className="ml-2 block text-sm text-gray-700 capitalize">
                              {day}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        Select Your Expertise Category <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => setFormData((prev) => ({ ...prev, category: category.title.toString() }))}
                            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                              formData.category === category.id.toString()
                                ? "ring-2 ring-offset-2 ring-indigo-500 scale-[1.02]"
                                : ""
                            }`}
                          >
                            <div className={`bg-gradient-to-r ${category.gradient} p-5 ${category.shadowColor}`}>
                              <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>
                              <p className="text-white/90 text-sm mb-3">{category.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {category.expertise.map((item, idx) => (
                                  <span key={idx} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                                    {item}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="text-xs text-white">{category.members} members</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-xs text-white">{category.rating}</span>
                                </div>
                              </div>
                              {formData.category === category.title.toString() && (
                                <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-indigo-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <Label htmlFor="image" className="text-sm font-medium">
                        Profile Photo <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-indigo-500 transition-colors duration-200">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <div className="flex justify-center w-[500px]">Upload a file</div>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleInputChange}
                                required
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                          {/* Display the uploaded file name */}
          {formData?.image?.name && (
            <p className="text-sm text-blue-300 mt-2">{formData?.image?.name}</p>
          )}
                        </div>
                      </div>
                      {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="documents" className="text-sm font-medium">
                        Medical License Document <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-indigo-500 transition-colors duration-200">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="documents"
                              className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                          
                              <div className="flex justify-center w-[500px]">Upload a file</div>
                              <input
                                id="documents"
                                name="documents"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.doc,.docx"
                                onChange={handleInputChange}
                                required
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                                    {/* Display the uploaded file name */}
          {formData?.documents?.name && (
            <p className="text-sm text-blue-300 mt-2">{formData?.documents?.name}</p>
          )}
                        </div>
                      </div>
                      {errors.documents && <p className="mt-1 text-sm text-red-500">{errors.documents}</p>}
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{" "}
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Previous
                  </button>
                )}
                <div className="ml-auto">
  {currentStep < 4 ? (
    <button
      type="button"
      onClick={(e)=>nextStep(e)}
      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
    >
      Next Step
    </button>
  ) : (
    <button
      type="submit"
      disabled={isSubmitting}
      onClick={handleSubmit}
      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        "Complete Registration"
      )}
    </button>
  )}
</div>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

