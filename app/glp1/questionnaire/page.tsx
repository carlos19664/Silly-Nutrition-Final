"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Pill, AlertCircle, Home } from "lucide-react"
import Link from "next/link"

const glp1QuestionnaireSchema = z.object({
  // Personal Info
  firstName: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),

  // Physical Stats
  height: z.number().min(120).max(250),
  currentWeight: z.number().min(30).max(300),
  startingWeight: z.number().min(30).max(300),
  targetWeight: z.number().optional(),

  // GLP-1 Medication Details
  medicationType: z.enum(["ozempic", "wegovy", "mounjaro", "zepbound", "other"]),
  dosage: z.string(),
  startDate: z.string(),
  weeksSincStarted: z.number().min(0),

  // Side Effects
  sideEffects: z.array(z.string()),
  severityLevel: z.enum(["mild", "moderate", "severe", "none"]),

  // Dietary Needs
  dietaryRestrictions: z.array(z.string()),
  allergies: z.array(z.string()),
  proteinPreference: z.enum(["high", "moderate", "low"]),

  // Goals & Concerns
  primaryGoal: z.enum(["weight-loss", "maintain-muscle", "reduce-side-effects", "overall-health"]),
  specificConcerns: z.string().optional(),

  // Plan Selection
  planType: z.enum(["single", "monthly-coaching"]),
})

type GLP1QuestionnaireData = z.infer<typeof glp1QuestionnaireSchema>

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Physical Stats" },
  { id: 3, title: "GLP-1 Medication" },
  { id: 4, title: "Side Effects" },
  { id: 5, title: "Dietary Needs" },
  { id: 6, title: "Goals" },
  { id: 7, title: "Choose Plan" },
]

