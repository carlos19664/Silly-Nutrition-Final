"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Edit2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mealPlanQuestions, workoutPlanQuestions, glp1Questions } from "@/lib/questionnaire-data"
import { SaveExitButton } from "@/components/questionnaire/save-exit-button"
import { useDraftAutosave } from "@/hooks/use-draft-autosave"
import { LeaveConfirmModal } from "@/components/questionnaire/leave-confirm-modal"

export default function QuestionnaireSummaryPage() {
  const router = useRouter()
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [planType, setPlanType] = useState<string>("")
  const [tier, setTier] = useState<string>("")
  const [includeGLP1, setIncludeGLP1] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draftId, setDraftId] = useState<string | null>(null)
  const [showLeaveModal, setShowLeaveModal] = useState(false)

  useEffect(() => {
    const savedResponses = localStorage.getItem("questionnaire_responses")
    const savedPlanType = localStorage.getItem("questionnaire_plan_type")
    const savedTier = localStorage.getItem("questionnaire_tier")
    const savedGLP1 = localStorage.getItem("questionnaire_glp1") === "true"
    const savedDraftId = localStorage.getItem("current_draft_id")

    if (savedResponses) setResponses(JSON.parse(savedResponses))
    if (savedPlanType) setPlanType(savedPlanType)
    if (savedTier) setTier(savedTier)
    setIncludeGLP1(savedGLP1)
    if (savedDraftId) setDraftId(savedDraftId)
  }, [])

  const { saveDraft } = useDraftAutosave({
    draftId,
    answers: responses,
    progress: 100,
    lastStep: "summary",
    enabled: !!draftId,
  })

  const allQuestions = [...mealPlanQuestions, ...workoutPlanQuestions, ...glp1Questions]

  const getQuestionLabel = (questionId: string) => {
    const question = allQuestions.find((q) => q.id === questionId)
    return question?.question || questionId
  }

  const getAnswerLabel = (questionId: string, answer: string | string[] | any) => {
    const question = allQuestions.find((q) => q.id === questionId)
    if (!question) return String(answer)

    if (questionId === "meal_dislikes" && typeof answer === "object" && answer !== null) {
      const avoidance = answer as any
      if (!avoidance.has_avoidances) {
        return "No foods to avoid"
      }
      return avoidance.notes || "No specific foods listed"
    }

    if (questionId === "meal_body_stats" && typeof answer === "object" && answer !== null) {
      const vitals = answer as any
      const parts: string[] = []

      if (vitals.age_years) {
        parts.push(`Age: ${vitals.age_years} years`)
      }

      if (vitals.height) {
        if (vitals.unit_prefs?.height === "ft") {
          parts.push(`Height: ${vitals.height.ft}'${vitals.height.in}"`)
        } else {
          parts.push(`Height: ${vitals.height.cm} cm`)
        }
      }

      if (vitals.weight_current) {
        if (vitals.unit_prefs?.weight === "st") {
          parts.push(`Current Weight: ${vitals.weight_current.st} st ${vitals.weight_current.lb} lb`)
        } else {
          parts.push(`Current Weight: ${vitals.weight_current.kg} kg`)
        }
      }

      if (vitals.weight_target) {
        if (vitals.unit_prefs?.weight === "st") {
          parts.push(`Target Weight: ${vitals.weight_target.st} st ${vitals.weight_target.lb} lb`)
        } else {
          parts.push(`Target Weight: ${vitals.weight_target.kg} kg`)
        }
      }

      return parts.join(" • ")
    }

    if (Array.isArray(answer)) {
      return answer
        .map((val) => {
          const option = question.options?.find((opt) => opt.value === val)
          return option?.label || val
        })
        .join(", ")
    }

    const option = question.options?.find((opt) => opt.value === answer)
    return option?.label || answer
  }

  const calculatePrice = () => {
    if (planType === "meal") return tier === "standard" ? 39 : 49
    if (planType === "workout") return tier === "standard" ? 29 : 39
    if (planType === "both") return tier === "standard" ? 59 : 79
    return 0
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Save to database
      const response = await fetch("/api/questionnaire/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          tier,
          includeGLP1,
          responses,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      const data = await response.json()

      // Generate plan
      await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseId: data.id,
          planType,
          tier,
          responses,
        }),
      })

      // Redirect to checkout or confirmation
      router.push("/questionnaire/confirmation")
    } catch (error) {
      console.error("[v0] Error submitting questionnaire:", error)
      alert("There was an error submitting your questionnaire. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToHome = () => {
    setShowLeaveModal(true)
  }

  const handleLeaveAnyway = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Review Your Answers</h1>
          <p className="text-xl text-gray-600">
            Make sure everything looks correct before we create your personalized plan
          </p>
        </div>

        {/* Plan Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Plan Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Plan Type:</span>
              <span className="font-semibold text-gray-900 capitalize">{planType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Detail Level:</span>
              <span className="font-semibold text-gray-900 capitalize">{tier}</span>
            </div>
            {includeGLP1 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-700">GLP-1 Optimization:</span>
                <span className="font-semibold text-orange-600">Included</span>
              </div>
            )}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-orange-600">£{calculatePrice()}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center gap-3">
            <Button
              id="cta-create-top"
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              {isSubmitting ? "Creating Your Plan..." : "Create My Plan"}
            </Button>
            <SaveExitButton
              draftId={draftId}
              onSave={saveDraft}
              planType={planType}
              tier={tier}
              variant="outline-orange"
            />
            <Button
              id="btn-home-top"
              variant="ghost"
              onClick={handleBackToHome}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Responses */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-orange-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Answers</h2>
            <Button variant="outline" onClick={() => router.push("/questionnaire/start")} className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Answers
            </Button>
          </div>
          <div className="space-y-6">
            {Object.entries(responses).map(([questionId, answer]) => (
              <div key={questionId} className="border-b pb-4 last:border-b-0">
                <div className="font-semibold text-gray-900 mb-2">{getQuestionLabel(questionId)}</div>
                <div className="text-gray-700">{getAnswerLabel(questionId, answer)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* GDPR Consent */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              By submitting this questionnaire, you agree to our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and consent to us processing your data to create your personalized plan.
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            className="px-12 py-6 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {isSubmitting ? "Creating Your Plan..." : "Create My Plan"}
          </Button>
          <p className="text-sm text-gray-600 mt-4">Your personalized plan will be ready in seconds</p>
        </div>

        <div className="flex justify-center mt-6">
          <SaveExitButton
            draftId={draftId}
            onSave={saveDraft}
            planType={planType}
            tier={tier}
            variant="outline-orange"
          />
        </div>
      </div>

      <LeaveConfirmModal
        open={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        onSaveExit={handleLeaveAnyway}
      />
    </div>
  )
}
