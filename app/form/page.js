"use client"

import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import Input from "@/components/ui/input";

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


const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
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

const Select = ({ children, onValueChange, defaultValue, value, ...props }) => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")

  const handleSelect = (value) => {
    setSelectedValue(value)
    setOpen(false)
    if (onValueChange) onValueChange(value)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      >
        <span className={selectedValue ? "" : "text-muted-foreground"}>
          {selectedValue
            ? React.Children.toArray(children).find((child) => child.props.value === selectedValue)?.props.children ||
              "Select an option"
            : "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onSelect: () => handleSelect(child.props.value),
              }),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const SelectItem = ({ children, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12l5 5 9-9" />
        </svg>
      </span>
      <span>{children}</span>
    </div>
  )
}

const Card = ({ className, ...props }) => {
  return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
}

const CardHeader = ({ className, ...props }) => {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

const CardTitle = ({ className, ...props }) => {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

const CardDescription = ({ className, ...props }) => {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

const CardContent = ({ className, ...props }) => {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

const CardFooter = ({ className, ...props }) => {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

const Popover = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          open,
          setOpen,
        }),
      )}
    </div>
  )
}

const PopoverTrigger = ({ children, open, setOpen }) => {
  return React.cloneElement(children, {
    onClick: () => setOpen(!open),
  })
}

const PopoverContent = ({ children, className, open }) => {
  if (!open) return null

  return (
    <div className={cn("absolute z-50 w-72 rounded-md border bg-popover p-4 shadow-md outline-none", className)}>
      {children}
    </div>
  )
}

const Calendar = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date());

  // Get days in a specific month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
  // Get the first day of the month (for correct positioning in the calendar)
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Get the current year and month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Array to hold all the days for the current month
  const days = [];
  const daysCount = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  // Fill the array with empty slots for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Push the days for the current month
  for (let i = 1; i <= daysCount; i++) {
    days.push(new Date(year, month, i));
  }

  // Handle going to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  // Handle going to the next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Handle changing the year
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    if (newYear && !isNaN(newYear)) {
      setCurrentMonth(new Date(newYear, month, 1));
    }
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!selected || !date) return false;
    return date.toDateString() === selected.toDateString();
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        {/* Previous Month Button */}
        <button onClick={handlePrevMonth} className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Month and Year Display */}
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevMonth} className="text-lg">
            <span className="mr-2">{currentMonth.toLocaleString("default", { month: "long" })}</span>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              className="w-16 text-center border-b focus:outline-none"
            />
          </button>
        </div>

        {/* Next Month Button */}
        <button onClick={handleNextMonth} className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
          <div key={i} className="p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((date, i) => (
          <div key={i} className="p-0">
            {date ? (
              <button
                onClick={() => onSelect(date)}
                className={cn(
                  "h-8 w-8 rounded-md p-0 text-center text-sm",
                  isSelected(date) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="h-8 w-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RadioGroup = ({ children, onValueChange, className }) => {
  const [value, setValue] = useState("")

  const handleChange = (newValue) => {
    setValue(newValue)
    if (onValueChange) onValueChange(newValue)
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: value === child.props.value,
          onChange: () => handleChange(child.props.value),
        }),
      )}
    </div>
  )
}

const RadioGroupItem = ({ children, checked, onChange, id }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
      />
      {children}
    </div>
  )
}

