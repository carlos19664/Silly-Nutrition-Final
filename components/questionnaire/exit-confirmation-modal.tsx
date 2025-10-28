"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ExitConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onSaveAndExit: () => void
}

export function ExitConfirmationModal({ open, onOpenChange, onConfirm, onSaveAndExit }: ExitConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave questionnaire?</AlertDialogTitle>
          <AlertDialogDescription>
            You haven't finished your questionnaire yet. Would you like to save your progress before leaving?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue Questionnaire</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-gray-500 hover:bg-gray-600">
            Leave Without Saving
          </AlertDialogAction>
          <AlertDialogAction
            onClick={onSaveAndExit}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Save & Exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
