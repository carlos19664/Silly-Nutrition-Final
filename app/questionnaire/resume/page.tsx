"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyDraftToken } from "@/lib/jwt"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function ResumeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const resumeDraft = async () => {
      const token = searchParams.get("token")

      if (!token) {
        setError("Invalid or missing resume token")
        setLoading(false)
        return
      }

      try {
        // Verify token
        const payload = await verifyDraftToken(token)

        if (!payload || !payload.draftId) {
          setError("Invalid or expired resume link")
          setLoading(false)
          return
        }

        // Fetch draft from API
        const response = await fetch(`/api/drafts/${payload.draftId}`)

        if (!response.ok) {
          setError("Draft not found or has expired")
          setLoading(false)
          return
        }

        const { draft } = await response.json()

        // Store draft data in localStorage
        localStorage.setItem("questionnaire_draft_id", draft.id)
        localStorage.setItem("questionnaire_plan_type", draft.plan_type)
        localStorage.setItem("questionnaire_tier", draft.tier)
        localStorage.setItem("questionnaire_glp1", draft.glp_addon.toString())
        localStorage.setItem("questionnaire_responses", JSON.stringify(draft.answers_json))

        // Redirect to appropriate page based on last_step
        if (draft.last_step === "start") {
          router.push("/questionnaire/start")
        } else if (draft.last_step === "meal") {
          router.push("/questionnaire/meal")
        } else if (draft.last_step === "workout") {
          router.push("/questionnaire/workout")
        } else if (draft.last_step === "summary") {
          router.push("/questionnaire/summary")
        } else {
          router.push("/questionnaire/start")
        }
      } catch (err) {
        console.error("[v0] Error resuming draft:", err)
        setError("Failed to resume questionnaire")
        setLoading(false)
      }
    }

    resumeDraft()
  }, [searchParams, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Resuming your questionnaire...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to Resume</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => router.push("/questionnaire/start")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Start New Questionnaire
          </Button>
        </div>
      </div>
    )
  }

  return null
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  )
}
