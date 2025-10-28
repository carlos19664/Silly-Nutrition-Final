"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Home, Play } from "lucide-react"

export default function ThankYouDraftPage() {
  const [resumeLink, setResumeLink] = useState<string | null>(null)

  useEffect(() => {
    const draftId = localStorage.getItem("current_draft_id")
    if (draftId) {
      setResumeLink(`/questionnaire/resume?draft=${draftId}`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">You're all set</h1>

        {/* Body */}
        <p className="text-lg text-gray-600 mb-8">
          We've sent you a resume link. You can return anytime to continue your questionnaire.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full gap-2 bg-transparent">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>

          {resumeLink && (
            <Link href={resumeLink}>
              <Button size="lg" className="w-full gap-2 bg-orange-500 hover:bg-orange-600">
                <Play className="w-5 h-5" />
                Resume now
              </Button>
            </Link>
          )}
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          Check your email for the resume link. It will take you right back to where you left off.
        </p>
      </div>
    </div>
  )
}
