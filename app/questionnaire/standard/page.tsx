"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { SaveExitButton } from "@/components/questionnaire/save-exit-button"

const updateFormData = (field, value) => {
  // Placeholder for updateFormData logic
  console.log("Updating form data:", field, value)
}

export default function StandardQuestionnaire() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planType = searchParams.get("plan") || "essential"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
    dietaryRestrictions: "",
    planType: planType,
  })

  const [draftId, setDraftId] = useState<string | null>(null)

  const saveDraft = async () => {
    if (!draftId) return

    try {
      await fetch(`/api/drafts/${draftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers_json: formData,
          progress_pct: 100,
          last_step: "standard-complete",
        }),
      })
    } catch (error) {
      console.error("[v0] Error saving draft:", error)
    }
  }

  const handlePrevious = async () => {
    // Get GLP-1 opt-in from localStorage if it exists
    const glp1OptIn = localStorage.getItem("questionnaire_glp1") === "true"

    // Build URL to return to start page with preserved state
    const params = new URLSearchParams({
      plan: planType,
      tier: "standard",
    })

    if (glp1OptIn) {
      params.set("glp1", "true")
    }

    // Navigate back to questionnaire type chooser
    router.push(`/questionnaire/start?${params.toString()}`)
  }

  const handleSubmit = async () => {
    // Redirect to payment with form data
    const queryParams = new URLSearchParams({
      plan: planType,
      data: JSON.stringify(formData),
    }).toString()
    window.location.href = `/payment?${queryParams}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="mb-4">
            <button
              onClick={handlePrevious}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded px-2 py-1"
            >
              ← Change questionnaire type
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Start Questionnaire</h1>
            <p className="text-gray-600">
              Answer these quick questions to get your personalized plan in just 2 minutes
            </p>
          </div>

          <div className="space-y-6">
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

            <div>
              <Label>Primary Goal</Label>
              <RadioGroup value={formData.goal} onValueChange={(value) => updateFormData("goal", value)}>
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
                    Maintenance & General Health
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
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies (Optional)</Label>
              <Textarea
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) => updateFormData("dietaryRestrictions", e.target.value)}
                placeholder="e.g., Vegetarian, gluten-free, nut allergy, etc."
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> For more personalized results with detailed meal plans and workout routines,
                consider using the Advanced Setup option.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex-1 py-6 text-lg font-semibold border-gray-300 hover:bg-gray-50 bg-transparent"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleSubmit}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                disabled={!formData.name || !formData.email || !formData.goal}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="flex justify-center mt-6">
              <SaveExitButton
                draftId={draftId}
                onSave={saveDraft}
                planType={planType}
                tier="standard"
                variant="outline-orange"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
