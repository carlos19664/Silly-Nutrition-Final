"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function ResumeBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [draftInfo, setDraftInfo] = useState<{
    planType: string
    progress: number
  } | null>(null)

  useEffect(() => {
    // Check if there's a saved draft
    const draftId = localStorage.getItem("questionnaire_draft_id")
    const planType = localStorage.getItem("questionnaire_plan_type")
    const responses = localStorage.getItem("questionnaire_responses")

    if (draftId && planType && responses) {
      const parsedResponses = JSON.parse(responses)
      const progress = Object.keys(parsedResponses).length

      setDraftInfo({
        planType,
        progress,
      })
      setShowBanner(true)
    }
  }, [])

  const handleResume = () => {
    const lastStep = localStorage.getItem("questionnaire_last_step") || "start"
    window.location.href = `/questionnaire/${lastStep}`
  }

  const handleDismiss = () => {
    setShowBanner(false)
  }

  if (!showBanner || !draftInfo) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 mb-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-semibold">Continue where you left off</p>
          <p className="text-sm text-orange-100">
            You have an unfinished {draftInfo.planType} plan questionnaire with {draftInfo.progress} answers saved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleResume}
            variant="secondary"
            size="sm"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            Resume
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-orange-700 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
