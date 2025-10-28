"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Home } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { SaveExitButton } from "@/components/questionnaire/save-exit-button"

export default function AdvancedQuestionnaire() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planType = searchParams.get("plan") || "essential"

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 8

  const [draftId, setDraftId] = useState<string | null>(null)

  const [weightUnit, setWeightUnit] = useState<"kg" | "stones">("kg")
  const [heightUnit, setHeightUnit] = useState<"cm" | "feet">("cm")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",

    // Physical Metrics with multiple units
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    weightKg: "",
    weightStones: "",
    weightPounds: "",
    targetWeightKg: "",
    targetWeightStones: "",
    targetWeightPounds: "",
    bodyType: "",

    primaryGoal: "",
    secondaryGoals: [] as string[],
    fitnessLevel: "",
    exerciseHistory: "",

    medicalConditions: [] as string[],
    medications: "",
    allergies: [] as string[],
    otherAllergies: "",

    // Dietary Framework - multiple selections allowed
    dietaryFramework: [] as string[],

    // Fine-tuning preferences
    dietaryPreferences: [] as string[],
    mealPreferences: [] as string[],
    cuisinePreferences: [] as string[],
    mealsPerDay: "",

    // Budget and cooking time
    weeklyBudget: "",
    dailyCookingTime: "",

    activityLevel: "",
    sleepHours: "",
    stressLevel: "",
    waterIntake: "",

    equipment: [] as string[],
    workoutLocation: "",
    timeAvailable: "",

    cookingSkill: "",
    additionalNotes: "",
    planType: planType,
  })

  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = async () => {
    if (currentStep === 1) {
      // First step - navigate back to tier selection with preserved state
      const tier = localStorage.getItem("questionnaire_tier") || "standard"
      const glp1 = localStorage.getItem("questionnaire_glp1") === "true"

      // Trigger autosave before navigating
      try {
        const draftId = localStorage.getItem("current_draft_id")
        if (draftId) {
          await fetch(`/api/drafts/${draftId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers_json: formData,
              progress_pct: progress,
              last_step: "advanced-step-1",
            }),
          })
        }
      } catch (error) {
        console.error("[v0] Error autosaving before navigation:", error)
      }

      // Navigate to start page with preserved state
      const params = new URLSearchParams({
        plan: planType,
        tier: tier,
        glp1: glp1.toString(),
      })
      router.push(`/questionnaire/start?${params.toString()}`)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const queryParams = new URLSearchParams({
      plan: planType,
      data: JSON.stringify(formData),
    }).toString()
    window.location.href = `/payment?${queryParams}`
  }

  const saveDraft = async () => {
    if (!draftId) return

    try {
      await fetch(`/api/drafts/${draftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers_json: formData,
          progress_pct: progress,
          last_step: `advanced-step-${currentStep}`,
        }),
      })
    } catch (error) {
      console.error("[v0] Error saving draft:", error)
    }
  }

  const dietaryFrameworkOptions = [
    { id: "balanced", name: "Balanced", description: "No specific restrictions" },
    { id: "low-carb", name: "Low-Carb", description: "Reduced carbohydrate intake" },
    { id: "keto", name: "Keto", description: "Very low-carb, high-fat" },
    { id: "mediterranean", name: "Mediterranean", description: "Heart-healthy, olive oil based" },
    { id: "vegetarian", name: "Vegetarian", description: "Plant-based with options" },
    { id: "vegan", name: "Vegan", description: "Completely plant-based" },
    { id: "pescatarian", name: "Pescatarian", description: "Vegetarian + fish" },
    { id: "paleo", name: "Paleo", description: "Whole foods, no grains" },
    { id: "high-protein", name: "High-Protein", description: "Increased protein intake" },
    { id: "anti-inflammatory", name: "Anti-Inflammatory", description: "Reduces inflammation" },
    { id: "dash", name: "DASH", description: "Heart-healthy, low sodium" },
    { id: "low-gi", name: "Low-GI", description: "Stable blood sugar" },
    { id: "no-added-sugar", name: "No Added Sugar", description: "Natural sugars only" },
    { id: "halal", name: "Halal", description: "Islamic dietary laws" },
    { id: "kosher", name: "Kosher", description: "Jewish dietary laws" },
    { id: "gluten-free", name: "Gluten-Free", description: "No gluten-containing foods" },
    { id: "low-fodmap", name: "Low-FODMAP", description: "Digestive health focused" },
    { id: "dairy-free", name: "Dairy-Free", description: "No dairy products" },
    { id: "intermittent-fasting", name: "Intermittent Fasting", description: "Time-restricted eating" },
    { id: "athletic-performance", name: "Athletic Performance", description: "Optimized for training" },
    { id: "calorie-controlled", name: "Calorie-Controlled", description: "Auto from goal" },
    { id: "low-fat", name: "Low-Fat", description: "Reduced fat intake" },
    { id: "plant-forward", name: "Plant-Forward / Flexitarian", description: "Mostly plants, some meat" },
    { id: "zone", name: "Zone (40/30/30)", description: "Balanced macro ratios" },
    { id: "whole30", name: "Whole30 (30 days)", description: "Elimination reset" },
  ]

  const allergyOptions = [
    "Peanuts",
    "Tree nuts (almonds, cashews, walnuts)",
    "Shellfish (shrimp, crab, lobster)",
    "Fish (salmon, tuna, cod)",
    "Eggs",
    "Dairy / Milk",
    "Soy",
    "Wheat / Gluten",
    "Sesame",
    "Mustard",
    "Celery",
    "Lupin",
    "Sulphites",
    "Molluscs",
    "Corn",
    "Nightshades (tomatoes, peppers, eggplant)",
    "Citrus fruits",
    "Strawberries",
    "Kiwi",
    "Avocado",
    "Banana",
    "Latex cross-reactive foods",
    "Histamine intolerance",
    "Lactose intolerant",
    "Fructose intolerance",
    "None",
  ]

  const finetuningOptions = [
    { id: "soy-free", name: "Soy-Free", description: "No soy products" },
    { id: "nut-free", name: "Nut-Free", description: "No nuts or tree nuts" },
    { id: "egg-free", name: "Egg-Free", description: "No eggs or egg products" },
    { id: "shellfish-free", name: "Shellfish-Free", description: "No shellfish or crustaceans" },
    { id: "budget-friendly", name: "Budget-Friendly", description: "Cost-effective meals" },
    { id: "quick-prep", name: "Quick-Prep / Minimal Cooking", description: "Fast and easy meals" },
    { id: "meal-prep-batch", name: "Meal-Prep Batch", description: "Batch cooking focused" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Home Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <Home className="w-4 h-4 mr-2" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-4">
          <Link
            href={`/questionnaire/start?plan=${planType}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            <ArrowLeft className="w-3 h-3 mr-1" />
            Change questionnaire type
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateFormData("age", e.target.value)}
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <Label>Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
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
            </div>
          )}

          {/* Step 2: Physical Metrics with Stone/Pounds option */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your physical metrics</h2>
                <p className="text-gray-600">This helps us personalize your plan accurately</p>
              </div>

              <div className="space-y-4">
                {/* Height */}
                <div>
                  <Label>Height Unit</Label>
                  <div className="flex gap-4 mb-3">
                    <Button
                      type="button"
                      variant={heightUnit === "cm" ? "default" : "outline"}
                      onClick={() => setHeightUnit("cm")}
                      className="flex-1"
                    >
                      Centimeters
                    </Button>
                    <Button
                      type="button"
                      variant={heightUnit === "feet" ? "default" : "outline"}
                      onClick={() => setHeightUnit("feet")}
                      className="flex-1"
                    >
                      Feet & Inches
                    </Button>
                  </div>

                  {heightUnit === "cm" ? (
                    <div>
                      <Label htmlFor="heightCm">Height (cm)</Label>
                      <Input
                        id="heightCm"
                        type="number"
                        value={formData.heightCm}
                        onChange={(e) => updateFormData("heightCm", e.target.value)}
                        placeholder="175"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="heightFeet">Feet</Label>
                        <Input
                          id="heightFeet"
                          type="number"
                          value={formData.heightFeet}
                          onChange={(e) => updateFormData("heightFeet", e.target.value)}
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heightInches">Inches</Label>
                        <Input
                          id="heightInches"
                          type="number"
                          value={formData.heightInches}
                          onChange={(e) => updateFormData("heightInches", e.target.value)}
                          placeholder="9"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <Label>Weight Unit</Label>
                  <div className="flex gap-4 mb-3">
                    <Button
                      type="button"
                      variant={weightUnit === "kg" ? "default" : "outline"}
                      onClick={() => setWeightUnit("kg")}
                      className="flex-1"
                    >
                      Kilograms
                    </Button>
                    <Button
                      type="button"
                      variant={weightUnit === "stones" ? "default" : "outline"}
                      onClick={() => setWeightUnit("stones")}
                      className="flex-1"
                    >
                      Stones & Pounds
                    </Button>
                  </div>

                  {weightUnit === "kg" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weightKg">Current Weight (kg)</Label>
                        <Input
                          id="weightKg"
                          type="number"
                          value={formData.weightKg}
                          onChange={(e) => updateFormData("weightKg", e.target.value)}
                          placeholder="75"
                        />
                      </div>
                      <div>
                        <Label htmlFor="targetWeightKg">Target Weight (kg)</Label>
                        <Input
                          id="targetWeightKg"
                          type="number"
                          value={formData.targetWeightKg}
                          onChange={(e) => updateFormData("targetWeightKg", e.target.value)}
                          placeholder="70"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label>Current Weight</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="weightStones">Stones</Label>
                            <Input
                              id="weightStones"
                              type="number"
                              value={formData.weightStones}
                              onChange={(e) => updateFormData("weightStones", e.target.value)}
                              placeholder="11"
                            />
                          </div>
                          <div>
                            <Label htmlFor="weightPounds">Pounds</Label>
                            <Input
                              id="weightPounds"
                              type="number"
                              value={formData.weightPounds}
                              onChange={(e) => updateFormData("weightPounds", e.target.value)}
                              placeholder="8"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Target Weight</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="targetWeightStones">Stones</Label>
                            <Input
                              id="targetWeightStones"
                              type="number"
                              value={formData.targetWeightStones}
                              onChange={(e) => updateFormData("targetWeightStones", e.target.value)}
                              placeholder="10"
                            />
                          </div>
                          <div>
                            <Label htmlFor="targetWeightPounds">Pounds</Label>
                            <Input
                              id="targetWeightPounds"
                              type="number"
                              value={formData.targetWeightPounds}
                              onChange={(e) => updateFormData("targetWeightPounds", e.target.value)}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Body Type</Label>
                  <RadioGroup value={formData.bodyType} onValueChange={(value) => updateFormData("bodyType", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ectomorph" id="ectomorph" />
                      <Label htmlFor="ectomorph" className="font-normal">
                        Ectomorph (Naturally thin, fast metabolism)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mesomorph" id="mesomorph" />
                      <Label htmlFor="mesomorph" className="font-normal">
                        Mesomorph (Athletic build, gains muscle easily)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="endomorph" id="endomorph" />
                      <Label htmlFor="endomorph" className="font-normal">
                        Endomorph (Larger build, gains weight easily)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals & Experience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your fitness goals</h2>
                <p className="text-gray-600">What do you want to achieve?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Primary Goal</Label>
                  <RadioGroup
                    value={formData.primaryGoal}
                    onValueChange={(value) => updateFormData("primaryGoal", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weight-loss" id="weight-loss" />
                      <Label htmlFor="weight-loss" className="font-normal">
                        Weight Loss
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                      <Label htmlFor="muscle-gain" className="font-normal">
                        Muscle Gain
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maintenance" id="maintenance" />
                      <Label htmlFor="maintenance" className="font-normal">
                        Maintenance & Health
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="athletic" id="athletic" />
                      <Label htmlFor="athletic" className="font-normal">
                        Athletic Performance
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Secondary Goals (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {["Increase energy", "Better sleep", "Improve flexibility", "Build endurance", "Reduce stress"].map(
                      (goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={formData.secondaryGoals.includes(goal)}
                            onCheckedChange={() => toggleArrayItem("secondaryGoals", goal)}
                          />
                          <Label htmlFor={goal} className="font-normal">
                            {goal}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <Label>Fitness Experience Level</Label>
                  <Select
                    value={formData.fitnessLevel}
                    onValueChange={(value) => updateFormData("fitnessLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-6 months)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (6 months - 2 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (2+ years)</SelectItem>
                      <SelectItem value="athlete">Competitive Athlete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical & Allergies - EXTENSIVE LIST */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Health & medical information</h2>
                <p className="text-gray-600">This ensures your safety and plan effectiveness</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Medical Conditions (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      "Diabetes",
                      "High blood pressure",
                      "Heart condition",
                      "Thyroid issues",
                      "PCOS",
                      "Arthritis",
                      "None",
                    ].map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.medicalConditions.includes(condition)}
                          onCheckedChange={() => toggleArrayItem("medicalConditions", condition)}
                        />
                        <Label htmlFor={condition} className="font-normal">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="medications">Current Medications (Optional)</Label>
                  <Textarea
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => updateFormData("medications", e.target.value)}
                    placeholder="List any medications you're currently taking"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Food Allergies & Intolerances (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                    {allergyOptions.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={formData.allergies.includes(allergy)}
                          onCheckedChange={() => toggleArrayItem("allergies", allergy)}
                        />
                        <Label htmlFor={allergy} className="font-normal text-sm">
                          {allergy}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="otherAllergies">Other Allergies or Sensitivities</Label>
                  <Input
                    id="otherAllergies"
                    value={formData.otherAllergies}
                    onChange={(e) => updateFormData("otherAllergies", e.target.value)}
                    placeholder="e.g., MSG, artificial sweeteners, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Diet Framework - EXTENSIVE with Multiple Selection */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Diet Framework & Fine-Tuning</h2>
                <p className="text-gray-600">Choose your diet style and preferences</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold">Diet Framework & Preferences</Label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2 mb-4">
                    <p className="text-sm text-blue-700">
                      💡 <strong>You can select multiple options!</strong> For example: "High-Protein + Low-Carb + No
                      Added Sugar" or "Mediterranean + Budget-Friendly + Quick-Prep". Our AI will create the perfect
                      plan combining all your preferences.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 border rounded-lg">
                    {dietaryFrameworkOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleArrayItem("dietaryFramework", option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.dietaryFramework.includes(option.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Additional Fine-Tuning</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {finetuningOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleArrayItem("dietaryPreferences", option.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.dietaryPreferences.includes(option.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{option.name}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget and Cooking Time Questions */}
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label htmlFor="dailyCookingTime" className="text-base font-semibold">
                      How much time do you want to spend cooking per day?
                    </Label>
                    <p className="text-sm text-gray-600 mb-2">
                      This helps us tailor your plan to your daily routine and how much time you like to spend in the
                      kitchen.
                    </p>
                    <Select
                      value={formData.dailyCookingTime}
                      onValueChange={(value) => updateFormData("dailyCookingTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cooking time preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-15">Under 15 minutes - Quick & Simple</SelectItem>
                        <SelectItem value="15-30">15-30 minutes - Fast meals</SelectItem>
                        <SelectItem value="30-45">30-45 minutes - Moderate cooking</SelectItem>
                        <SelectItem value="45-60">45-60 minutes - Enjoy cooking</SelectItem>
                        <SelectItem value="batch-prep">I'm happy to batch cook or meal prep for the week</SelectItem>
                        <SelectItem value="no-preference">No preference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="weeklyBudget" className="text-base font-semibold">
                      What's your budget? Be honest, are you a saver or a spender?
                    </Label>
                    <p className="text-sm text-gray-600 mb-2">
                      This helps us match your meal plan to your preferred grocery spend and ingredient style.
                    </p>
                    <Select
                      value={formData.weeklyBudget}
                      onValueChange={(value) => updateFormData("weeklyBudget", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget-friendly">
                          I like to keep things budget-friendly - Smart shopping
                        </SelectItem>
                        <SelectItem value="moderate">Moderate - Balance of cost and quality</SelectItem>
                        <SelectItem value="flexible">Flexible - Quality matters more than cost</SelectItem>
                        <SelectItem value="premium">Premium - I want the best ingredients</SelectItem>
                        <SelectItem value="no-preference">No specific budget constraints</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Lifestyle */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your lifestyle</h2>
                <p className="text-gray-600">Understanding your daily routine helps us create a realistic plan</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Daily Activity Level</Label>
                  <RadioGroup
                    value={formData.activityLevel}
                    onValueChange={(value) => updateFormData("activityLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sedentary" id="sedentary" />
                      <Label htmlFor="sedentary" className="font-normal">
                        Sedentary (Desk job, little exercise)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="font-normal">
                        Lightly Active (Exercise 1-3 days/week)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="font-normal">
                        Moderately Active (Exercise 3-5 days/week)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very" id="very" />
                      <Label htmlFor="very" className="font-normal">
                        Very Active (Exercise 6-7 days/week)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="athlete" id="athlete-activity" />
                      <Label htmlFor="athlete-activity" className="font-normal">
                        Athlete (Training multiple times daily)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="sleepHours">Average Sleep Hours Per Night</Label>
                  <Select value={formData.sleepHours} onValueChange={(value) => updateFormData("sleepHours", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-5">Less than 5 hours</SelectItem>
                      <SelectItem value="5-6">5-6 hours</SelectItem>
                      <SelectItem value="6-7">6-7 hours</SelectItem>
                      <SelectItem value="7-8">7-8 hours</SelectItem>
                      <SelectItem value="8-plus">8+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Stress Level</Label>
                  <RadioGroup
                    value={formData.stressLevel}
                    onValueChange={(value) => updateFormData("stressLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low-stress" />
                      <Label htmlFor="low-stress" className="font-normal">
                        Low
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate-stress" />
                      <Label htmlFor="moderate-stress" className="font-normal">
                        Moderate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high-stress" />
                      <Label htmlFor="high-stress" className="font-normal">
                        High
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="waterIntake">Daily Water Intake</Label>
                  <Select value={formData.waterIntake} onValueChange={(value) => updateFormData("waterIntake", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water intake" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1">Less than 1 liter</SelectItem>
                      <SelectItem value="1-2">1-2 liters</SelectItem>
                      <SelectItem value="2-3">2-3 liters</SelectItem>
                      <SelectItem value="3-plus">3+ liters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Equipment & Location */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Workout setup</h2>
                <p className="text-gray-600">Tell us about your workout environment</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Available Equipment (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {[
                      "No equipment (bodyweight)",
                      "Dumbbells",
                      "Resistance bands",
                      "Kettlebells",
                      "Barbell",
                      "Pull-up bar",
                      "Full gym access",
                      "Cardio equipment",
                    ].map((equip) => (
                      <div key={equip} className="flex items-center space-x-2">
                        <Checkbox
                          id={equip}
                          checked={formData.equipment.includes(equip)}
                          onCheckedChange={() => toggleArrayItem("equipment", equip)}
                        />
                        <Label htmlFor={equip} className="font-normal">
                          {equip}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Preferred Workout Location</Label>
                  <RadioGroup
                    value={formData.workoutLocation}
                    onValueChange={(value) => updateFormData("workoutLocation", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="font-normal">
                        Home
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gym" id="gym" />
                      <Label htmlFor="gym" className="font-normal">
                        Gym
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outdoor" id="outdoor" />
                      <Label htmlFor="outdoor" className="font-normal">
                        Outdoor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mix" id="mix" />
                      <Label htmlFor="mix" className="font-normal">
                        Mix of locations
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Time Available Per Workout</Label>
                  <Select
                    value={formData.timeAvailable}
                    onValueChange={(value) => updateFormData("timeAvailable", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select workout duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-30">15-30 minutes</SelectItem>
                      <SelectItem value="30-45">30-45 minutes</SelectItem>
                      <SelectItem value="45-60">45-60 minutes</SelectItem>
                      <SelectItem value="60-plus">60+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Final Details */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Final details</h2>
                <p className="text-gray-600">Just a few more things to perfect your plan</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Cooking Skill Level</Label>
                  <RadioGroup
                    value={formData.cookingSkill}
                    onValueChange={(value) => updateFormData("cookingSkill", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id="beginner-cook" />
                      <Label htmlFor="beginner-cook" className="font-normal">
                        Beginner (Simple recipes only)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate-cook" />
                      <Label htmlFor="intermediate-cook" className="font-normal">
                        Intermediate (Comfortable with most recipes)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced-cook" />
                      <Label htmlFor="advanced-cook" className="font-normal">
                        Advanced (Love complex recipes)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="additionalNotes">Additional Notes or Special Requests</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                    placeholder="Any other information that would help us create the perfect plan for you..."
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">You're all set!</h4>
                      <p className="text-sm text-blue-700">
                        Click "Continue to Payment" to finalize your order and receive your personalized{" "}
                        {planType === "single"
                          ? "plan"
                          : planType === "essential"
                            ? "Essential subscription"
                            : "Coaching subscription"}
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={handlePrevious} className="flex items-center bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="bg-orange-500 hover:bg-orange-600 text-white flex items-center">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center font-semibold"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <SaveExitButton
              draftId={draftId}
              onSave={saveDraft}
              planType={planType}
              tier={(localStorage.getItem("questionnaire_tier") as "standard" | "advanced") || "advanced"}
              variant="outline-orange"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
