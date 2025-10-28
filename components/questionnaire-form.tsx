"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Clock, Target, Utensils, Dumbbell } from "lucide-react"

const questionnaireSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.number().min(16).max(100),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),

  // Physical Stats
  height: z.number().min(120).max(250),
  weight: z.number().min(30).max(300),
  activityLevel: z.enum(["sedentary", "lightly-active", "moderately-active", "very-active", "extremely-active"]),

  // Goals
  primaryGoal: z.enum(["lose-weight", "build-muscle", "maintain-weight", "improve-health"]),
  targetWeight: z.number().optional(),
  timeframe: z.enum(["1-month", "3-months", "6-months", "1-year", "no-rush"]),

  // Dietary Preferences
  dietaryRestrictions: z.array(z.string()),
  allergies: z.array(z.string()),
  cuisinePreferences: z.array(z.string()),
  cookingTime: z.enum(["under-15", "15-30", "30-60", "over-60", "no-preference"]),

  // Fitness Preferences
  workoutLocation: z.enum(["home", "gym", "both"]),
  equipment: z.array(z.string()),
  workoutDuration: z.enum(["under-30", "30-45", "45-60", "over-60"]),
  fitnessExperience: z.enum(["beginner", "intermediate", "advanced"]),

  // Plan Selection
  planType: z.enum(["essential", "coaching"]),
})

type QuestionnaireData = z.infer<typeof questionnaireSchema>

const steps = [
  { id: 1, title: "Personal Info", description: "Tell us about yourself", icon: Target },
  { id: 2, title: "Physical Stats", description: "Your current measurements", icon: Target },
  { id: 3, title: "Goals", description: "What do you want to achieve?", icon: Target },
  { id: 4, title: "Diet Preferences", description: "Your food preferences", icon: Utensils },
  { id: 5, title: "Fitness Preferences", description: "How you like to work out", icon: Dumbbell },
  { id: 6, title: "Choose Your Plan", description: "Select your subscription", icon: Clock },
]

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Paleo",
  "Mediterranean",
  "Low-carb",
  "Gluten-free",
  "Dairy-free",
  "No restrictions",
]

const allergyOptions = ["Nuts", "Shellfish", "Eggs", "Dairy", "Gluten", "Soy", "Fish", "None"]

const cuisineOptions = [
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
  "Indian",
  "American",
  "British",
  "French",
  "Thai",
  "No preference",
]

const equipmentOptions = [
  "Dumbbells",
  "Resistance bands",
  "Yoga mat",
  "Pull-up bar",
  "Kettlebell",
  "Barbell",
  "Bench",
  "No equipment",
]

