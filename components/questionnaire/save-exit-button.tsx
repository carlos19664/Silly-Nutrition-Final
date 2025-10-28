"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { toast } from "sonner"

interface SaveExitButtonProps {
  draftId: string | null
  onSave: () => Promise<void>
  planType?: string
  tier?: string
  variant?: "outline" | "outline-orange"
  setDraftId?: (id: string) => void
}

export function SaveExitButton({
  draftId,
  onSave,
  planType,
  tier,
  variant = "outline",
  setDraftId,
}: SaveExitButtonProps) {
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const onClick = async () => {
    setSaving(true)
    try {
      let currentDraftId = draftId

      if (!currentDraftId) {
        const email = localStorage.getItem("questionnaire_email") || ""
        const plan = localStorage.getItem("questionnaire_plan") || planType || "single"
        const savedTier = localStorage.getItem("questionnaire_tier") || tier || "standard"
        const glpAddon = localStorage.getItem("questionnaire_glp1") === "true"

        const response = await fetch("/api/drafts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan_type: plan,
            tier: savedTier,
            glp_addon: glpAddon,
            email,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create draft")
        }

        const { draft } = await response.json()
        currentDraftId = draft.id
        localStorage.setItem("current_draft_id", currentDraftId)
        if (setDraftId) setDraftId(currentDraftId)
      }

      // Save current progress
      await onSave()

      // Create summary snapshot if planType and tier are provided
      if (planType && tier) {
        await fetch("/api/drafts/summary-snapshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ draft_id: currentDraftId }),
        })
      }

      // Send resume email
      const email = localStorage.getItem("questionnaire_email") || ""

      await fetch("/api/drafts/send-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft_id: currentDraftId, email }),
      })

      toast.success("Saved! We've emailed you a link to continue.")
    } catch (e) {
      console.error("[v0] Save & Exit error:", e)
      toast.info("Saved, but email couldn't be sent. You can resume from your account.")
    } finally {
      setSaving(false)
      router.push("/thank-you-draft")
    }
  }

  return (
    <Button onClick={onClick} disabled={saving} variant={variant} className="gap-2">
      <Save className="w-4 h-4" />
      {saving ? "Saving..." : "Save & Exit"}
    </Button>
  )
}
