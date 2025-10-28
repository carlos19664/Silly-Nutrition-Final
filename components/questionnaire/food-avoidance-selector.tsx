"use client"

import { useState, useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"

interface FoodAvoidanceData {
  has_avoidances: boolean
  notes: string
}

interface FoodAvoidanceSelectorProps {
  value?: FoodAvoidanceData
  onChange: (data: FoodAvoidanceData) => void
}

export function FoodAvoidanceSelector({ value, onChange }: FoodAvoidanceSelectorProps) {
  const [hasAvoidances, setHasAvoidances] = useState(value?.has_avoidances ?? false)
  const [notes, setNotes] = useState(value?.notes ?? "")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (value) {
      setHasAvoidances(value.has_avoidances)
      setNotes(value.notes)
    }
  }, [value])

  const handleRadioChange = (choice: boolean) => {
    setHasAvoidances(choice)

    if (!choice) {
      // Clear notes when switching to No
      setNotes("")
      onChange({ has_avoidances: false, notes: "" })
    } else {
      // Keep existing notes when switching to Yes
      onChange({ has_avoidances: true, notes })
      // Focus textarea after state update
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 0)
    }
  }

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes)
    onChange({ has_avoidances: true, notes: newNotes })
  }

  return (
    <div className="space-y-4">
      {/* Yes/No Radio Buttons */}
      <div role="radiogroup" aria-label="Do you have foods to avoid?" className="flex gap-4 flex-wrap">
        {/* No Button */}
        <label className="flex-1 min-w-[140px] cursor-pointer">
          <input
            type="radio"
            name="has_avoidances"
            value="no"
            checked={!hasAvoidances}
            onChange={() => handleRadioChange(false)}
            className="sr-only"
          />
          <div
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              !hasAvoidances
                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                : "border-gray-200 hover:border-orange-300 bg-white"
            }`}
          >
            <div className="font-semibold text-gray-900">No</div>
            <div className="text-sm text-gray-600 mt-1">No foods to avoid</div>
          </div>
        </label>

        {/* Yes Button */}
        <label className="flex-1 min-w-[140px] cursor-pointer">
          <input
            type="radio"
            name="has_avoidances"
            value="yes"
            checked={hasAvoidances}
            onChange={() => handleRadioChange(true)}
            className="sr-only"
          />
          <div
            className={`p-4 rounded-xl border-2 transition-all text-center ${
              hasAvoidances
                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
                : "border-gray-200 hover:border-orange-300 bg-white"
            }`}
          >
            <div className="font-semibold text-gray-900">Yes</div>
            <div className="text-sm text-gray-600 mt-1">I have foods to avoid</div>
          </div>
        </label>
      </div>

      {/* Conditional Textarea */}
      {hasAvoidances && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label htmlFor="food-avoidances" className="block text-sm font-medium text-gray-700">
            Tell us which foods you want to avoid
          </label>
          <Textarea
            ref={textareaRef}
            id="food-avoidances"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="e.g., mushrooms, shellfish, pork, cilantro, spicy foods"
            className="min-h-[120px] text-base"
            maxLength={300}
          />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="text-xs">List the foods you prefer not to eat</span>
            <span className="text-xs">{notes.length} / 300</span>
          </div>
        </div>
      )}
    </div>
  )
}