export function QuestionnaireForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      dietaryRestrictions: [],
      allergies: [],
      cuisinePreferences: [],
      equipment: [],
    },
  })

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: QuestionnaireData) => {
    setIsSubmitting(true)
    try {
      // API call to submit questionnaire data
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Redirect to payment or dashboard
        window.location.href = "/payment"
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...form.register("firstName")} placeholder="Enter your first name" />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...form.register("email")} placeholder="your@email.com" />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...form.register("age", { valueAsNumber: true })} placeholder="25" />
              </div>

              <div>
                <Label>Gender</Label>
                <Select onValueChange={(value) => form.setValue("gender", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  {...form.register("height", { valueAsNumber: true })}
                  placeholder="170"
                />
              </div>

              <div>
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  {...form.register("weight", { valueAsNumber: true })}
                  placeholder="70"
                />
              </div>
            </div>

            <div>
              <Label>Activity Level</Label>
              <RadioGroup onValueChange={(value) => form.setValue("activityLevel", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary" id="sedentary" />
                  <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lightly-active" id="lightly-active" />
                  <Label htmlFor="lightly-active">Lightly Active (1-3 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderately-active" id="moderately-active" />
                  <Label htmlFor="moderately-active">Moderately Active (3-5 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-active" id="very-active" />
                  <Label htmlFor="very-active">Very Active (6-7 days/week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="extremely-active" id="extremely-active" />
                  <Label htmlFor="extremely-active">Extremely Active (2x/day or intense training)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Primary Goal</Label>
              <RadioGroup onValueChange={(value) => form.setValue("primaryGoal", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lose-weight" id="lose-weight" />
                  <Label htmlFor="lose-weight">Lose Weight</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="build-muscle" id="build-muscle" />
                  <Label htmlFor="build-muscle">Build Muscle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain-weight" id="maintain-weight" />
                  <Label htmlFor="maintain-weight">Maintain Weight</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improve-health" id="improve-health" />
                  <Label htmlFor="improve-health">Improve Overall Health</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetWeight">Target Weight (kg) - Optional</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  {...form.register("targetWeight", { valueAsNumber: true })}
                  placeholder="65"
                />
              </div>

              <div>
                <Label>Timeframe</Label>
                <Select onValueChange={(value) => form.setValue("timeframe", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="no-rush">No Rush</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Dietary Restrictions (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("dietaryRestrictions")
                        if (checked) {
                          form.setValue("dietaryRestrictions", [...current, option])
                        } else {
                          form.setValue(
                            "dietaryRestrictions",
                            current.filter((item) => item !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Allergies (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {allergyOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${option}`}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("allergies")
                        if (checked) {
                          form.setValue("allergies", [...current, option])
                        } else {
                          form.setValue(
                            "allergies",
                            current.filter((item) => item !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`allergy-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Cooking Time Preference</Label>
              <Select onValueChange={(value) => form.setValue("cookingTime", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="How long do you like to cook?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-15">Under 15 minutes</SelectItem>
                  <SelectItem value="15-30">15-30 minutes</SelectItem>
                  <SelectItem value="30-60">30-60 minutes</SelectItem>
                  <SelectItem value="over-60">Over 60 minutes</SelectItem>
                  <SelectItem value="no-preference">No preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Workout Location</Label>
              <RadioGroup onValueChange={(value) => form.setValue("workoutLocation", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gym" id="gym" />
                  <Label htmlFor="gym">Gym</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Available Equipment (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {equipmentOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${option}`}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("equipment")
                        if (checked) {
                          form.setValue("equipment", [...current, option])
                        } else {
                          form.setValue(
                            "equipment",
                            current.filter((item) => item !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`equipment-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Workout Duration</Label>
                <Select onValueChange={(value) => form.setValue("workoutDuration", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Preferred duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-30">Under 30 minutes</SelectItem>
                    <SelectItem value="30-45">30-45 minutes</SelectItem>
                    <SelectItem value="45-60">45-60 minutes</SelectItem>
                    <SelectItem value="over-60">Over 60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fitness Experience</Label>
                <Select onValueChange={(value) => form.setValue("fitnessExperience", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#1E4E78] mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">Select the plan that best fits your needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all ${form.watch("planType") === "essential" ? "ring-2 ring-[#F4B728]" : ""}`}
                onClick={() => form.setValue("planType", "essential")}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#1E4E78]">Essential Plan</CardTitle>
                      <CardDescription>Perfect for getting started</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">£59/month</div>
                      <div className="text-2xl font-bold text-[#F4B728]">£39/month</div>
                      <div className="text-xs text-[#F4B728] font-semibold">Launch Price</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ AI-generated 7-day meal plan (refreshed monthly)</li>
                    <li>✓ 3 beginner-friendly workouts</li>
                    <li>✓ Personalised calorie and macro targets</li>
                    <li>✓ PDF downloads plus mobile view</li>
                  </ul>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${form.watch("planType") === "coaching" ? "ring-2 ring-[#F4B728]" : ""} relative`}
                onClick={() => form.setValue("planType", "coaching")}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#F4B728] text-[#1E4E78] px-3 py-1 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </span>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#1E4E78]">Coaching Plan</CardTitle>
                      <CardDescription>Full support & personalization</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">£139/month</div>
                      <div className="text-2xl font-bold text-[#F4B728]">£99/month</div>
                      <div className="text-xs text-[#F4B728] font-semibold">Launch Price</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Personalised weekly meal plans</li>
                    <li>✓ Shopping lists + macro breakdowns</li>
                    <li>✓ 4-5 progressive workouts</li>
                    <li>✓ Preference/allergy adjustments</li>
                    <li>✓ Email support (48h response)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return <div>Step content for step {currentStep}</div>
    }
  }

  const StepIcon = steps[currentStep - 1].icon

  return (
    <div className="min-h-screen bg-[#F1EBDD] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1E4E78] rounded-full flex items-center justify-center">
                <StepIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#1E4E78]">Create Your Plan</h1>
            </div>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <div>
            <h2 className="text-lg font-semibold text-[#1E4E78]">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep === steps.length ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.watch("planType")}
                    className="bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78] flex items-center font-semibold"
                  >
                    {isSubmitting ? "Creating Plan..." : "Start 7-Day Free Trial"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#1E4E78] hover:bg-[#1E4E78]/90 flex items-center"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