export default function GLP1QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<GLP1QuestionnaireData>({
    resolver: zodResolver(glp1QuestionnaireSchema),
    defaultValues: {
      sideEffects: [],
      dietaryRestrictions: [],
      allergies: [],
    },
  })

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const onSubmit = async (data: GLP1QuestionnaireData) => {
    setIsSubmitting(true)
    try {
      // API call would go here
      console.log("GLP-1 Questionnaire submitted:", data)
      window.location.href = "/payment"
    } catch (error) {
      console.error("Error:", error)
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
              <Input id="firstName" {...form.register("firstName")} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...form.register("email")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...form.register("age", { valueAsNumber: true })} />
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
                <Input id="height" type="number" {...form.register("height", { valueAsNumber: true })} />
              </div>
              <div>
                <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                <Input id="currentWeight" type="number" {...form.register("currentWeight", { valueAsNumber: true })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startingWeight">Starting Weight (before GLP-1)</Label>
                <Input
                  id="startingWeight"
                  type="number"
                  {...form.register("startingWeight", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label htmlFor="targetWeight">Target Weight (optional)</Label>
                <Input id="targetWeight" type="number" {...form.register("targetWeight", { valueAsNumber: true })} />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Which GLP-1 medication are you taking?</Label>
              <Select onValueChange={(value) => form.setValue("medicationType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your medication" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ozempic">Ozempic (semaglutide)</SelectItem>
                  <SelectItem value="wegovy">Wegovy (semaglutide)</SelectItem>
                  <SelectItem value="mounjaro">Mounjaro (tirzepatide)</SelectItem>
                  <SelectItem value="zepbound">Zepbound (tirzepatide)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dosage">Current Dosage</Label>
              <Input id="dosage" {...form.register("dosage")} placeholder="e.g., 0.5mg weekly" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...form.register("startDate")} />
              </div>
              <div>
                <Label htmlFor="weeksSinceStarted">Weeks Since Started</Label>
                <Input
                  id="weeksSinceStarted"
                  type="number"
                  {...form.register("weeksSincStarted", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>What side effects are you experiencing? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  "Nausea",
                  "Constipation",
                  "Diarrhea",
                  "Loss of appetite",
                  "Fatigue",
                  "Dizziness",
                  "Heartburn",
                  "None",
                ].map((effect) => (
                  <div key={effect} className="flex items-center space-x-2">
                    <Checkbox
                      id={effect}
                      onCheckedChange={(checked) => {
                        const current = form.getValues("sideEffects")
                        if (checked) {
                          form.setValue("sideEffects", [...current, effect])
                        } else {
                          form.setValue(
                            "sideEffects",
                            current.filter((item) => item !== effect),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={effect}>{effect}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>How severe are your side effects?</Label>
              <RadioGroup onValueChange={(value) => form.setValue("severityLevel", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mild" id="mild" />
                  <Label htmlFor="mild">Mild (manageable)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate (sometimes disruptive)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="severe" id="severe" />
                  <Label htmlFor="severe">Severe (significantly impacting daily life)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>Dietary Restrictions</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Low-carb", "Keto", "None"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`diet-${option}`}
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
                    <Label htmlFor={`diet-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Allergies</Label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {["Nuts", "Shellfish", "Eggs", "Dairy", "Soy", "None"].map((option) => (
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
              <Label>Protein Preference</Label>
              <RadioGroup onValueChange={(value) => form.setValue("proteinPreference", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high-protein" />
                  <Label htmlFor="high-protein">High Protein (to preserve muscle mass)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate-protein" />
                  <Label htmlFor="moderate-protein">Moderate Protein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low-protein" />
                  <Label htmlFor="low-protein">Lower Protein</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label>What is your primary goal?</Label>
              <RadioGroup onValueChange={(value) => form.setValue("primaryGoal", value as any)} className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weight-loss" id="weight-loss" />
                  <Label htmlFor="weight-loss">Maximize weight loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain-muscle" id="maintain-muscle" />
                  <Label htmlFor="maintain-muscle">Maintain muscle mass while losing weight</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reduce-side-effects" id="reduce-side-effects" />
                  <Label htmlFor="reduce-side-effects">Reduce side effects</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="overall-health" id="overall-health" />
                  <Label htmlFor="overall-health">Improve overall health</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="specificConcerns">Any specific concerns or questions? (Optional)</Label>
              <Textarea
                id="specificConcerns"
                {...form.register("specificConcerns")}
                placeholder="Tell us about any specific challenges or questions you have..."
                rows={4}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your GLP-1 Plan</h3>
              <p className="text-gray-600">Select the plan that best supports your GLP-1 journey</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all ${form.watch("planType") === "single" ? "ring-2 ring-orange-500" : ""}`}
                onClick={() => form.setValue("planType", "single")}
              >
                <CardHeader>
                  <CardTitle className="text-orange-600">Single GLP-1 Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">£49</div>
                  <p className="text-sm text-gray-600 mb-4">one-time</p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 7-day GLP-1-optimized meal plan</li>
                    <li>✓ Medication-specific guidance</li>
                    <li>✓ Side effect management</li>
                    <li>✓ PDF download</li>
                  </ul>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${form.watch("planType") === "monthly-coaching" ? "ring-2 ring-orange-500" : ""} relative`}
                onClick={() => form.setValue("planType", "monthly-coaching")}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    RECOMMENDED
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-orange-600">Monthly Coaching</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">£99</div>
                  <p className="text-sm text-gray-600 mb-4">/month</p>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Weekly GLP-1 meal plans</li>
                    <li>✓ Dosage adjustment support</li>
                    <li>✓ Ongoing side effect management</li>
                    <li>✓ Priority support</li>
                    <li>✓ Progress tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Important Reminder:</p>
                  <p>
                    This nutrition plan is designed to complement your GLP-1 medication, not replace medical guidance.
                    Always consult your healthcare provider before making significant dietary changes or if you
                    experience concerning symptoms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/glp1" className="inline-flex items-center text-orange-600 hover:text-orange-700">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to GLP-1 Plans
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">GLP-1 Questionnaire</h1>
            </div>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStep()}

              {/* Navigation */}
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
                    className="bg-orange-500 hover:bg-orange-600 flex items-center"
                  >
                    {isSubmitting ? "Processing..." : "Complete & Continue to Payment"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600 flex items-center"
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
