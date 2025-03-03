"use client"

import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import Input from "@/components/ui/input"
import Label from "@/components/Label/label"
import Calendar from "@/components/calendar/calendar"
import Select from "@/components/select/select"
import SelectItem from "@/components/selectItem/selectItem"
import RadioGroupItem from "@/components/RadioGroupItem/RadioGroupItem"
import RadioGroup from "@/components/RadioGroup/RadioGroup"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/Card/card"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Popover/popover"

// Utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

// UI Components
const Button = ({ className, variant = "default", children, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm()

  const [inceptionDate, setInceptionDate] = useState(null)
  const [closingDate, setClosingDate] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [deckFile, setDeckFile] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const referralSource = watch("referralSource")
  const businessModel = watch("businessModel")
  const sector = watch("sector")
  const financialInstrument = watch("financialInstrument")
  const isRaisingCapital = watch("isRaisingCapital")
  const [isOpen, setIsOpen] = useState(false) // State to control popover visibility

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Company Details" },
    { number: 3, label: "Financials" },
    { number: 4, label: "Documents" },
  ]
    // Prepare the form data
  const onSubmit = async (data, event) => {
    console.log("data", data)
    console.log("event", event)
    event.stopPropagation()
    event.preventDefault()
    const formData = new FormData()
    formData.append("FirstName", data.founderFirstName)
    formData.append("LastName", data.founderLastName)
    formData.append("Email", data.email)
    formData.append("CompanyName", data.companyName)
    formData.append("Website", data.companyWebsite)
    formData.append("HearAboutUs", data.referralSource || data.otherReferralSource || "")
    formData.append("Description", data.companyDescription)
    formData.append("Problem", data.problemSolved)
    formData.append("Solution", data.solution)
    formData.append("BusinessModel", data.businessModel || data.otherBusinessModel || "")
    formData.append("InceptionDate", inceptionDate ? format(inceptionDate, "yyyy-MM-dd") : "")
    formData.append("CurrentStage", data.stagevalue)
    formData.append("Industry", data.industry)
    formData.append("Sector", data.sector || data.otherSector || "")
    formData.append("City", data.city)
    formData.append("State", data.stateProvince)
    formData.append("ZipCode", data.postalCode)
    formData.append("Country", data.country)
    formData.append("FinancialInstrument", data.financialInstrument || data.otherFinancialInstrument || "")
    formData.append("RaisingCapital", data.isRaisingCapital)
    formData.append("CapitalRaised", data.totalCapitalRaised)
    formData.append("Employees", data.fullTimeEmployees)
    formData.append("ParttimeEmployees", data.partTimeStaff)
    formData.append("LastYearRevenue", data.lastYearRevenue)
    formData.append("Customers", data.payingCustomers)
    formData.append("PilotCustomers", data.pilotPrograms)

    // Append files if they exist
    if (logoFile) {
      formData.append("Logo", logoFile) // This is where the file is added
    }

    if (deckFile) {
      formData.append("PitchDeck", deckFile) // This is where the file is added
    }

    // Optionally append other fields like links
    formData.append("PitchDeckLink", data.deckLink)
    formData.append("PitchVideoLink", data.pitchVideo)

    // Log form data for debugging
    console.log("Form Data:", Object.fromEntries(formData.entries()))

    try {
      // Send the form data (including files) to the backend
      const response = await fetch("http://localhost:8000/upload_to_startups", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("Success:", responseData)
        setIsSubmitted(true) // Form submitted successfully
      } else {
        console.error("Error submitting form")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "logo") {
        setLogoFile(e.target.files[0])
      } else if (type === "deck") {
        setDeckFile(e.target.files[0])
      }
    }
  }

  // Validation based on the current step
  const validateStep = async (step) => {
    let isValid = true
    const fields = {
      1: ["founderFirstName", "founderLastName", "email", "companyName", "companyWebsite", "referralSource"],
      2: ["companyDescription", "problemSolved", "solution", "country"],
      3: [
        "totalCapitalRaised",
        "fullTimeEmployees",
        "partTimeStaff",
        "lastYearRevenue",
        "payingCustomers",
        "pilotPrograms",
      ],
      4: [],
    }

    if (step === 1 && referralSource === "other") {
      fields[1].push("otherReferralSource")
    }

    if (step === 2 && sector === "other") {
      fields[2].push("otherSector")
    }

    if (step === 2 && businessModel === "other") {
      fields[2].push("otherBusinessModel")
    }

    if (step === 3 && financialInstrument === "other") {
      fields[3].push("otherFinancialInstrument")
    }


    const stepValid = await trigger(fields[step])
    if (!stepValid) {
      isValid = false
    }

    return isValid
  }

  const nextStep = async () => {
    // First validate the current step
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
      window.scrollTo(0, 0)
    } else {
      console.log("Please fill in all required fields for this step")
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }



  if (isSubmitted) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
          <Card className="w-full max-w-3xl shadow-lg border-0 overflow-hidden bg-white transition-all duration-500 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
              <CardTitle className="text-3xl font-bold">Submission Received</CardTitle>
              <CardDescription className="text-blue-100 text-lg mt-2">
                Thank you for your application. We will review it shortly and get back to you if there is a potential fit.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Application Submitted Successfully</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We&apos;ve received your submission and will review it shortly. We review applications monthly and
                  will be in touch if there&apos;s a potential fit.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 flex justify-center">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Submit Another Application
              </Button>
            </CardFooter>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden bg-white transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-6 md:p-8">
              <CardTitle className="text-2xl md:text-3xl font-bold">Submissions Form</CardTitle>
              <CardDescription className="text-white mt-2 text-base md:text-lg">
                For early-stage Startups who want to explore the power of AI in the healthcare field.
              </CardDescription>
            </CardHeader>

            <div className="bg-white px-6 py-8 border-b rounded-lg shadow-sm">
              <div className="flex items-center justify-between relative w-full max-w-3xl mx-auto">
                {steps.map((step) => (
                  <div key={step.number} className="relative flex flex-col items-center">
                    {/* Step Circle */}
                    <button
                      onClick={() => setCurrentStep(step.number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 relative z-10 transition-all duration-300 ${currentStep > step.number
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                        : currentStep === step.number
                          ? "bg-white text-blue-600 border-2 border-blue-500 shadow-md"
                          : "bg-white text-gray-400 border-2 border-gray-200"
                        }`}
                    >
                      {currentStep > step.number ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </button>

                    {/* Step Label */}
                    <span
                      className={`text-xs font-medium mt-1 text-center transition-colors duration-300 ${currentStep >= step.number ? "text-blue-600" : "text-gray-500"
                        } hidden sm:block`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Labels (only shown on very small screens) */}
              <div className="sm:hidden text-center mt-4">
                <span className="text-sm font-medium text-blue-600">
                  {steps.find((step) => step.number === currentStep)?.label}
                </span>
              </div>
            </div>

            <form onSubmit={(event)=>handleSubmit(onSubmit(event))}>
              <CardContent className="p-6 md:p-8 space-y-8 overflow-auto">
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="text-sm text-gray-500 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 rounded-r-md">
                      This form will take roughly 10 minutes to complete. We review applications monthly. We will not
                      share your personal information without permission, except when required by law.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="founderFirstName" className="text-sm font-medium">
                          Founder First Name *
                        </Label>
                        <Input
                          id="founderFirstName"
                          placeholder="John"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("founderFirstName", { required: "First name is required" })}
                        />
                        {errors.founderFirstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.founderFirstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="founderLastName" className="text-sm font-medium">
                          Founder Last Name *
                        </Label>
                        <Input
                          id="founderLastName"
                          placeholder="Smith"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("founderLastName", { required: "Last name is required" })}
                        />
                        {errors.founderLastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.founderLastName.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="companyName" className="text-sm font-medium">
                          What is the name of your company? *
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Acme Inc."
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("companyName", { required: "Company name is required" })}
                        />
                        {errors.companyName && (
                          <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="companyWebsite" className="text-sm font-medium">
                        Company website *
                      </Label>
                      <Input
                        id="companyWebsite"
                        placeholder="https://www.example.com"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("companyWebsite", {
                          required: "Company website is required",
                          pattern: {
                            value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?/,
                            message: "Please enter a valid website URL",
                          },
                        })}
                      />
                      {errors.companyWebsite && (
                        <p className="text-red-500 text-xs mt-1">{errors.companyWebsite.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="referralSource" className="text-sm font-medium">
                        Where did you hear about us? *
                      </Label>
                      <Select onValueChange={(value) => setValue("referralSource", value)} defaultValue="">
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </Select>
                      {errors.referralSource && (
                        <p className="text-red-500 text-xs mt-1">{errors.referralSource.message}</p>
                      )}
                    </div>

                    {referralSource === "other" && (
                      <div className="space-y-1">
                        <Label htmlFor="otherReferralSource" className="text-sm font-medium">
                          If you picked other for how did you hear about us, please include here.
                        </Label>
                        <Input
                          id="otherReferralSource"
                          placeholder="Please specify"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("otherReferralSource", {
                            required: referralSource === "other" ? "Please specify how you heard about us" : false,
                          })}
                        />
                        {errors.otherReferralSource && (
                          <p className="text-red-500 text-xs mt-1">{errors.otherReferralSource.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1">
                      <Label htmlFor="companyDescription" className="text-sm font-medium">
                        Please provide a short description of your company. *
                      </Label>
                      <Input
                        id="companyDescription"
                        placeholder="Describe your company in a few sentences"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        {...register("companyDescription", { required: "Company description is required" })}
                      />
                      {errors.companyDescription && (
                        <p className="text-red-500 text-xs mt-1">{errors.companyDescription.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="problemSolved" className="text-sm font-medium">
                        In a few sentences, what is the problem your startup solves? *
                      </Label>
                      <Input
                        id="problemSolved"
                        placeholder="Describe the problem your startup addresses"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        {...register("problemSolved", { required: "Problem description is required" })}
                      />
                      {errors.problemSolved && (
                        <p className="text-red-500 text-xs mt-1">{errors.problemSolved.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="solution" className="text-sm font-medium">
                        In a few sentences, what is your solution? *
                      </Label>
                      <Input
                        id="solution"
                        placeholder="Describe your solution"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        {...register("solution", { required: "Solution description is required" })}
                      />
                      {errors.solution && <p className="text-red-500 text-xs mt-1">{errors.solution.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="businessModel" className="text-sm font-medium">
                        What is your Business Model? (Please select the options that apply to your business the most -
                        the fewer the better!)
                      </Label>
                      <Select onValueChange={(value) => setValue("businessModel", value)} defaultValue="">
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="licensing">Licensing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </Select>
                    </div>

                    {businessModel === "other" && (
                      <div className="space-y-1">
                        <Label htmlFor="otherBusinessModel" className="text-sm font-medium">
                          If you picked other, what is the business model?
                        </Label>
                        <Input
                          id="otherBusinessModel"
                          placeholder="Please specify"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("otherBusinessModel", {
                            required: businessModel === "other" ? "Please specify your business model" : false,
                          })}
                        />
                        {errors.otherBusinessModel && (
                          <p className="text-red-500 text-xs mt-1">{errors.otherBusinessModel.message}</p>
                        )}
                      </div>
                    )}

                    <div className="w-full space-y-1">
                      {/* Label */}
                      <Label
                        htmlFor="inceptionDate"
                        className="text-sm font-medium tracking-wide text-gray-700 flex items-center"
                      >
                        Company Inception Date
                        <span className="text-gray-400 ml-1 text-xs font-normal">(When was the company founded?)</span>
                      </Label>

                      <Popover open={isOpen} onOpenChange={setIsOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`
                                                w-full h-11 px-4 justify-between text-left rounded-md border border-gray-300
                                                focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200
                                                hover:border-blue-400 hover:bg-blue-50/30
                                                ${!inceptionDate ? "text-gray-500" : ""}
                                            `}
                          >
                            <div className="flex items-center">
                              <CalendarIcon
                                className={`mr-2 h-5 w-5 ${inceptionDate ? "text-blue-600" : "text-gray-400"}`}
                              />
                              <span className={inceptionDate ? "text-gray-800 font-medium" : "text-gray-500"}>
                                {inceptionDate ? format(inceptionDate, "MMMM d, yyyy") : "Select founding date"}
                              </span>
                            </div>
                            {/* Dropdown Icon */}
                            <svg
                              className="h-4 w-4 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-0 border border-gray-200 rounded-lg shadow-lg w-auto">
                          <Calendar
                            mode="single"
                            selected={inceptionDate}
                            onSelect={(date) => {
                              setInceptionDate(date)
                              setIsOpen(false) // ✅ Close the calendar after selection
                            }}
                            initialFocus
                            className="rounded-md"
                            classNames={{
                              day_selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
                              day_today: "bg-gray-100 text-gray-900",
                              day_outside: "text-gray-300 opacity-50",
                            }}
                          />
                        </PopoverContent>
                      </Popover>

                      {/* Helper Text */}
                      <p className="text-xs text-gray-500 mt-1">
                        This helps us understand your company&apos;s history and experience.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="stagevalue" className="text-sm font-medium">
                          What stage is your business? *
                        </Label>
                        <Select onValueChange={(value) => setValue("stagevalue", value)} defaultValue="">
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series_a">Series A</SelectItem>
                          <SelectItem value="series_b">Series B</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="referralSource" className="text-sm font-medium">
                          What industry is your company? *
                        </Label>
                        <Select onValueChange={(value) => setValue("industry", value)} defaultValue="">
                          <SelectItem value="life_sciences">Life Sciences</SelectItem>
                          <SelectItem value="energy_transition">Energy Transition</SelectItem>
                          <SelectItem value="identity_security">Identity & Security</SelectItem>
                          <SelectItem value="climate_tech">Climate Tech</SelectItem>
                          <SelectItem value="material_sciences">Material Sciences</SelectItem>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="referralSource" className="text-sm font-medium">
                        What sector(s) is your company? *
                      </Label>
                      <Select onValueChange={(value) => setValue("sector", value)} defaultValue="">
                        <SelectItem value="biotech">Biotech</SelectItem>
                        <SelectItem value="medtech">MedTech</SelectItem>
                        <SelectItem value="cleantech">CleanTech</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="ai_ml">AI/ML</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </Select>
                    </div>

                    {sector === "other" && (
                      <div className="space-y-1">
                        <Label htmlFor="otherSector" className="text-sm font-medium">
                          If you chose Other&apos;s, please specify
                        </Label>
                        <Input
                          id="otherSector"
                          placeholder="Please specify"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("otherSector", {
                            required: sector === "other" ? "Please specify your sector" : false,
                          })}
                        />
                        {errors.otherSector && (
                          <p className="text-red-500 text-xs mt-1">{errors.otherSector.message}</p>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Geography? *</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <Label htmlFor="city" className="text-sm font-medium">
                            City
                          </Label>
                          <Input
                            id="city"
                            placeholder="San Francisco"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("city")}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="stateProvince" className="text-sm font-medium">
                            State / Province
                          </Label>
                          <Input
                            id="stateProvince"
                            placeholder="California"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("stateProvince")}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="postalCode" className="text-sm font-medium">
                            Postal / Zip Code
                          </Label>
                          <Input
                            id="postalCode"
                            placeholder="94105"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("postalCode")}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="country" className="text-sm font-medium">
                            Country *
                          </Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("country", { required: "Country is required" })}
                          />
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1">
                      <Label htmlFor="financialInstrument" className="text-sm font-medium">
                        What is your financial instrument?
                      </Label>
                      <Select onValueChange={(value) => setValue("financialInstrument", value)} defaultValue="">
                        <SelectItem value="equity">Equity</SelectItem>
                        <SelectItem value="convertible_note">Convertible Note</SelectItem>
                        <SelectItem value="safe">SAFE</SelectItem>
                        <SelectItem value="debt">Debt</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </Select>
                    </div>

                    {financialInstrument === "other" && (
                      <div className="space-y-1">
                        <Label htmlFor="otherFinancialInstrument" className="text-sm font-medium">
                          If you chose Other&apos;s, please do specify
                        </Label>
                        <Input
                          id="otherFinancialInstrument"
                          placeholder="Please specify"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("otherFinancialInstrument", {
                            required:
                              financialInstrument === "other" ? "Please specify your financial instrument" : false,
                          })}
                        />
                        {errors.otherFinancialInstrument && (
                          <p className="text-red-500 text-xs mt-1">{errors.otherFinancialInstrument.message}</p>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <Label htmlFor="isRaisingCapital" className="text-sm font-medium">
                        Are you currently raising capital? *
                      </Label>
                      <RadioGroup
                        onValueChange={(value) => setValue("isRaisingCapital", value)}
                        className="flex space-x-4 mt-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="raising-yes" />
                          <Label htmlFor="raising-yes" className="font-normal">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="raising-no" />
                          <Label htmlFor="raising-no" className="font-normal">
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {isRaisingCapital === "yes" && (
                      <>
                        <div className="space-y-1">
                          <Label htmlFor="raiseAmount" className="text-sm font-medium">
                            What is your current raise amount?
                          </Label>
                          <Input
                            id="raiseAmount"
                            placeholder="$1,000,000"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("raiseAmount")}
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="institutionalCapital" className="text-sm font-medium">
                            Do you have any institutional capital (venture capital)?
                          </Label>
                          <RadioGroup
                            onValueChange={(value) => setValue("institutionalCapital", value)}
                            className="flex space-x-4 mt-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="institutional-yes" />
                              <Label htmlFor="institutional-yes" className="font-normal">
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="institutional-no" />
                              <Label htmlFor="institutional-no" className="font-normal">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="anticipatedCloseDate" className="text-sm font-medium">
                            Anticipated close date for this round
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                                  !closingDate && "text-gray-400",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {closingDate ? format(closingDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={closingDate}
                                onSelect={(date) => {
                                  setClosingDate(date)
                                  setValue("anticipatedCloseDate", date)
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </>
                    )}

                    <div className="space-y-1">
                      <Label htmlFor="totalCapitalRaised" className="text-sm font-medium">
                        What is your total capital raised to date (debt and equity combined)? *
                      </Label>
                      <Input
                        id="totalCapitalRaised"
                        placeholder="$2,000,000"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("totalCapitalRaised", { required: "Total capital raised is required" })}
                      />
                      {errors.totalCapitalRaised && (
                        <p className="text-red-500 text-xs mt-1">{errors.totalCapitalRaised.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="fullTimeEmployees" className="text-sm font-medium">
                          What is your number of full-time employees? *
                        </Label>
                        <Input
                          id="fullTimeEmployees"
                          type="number"
                          placeholder="5"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("fullTimeEmployees", { required: "Number of full-time employees is required" })}
                        />
                        {errors.fullTimeEmployees && (
                          <p className="text-red-500 text-xs mt-1">{errors.fullTimeEmployees.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="partTimeStaff" className="text-sm font-medium">
                          What is your total number of part-time staff, including freelance and contractors? *
                        </Label>
                        <Input
                          id="partTimeStaff"
                          type="number"
                          placeholder="3"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("partTimeStaff", { required: "Number of part-time staff is required" })}
                        />
                        {errors.partTimeStaff && (
                          <p className="text-red-500 text-xs mt-1">{errors.partTimeStaff.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <Label htmlFor="lastYearRevenue" className="text-sm font-medium">
                          What is your last 12 month&apos;s revenue? *
                        </Label>
                        <Input
                          id="lastYearRevenue"
                          placeholder="$500,000"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("lastYearRevenue", { required: "Last 12 month's revenue is required" })}
                        />
                        {errors.lastYearRevenue && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastYearRevenue.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="payingCustomers" className="text-sm font-medium">
                          What is the number of paying customers? *
                        </Label>
                        <Input
                          id="payingCustomers"
                          type="number"
                          placeholder="20"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("payingCustomers", { required: "Number of paying customers is required" })}
                        />
                        {errors.payingCustomers && (
                          <p className="text-red-500 text-xs mt-1">{errors.payingCustomers.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="pilotPrograms" className="text-sm font-medium">
                        How many of these customers are pilot programs? *
                      </Label>
                      <Input
                        id="pilotPrograms"
                        type="number"
                        placeholder="5"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("pilotPrograms", { required: "Number of pilot programs is required" })}
                      />
                      {errors.pilotPrograms && (
                        <p className="text-red-500 text-xs mt-1">{errors.pilotPrograms.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1">
                      <Label htmlFor="crunchbaseProfile" className="text-sm font-medium">
                        Crunchbase Profile
                      </Label>
                      <Input
                        id="crunchbaseProfile"
                        placeholder="https://www.crunchbase.com/organization/your-company"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("crunchbaseProfile")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-sm font-medium">
                        Your Logo *
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="logo"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "logo")}
                        />
                        <label htmlFor="logo" className="cursor-pointer w-full text-center">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">
                            {logoFile ? logoFile.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pitchDeck" className="text-sm font-medium">
                        Pitch Deck *
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="pitchDeck"
                          className="hidden"
                          accept=".pdf,.ppt,.pptx"
                          onChange={(e) => handleFileChange(e, "deck")}
                        />
                        <label htmlFor="pitchDeck" className="cursor-pointer w-full text-center">
                          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">
                            {deckFile ? deckFile.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF or PowerPoint (max. 10MB)</p>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="deckLink" className="text-sm font-medium">
                        Link to deck if you don&apos;t have a PDF.
                      </Label>
                      <Input
                        id="deckLink"
                        placeholder="https://drive.google.com/file/d/..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("deckLink")}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="pitchVideo" className="text-sm font-medium">
                        Link to pitch video if you have it.
                      </Label>
                      <Input
                        id="pitchVideo"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...register("pitchVideo")}
                      />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="mt-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-lg">
                <div className="w-full sm:w-auto order-2 sm:order-1">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-6 py-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700 font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Previous
                    </Button>
                  )}
                </div>

                <div className="w-full sm:w-auto order-3">
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 rounded-md shadow-sm hover:shadow flex items-center justify-center gap-2"
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium transition-all duration-200 rounded-md shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
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
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}