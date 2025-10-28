"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LeaveConfirmModalProps {
  open: boolean
  onClose: () => void
  onSaveExit: () => Promise<void>
}

export function LeaveConfirmModal({ open, onClose, onSaveExit }: LeaveConfirmModalProps) {
  const router = useRouter()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  const handleLeaveWithoutSaving = () => {
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave questionnaire?</DialogTitle>
          <DialogDescription>
            Your progress is saved. We'll email you a link so you can continue anytime.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleLeaveWithoutSaving}>
            Leave without saving
          </Button>
          <Button onClick={onSaveExit} className="bg-orange-500 hover:bg-orange-600">
            Save & Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