// Main Form Component
export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
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
  const [isOpen, setIsOpen] = useState(false); // State to control popover visibility

  
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Company Details" },
    { number: 3, label: "Financials" },
    { number: 4, label: "Documents" }
  ];

  const onSubmit = async (data) => {
    // Simulate form submission
    console.log("Form data:", data)

    // Add a small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success message
    setIsSubmitted(true)
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

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo(0, 0)
  }

  // Add CSS styles directly in the component
  const styles = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --primary: 221.2 83.2% 53.3%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96.1%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96.1%;
      --accent-foreground: 222.2 47.4% 11.2%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: 221.2 83.2% 53.3%;
      --radius: 0.5rem;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.3s ease-out forwards;
    }
  `

  if (isSubmitted) {
    return (
      <>
        <style jsx global>
          {styles}
        </style>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
          <Card className="w-full max-w-3xl shadow-lg border-0 overflow-hidden bg-white transition-all duration-500 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
              <CardTitle className="text-3xl font-bold">Submission Received</CardTitle>
              <CardDescription className="text-blue-100 text-lg mt-2">
                Thank you for your application to Ecliptic Capital
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
                  We&apos;ve received your submission and will review it shortly. We review applications monthly and will be
                  in touch if there&apos;s a potential fit.
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
      <style jsx global>
        {styles}
      </style>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg overflow-hidden bg-white transition-all duration-500">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-6 md:p-8">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Submissions Form
              </CardTitle>
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 relative z-10 transition-all duration-300 ${
                        currentStep > step.number 
                          ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                          : currentStep === step.number
                          ? "bg-white text-blue-600 border-2 border-blue-500 shadow-md"
                          : "bg-white text-gray-400 border-2 border-gray-200"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </button>
                    
                    
                    {/* Step Label */}
                    <span className={`text-xs font-medium mt-1 text-center transition-colors duration-300 ${
                      currentStep >= step.number ? "text-blue-600" : "text-gray-500"
                    } hidden sm:block`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Mobile Labels (only shown on very small screens) */}
              <div className="sm:hidden text-center mt-4">
                <span className="text-sm font-medium text-blue-600">
                  {steps.find(step => step.number === currentStep)?.label}
                </span>
              </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-6 md:p-8 space-y-8 overflow-auto">
                

                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">

                    <div className="text-sm text-gray-500 italic border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 rounded-r-md">
                      This form will take roughly 10 minutes to complete. We review applications monthly. We will not share
                      your personal information without permission, except when required by law.
                    </div>
                    {/* <div className="w-full max-w-md mx-auto">
                      <div className="space-y-2">
                        <Label 
                          htmlFor="submissionDate" 
                          className="text-sm font-medium tracking-wide text-gray-700 flex items-center"
                        >
                          Submission Date *
                        </Label>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className={cn(
                                "w-full px-4 py-2.5 flex items-center justify-between rounded-md border bg-white transition-all duration-200",
                                "hover:border-blue-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500",
                                !submissionDate && "text-gray-500"
                              )}
                            >
                              <div className="flex items-center">
                                <svg 
                                  className={cn(
                                    "mr-2 h-5 w-5 transition-colors", 
                                    submissionDate ? "text-blue-600" : "text-gray-400"
                                  )} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                >
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span className={cn(
                                  "font-medium", 
                                  submissionDate ? "text-gray-800" : "text-gray-500"
                                )}>
                                  {submissionDate ? format(submissionDate, "dd MMMM, yyyy") : "Select date"}
                                </span>
                              </div>
                              <svg 
                                className="h-5 w-5 text-gray-400" 
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
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 border border-gray-200 rounded-md shadow-lg">
                            <div className="p-1 bg-white rounded-md">
                              <Calendar
                                mode="single"
                                selected={submissionDate}
                                onSelect={(date) => {
                                  setSubmissionDate(date);
                                  setValue("submissionDate", date);
                                }}
                                initialFocus
                                className="rounded-md border-0"
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        
                        <p className="text-xs text-gray-500 italic mt-1">
                          Please select the submission deadline date
                        </p>
                      </div>
                    </div> */}

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
                          {...register("email", { required: "Email is required" })}
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
                        {...register("companyWebsite", { required: "Company website is required" })}
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
                          {...register("otherReferralSource")}
                        />
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
                      <Textarea
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
                      <Textarea
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
                      <Textarea
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
                          {...register("otherBusinessModel")}
                        />
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
                                
                                {/* Calendar Popover */}
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
                                                <CalendarIcon className={`mr-2 h-5 w-5 ${inceptionDate ? "text-blue-600" : "text-gray-400"}`} />
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

                                    {/* Popover Content with Calendar */}
                                    <PopoverContent className="p-0 border border-gray-200 rounded-lg shadow-lg w-auto">
                                        <Calendar
                                            mode="single"
                                            selected={inceptionDate}
                                            onSelect={(date) => {
                                                setInceptionDate(date);
                                                setIsOpen(false); // ✅ Close the calendar after selection
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
                          <Label htmlFor="referralSource" className="text-sm font-medium">
                            What stage is your business? *
                          </Label>
                          <Select onValueChange={(value) => setValue("referralSource", value)} defaultValue="">
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
                          {...register("otherSector")}
                        />
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
                          {...register("otherFinancialInstrument")}
                        />
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

