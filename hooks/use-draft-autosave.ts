"use client"

import { useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseDraftAutosaveOptions {
  draftId: string | null
  answers: Record<string, any>
  progress: number
  lastStep: string
  enabled?: boolean
}

export function useDraftAutosave({ draftId, answers, progress, lastStep, enabled = true }: UseDraftAutosaveOptions) {
  const { toast } = useToast()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastSavedRef = useRef<string>("")

  const saveDraft = useCallback(async () => {
    if (!draftId || !enabled) return

    const currentState = JSON.stringify({ answers, progress, lastStep })

    // Skip if nothing changed
    if (currentState === lastSavedRef.current) return

    try {
      const response = await fetch(`/api/drafts/${draftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers_json: answers,
          progress_pct: progress,
          last_step: lastStep,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save draft")
      }

      lastSavedRef.current = currentState
      console.log("[v0] Draft autosaved successfully")
    } catch (error) {
      console.error("[v0] Error autosaving draft:", error)
      toast({
        title: "Autosave failed",
        description: "Your progress may not be saved",
        variant: "destructive",
      })
    }
  }, [draftId, answers, progress, lastStep, enabled, toast])

  useEffect(() => {
    if (!enabled) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for 2 seconds after last change
    timeoutRef.current = setTimeout(() => {
      saveDraft()
    }, 2000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [answers, progress, lastStep, enabled, saveDraft])

  return { saveDraft }
}
