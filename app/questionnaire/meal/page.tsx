"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { mealPlanQuestions, glp1Questions } from "@/lib/questionnaire-data"
import { QuestionCard } from "@/components/questionnaire/question-card"
import { ProgressBar } from "@/components/questionnaire/progress-bar"
import { SaveExitButton } from "@/components/questionnaire/save-exit-button"
import { useDraftAutosave } from "@/hooks/use-draft-autosave"

export default function MealQuestionnairePage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [tier, setTier] = useState<"standard" | "advanced">("standard")
  const [includeGLP1, setIncludeGLP1] = useState(false)
  const [draftId, setDraftId] = useState<string | null>(null)
  const [plan, setPlan] = useState<string | null>(null)

  useEffect(() => {
    // Load saved data from localStorage
    const savedTier = localStorage.getItem("questionnaire_tier") as "standard" | "advanced"
    const savedGLP1 = localStorage.getItem("questionnaire_glp1") === "true"
    const savedResponses = localStorage.getItem("questionnaire_responses")
    const savedDraftId = localStorage.getItem("current_draft_id")
    const savedPlan = localStorage.getItem("questionnaire_plan")

    if (savedTier) setTier(savedTier)
    if (savedGLP1) setIncludeGLP1(savedGLP1)
    if (savedResponses) setResponses(JSON.parse(savedResponses))
    if (savedDraftId) setDraftId(savedDraftId)
    if (savedPlan) setPlan(savedPlan)
  }, [])

  // Filter questions based on tier
  const questions = tier === "advanced" ? mealPlanQuestions : mealPlanQuestions.filter((q) => q.tier === "standard")

  // Add GLP-1 questions if selected
  const allQuestions = includeGLP1 ? [...questions, ...glp1Questions] : questions

  const currentQuestion = allQuestions[currentQuestionIndex]

  const progress = Math.round(((currentQuestionIndex + 1) / allQuestions.length) * 100)

  const { saveDraft } = useDraftAutosave({
    draftId,
    answers: responses,
    progress,
    lastStep: "meal",
    enabled: !!draftId,
  })

  const handleAnswer = (value: any) => {
    const newResponses = { ...responses, [currentQuestion.id]: value }
    setResponses(newResponses)
    localStorage.setItem("questionnaire_responses", JSON.stringify(newResponses))
  }

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Check if we need to go to workout questionnaire
      const planType = localStorage.getItem("questionnaire_plan_type")
      if (planType === "both") {
        router.push("/questionnaire/workout")
      } else {
        router.push("/questionnaire/summary")
      }
    }
  }

  const handleBack = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      // Trigger autosave before navigating back
      if (draftId) {
        await saveDraft()
      }

      // Build URL with preserved state
      const params = new URLSearchParams()
      if (plan) params.set("plan", plan)
      params.set("tier", tier)
      if (includeGLP1) params.set("glp1", "true")

      router.push(`/questionnaire/start?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {currentQuestionIndex === 0 && (
          <div className="mb-4">
            <button
              onClick={async () => {
                if (draftId) await saveDraft()
                const params = new URLSearchParams()
                if (plan) params.set("plan", plan)
                params.set("tier", tier)
                if (includeGLP1) params.set("glp1", "true")
                router.push(`/questionnaire/start?${params.toString()}`)
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              ← Change questionnaire type
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={allQuestions.length} className="mb-8" />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          value={responses[currentQuestion.id] || (currentQuestion.type === "checkbox" ? [] : "")}
          onChange={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === allQuestions.length - 1}
        />

        <div className="flex justify-center mt-6">
          <SaveExitButton
            draftId={draftId}
            onSave={saveDraft}
            planType={plan || undefined}
            tier={tier}
            variant="outline-orange"
            setDraftId={setDraftId}
          />
        </div>

        {/* Save Draft Notice */}
        <div className="text-center mt-4 text-sm text-gray-600">Your progress is automatically saved</div>
      </div>
    </div>
  )
}
