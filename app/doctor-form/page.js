"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { motion, AnimatePresence } from "framer-motion"

export default function DoctorRegistrationForm() {
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
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const router = useRouter(); // ✅ Initialize router


  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleInputBlur = () => {
    setFocusedField("")
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
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    router.push("/");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false);
    

    // Handle success
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const InputWrapper = ({ children, label, required = false }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )

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
            {[1, 2, 3].map((step) => (
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
                    {step === 1 ? "Personal Info" : step === 2 ? "Professional Details" : "Documents"}
                  </div>
                </div>
                {step < 3 && (
                  <div className="hidden sm:block absolute w-full top-5">
                    <div
                      className={`h-0.5 ${
                        step < currentStep ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-gray-200"
                      }`}
                    ></div>
                  </div>
                )}
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      <InputWrapper label="Title" required>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("title")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "title" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Dr">Dr.</option>
                          <option value="Prof">Prof.</option>
                          <option value="Assoc">Assoc. Prof.</option>
                        </select>
                      </InputWrapper>

                      <InputWrapper label="First Name" required>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("firstName")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "firstName"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                      </InputWrapper>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <InputWrapper label="Email" required>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("email")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "email" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                      </InputWrapper>

                      <InputWrapper label="Phone" required>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("phone")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "phone" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                        />
                      </InputWrapper>
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
                      <InputWrapper label="Specialization" required>
                        <select
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("specialization")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "specialization"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
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
                      </InputWrapper>

                      <InputWrapper label="Years of Experience" required>
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus("experience")}
                          onBlur={handleInputBlur}
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            focusedField === "experience"
                              ? "border-indigo-500 ring-2 ring-indigo-200"
                              : "border-gray-300"
                          } focus:outline-none transition-all duration-200`}
                          required
                          min="0"
                        />
                      </InputWrapper>
                    </div>

                    <InputWrapper label="Medical License Number" required>
                      <input
                        type="text"
                        name="license"
                        value={formData.license}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("license")}
                        onBlur={handleInputBlur}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          focusedField === "license" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                        } focus:outline-none transition-all duration-200`}
                        required
                      />
                    </InputWrapper>

                    <InputWrapper label="Current Hospital/Clinic">
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus("hospital")}
                        onBlur={handleInputBlur}
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          focusedField === "hospital" ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-300"
                        } focus:outline-none transition-all duration-200`}
                      />
                    </InputWrapper>
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
                    <InputWrapper label="Profile Photo" required>
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
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
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
                              <span>Upload a file</span>
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
                        </div>
                      </div>
                    </InputWrapper>

                    <InputWrapper label="Medical License Document" required>
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
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
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
                              <span>Upload a file</span>
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
                        </div>
                      </div>
                    </InputWrapper>

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
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
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

