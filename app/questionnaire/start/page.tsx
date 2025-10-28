"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SelectedBanner } from "@/components/selected-banner"
import { LeaveConfirmModal } from "@/components/questionnaire/leave-confirm-modal"
import { SaveExitButton } from "@/components/questionnaire/save-exit-button"
import { useDraftAutosave } from "@/hooks/use-draft-autosave"
import { toast } from "react-toastify"

function TierCardChoice({
  id,
  value,
  selectedTier,
  onSelect,
  title,
  subtitle,
  showSparkles = false,
}: {
  id: string
  value: "standard" | "advanced"
  selectedTier: "standard" | "advanced"
  onSelect: (v: "standard" | "advanced") => void
  title: string
  subtitle: string
  showSparkles?: boolean
}) {
  const isSelected = selectedTier === value
  return (
    <label
      htmlFor={id}
      className={[
        "relative block cursor-pointer rounded-xl border-2 transition-all p-6",
        "focus-within:ring-2 focus-within:ring-orange-300",
        isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white hover:border-orange-300",
      ].join(" ")}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(value)
        }
      }}
      onClick={() => onSelect(value)}
    >
      <input
        id={id}
        type="radio"
        name="tier"
        value={value}
        checked={isSelected}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
            isSelected ? "border-orange-500 bg-orange-500" : "border-gray-300"
          }`}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            {title}
            {showSparkles && <Sparkles className="w-5 h-5 text-orange-500" />}
          </h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </label>
  )
}

export default function QuestionnaireStartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [planType, setPlanType] = useState<"meal" | "workout" | "both" | null>(null)
  const [tier, setTier] = useState<"standard" | "advanced">("standard")
  const [includeGLP1, setIncludeGLP1] = useState(false)
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const [draftId, setDraftId] = useState<string | null>(null)
  const [progressPct, setProgressPct] = useState(0)

  const plan = searchParams.get("plan")
  const sub = searchParams.get("sub")
  const showPlanChooser = !((plan === "single" && sub) || plan === "essential" || plan === "coaching")

  useEffect(() => {
    if (plan === "single" && sub) {
      if (sub === "meal") setPlanType("meal")
      else if (sub === "workout") setPlanType("workout")
      else if (sub === "complete") setPlanType("both")
    } else if (plan === "essential" || plan === "coaching") {
      setPlanType("both")
    }

    const tierParam = searchParams.get("tier")
    if (tierParam === "standard" || tierParam === "advanced") {
      setTier(tierParam)
    }

    const glp1Param = searchParams.get("glp1")
    if (glp1Param === "true") {
      setIncludeGLP1(true)
    }

    const savedDraftId = localStorage.getItem("current_draft_id")
    const savedProgress = localStorage.getItem("questionnaire_progress")
    if (savedDraftId) setDraftId(savedDraftId)
    if (savedProgress) setProgressPct(Number.parseInt(savedProgress, 10))
  }, [plan, sub, searchParams])

  const { saveDraft } = useDraftAutosave({
    draftId: draftId || undefined,
    answersJson: {},
    progressPct,
    lastStep: "start",
  })

  const handleSaveExit = async () => {
    if (!draftId) return

    try {
      await saveDraft()
      await fetch("/api/drafts/send-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft_id: draftId }),
      })
      toast.success("Saved! We've emailed you a link to continue.")
    } catch (e) {
      toast.info("Saved, but email couldn't be sent. You can resume from your account.")
    } finally {
      router.push("/thank-you-draft")
    }
  }

  const handleBackToHome = () => {
    if (draftId && progressPct > 0) {
      setShowLeaveModal(true)
    } else {
      router.push("/")
    }
  }

  const handleStart = () => {
    if (!planType) return

    localStorage.setItem("questionnaire_plan", plan || "single")
    localStorage.setItem("questionnaire_plan_type", planType)
    localStorage.setItem("questionnaire_tier", tier)
    localStorage.setItem("questionnaire_glp1", includeGLP1.toString())
    localStorage.setItem("questionnaire_responses", JSON.stringify({}))

    if (planType === "meal") {
      router.push("/questionnaire/meal")
    } else if (planType === "workout") {
      router.push("/questionnaire/workout")
    } else {
      router.push("/questionnaire/meal")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <SelectedBanner />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Create Your Personalized Plan</h1>
          <p className="text-xl text-gray-600">
            Answer a few questions to get a plan tailored specifically to your goals
          </p>
        </div>

        {showPlanChooser && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Choose Your Plan Type</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPlanType("meal")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    planType === "meal"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">🍽️</div>
                    <h3 className="font-bold text-lg mb-2">Meal Plan Only</h3>
                    <p className="text-sm text-gray-600">Personalized nutrition plan</p>
                  </div>
                </button>

                <button
                  onClick={() => setPlanType("workout")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    planType === "workout"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">💪</div>
                    <h3 className="font-bold text-lg mb-2">Workout Plan Only</h3>
                    <p className="text-sm text-gray-600">Customized training program</p>
                  </div>
                </button>

                <button
                  onClick={() => setPlanType("both")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    planType === "both"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300 bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">⭐</div>
                    <h3 className="font-bold text-lg mb-2">Complete Package</h3>
                    <p className="text-sm text-gray-600">Meal + Workout plans</p>
                    <div className="mt-2 text-xs font-semibold text-orange-600">Save £20!</div>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {planType && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {showPlanChooser ? "Step 2" : "Step 1"}: Choose Your Detail Level
            </h2>
            <div className="grid md:grid-cols-2 gap-4 relative z-0">
              <TierCardChoice
                id="tier-standard"
                value="standard"
                selectedTier={tier}
                onSelect={setTier}
                title="Standard Plan"
                subtitle="10 essential questions - Perfect for getting started quickly"
              />
              <TierCardChoice
                id="tier-advanced"
                value="advanced"
                selectedTier={tier}
                onSelect={setTier}
                title="Advanced Plan"
                subtitle="15 detailed questions - Maximum personalization for best results"
                showSparkles={true}
              />
            </div>
          </div>
        )}

        {planType === "meal" && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Optional Add-on</h2>
            <button
              onClick={() => setIncludeGLP1(!includeGLP1)}
              className={`w-full p-6 rounded-xl border-2 transition-all ${
                includeGLP1 ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                    includeGLP1 ? "border-orange-500 bg-orange-500" : "border-gray-300"
                  }`}
                >
                  {includeGLP1 && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg mb-2">GLP-1 Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Taking Ozempic, Wegovy, or similar? Get specialized nutrition guidance for GLP-1 medications
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {(plan === "essential" || plan === "coaching") && planType && (
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Optional Add-on</h2>
            <button
              onClick={() => setIncludeGLP1(!includeGLP1)}
              className={`w-full p-6 rounded-xl border-2 transition-all ${
                includeGLP1 ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                    includeGLP1 ? "border-orange-500 bg-orange-500" : "border-gray-300"
                  }`}
                >
                  {includeGLP1 && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg mb-2">GLP-1 Optimization</h3>
                  <p className="text-sm text-gray-600">
                    Taking Ozempic, Wegovy, or similar? Get specialized nutrition guidance for GLP-1 medications
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {planType && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={handleStart}
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Start Questionnaire
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Takes about {tier === "standard" ? "5-7" : "8-10"} minutes to complete
            </p>
            <SaveExitButton onClick={handleSaveExit} />
          </div>
        )}
      </div>

      <LeaveConfirmModal open={showLeaveModal} onClose={() => setShowLeaveModal(false)} onSaveExit={handleSaveExit} />
    </div>
  )
}
