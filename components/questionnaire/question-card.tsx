"use client"

import { Check } from "lucide-react"
import type { Question } from "@/lib/questionnaire-data"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { VitalsSelector } from "./vitals-selector"
import { FoodAvoidanceSelector } from "./food-avoidance-selector"

interface QuestionCardProps {
  question: Question
  value: string | string[] | any
  onChange: (value: string | string[] | any) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
}

export function QuestionCard({ question, value, onChange, onNext, onBack, isFirst, isLast }: QuestionCardProps) {
  const handleRadioChange = (optionValue: string) => {
    onChange(optionValue)
  }

  const handleCheckboxChange = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : []

    if (optionValue === "none") {
      onChange(["none"])
    } else {
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue && v !== "none")
        : [...currentValues.filter((v) => v !== "none"), optionValue]
      onChange(newValues)
    }
  }

  const isAnswered = () => {
    if (!question.required) return true

    if (question.id === "meal_body_stats") {
      const vitals = value as any
      return vitals?.age_years && vitals?.height?.cm && vitals?.weight_current?.kg
    }

    if (question.id === "meal_dislikes") {
      const avoidance = value as any
      if (!avoidance?.has_avoidances) return true
      return avoidance?.has_avoidances && avoidance?.notes?.trim().length > 0
    }

    if (Array.isArray(value)) return value.length > 0
    return value !== ""
  }

  const getStringValue = (val: any): string => {
    if (typeof val === "string") return val
    if (typeof val === "number") return val.toString()
    return ""
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {question.backgroundImage && (
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden -z-10"
          style={{
            backgroundImage: `url(${question.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
          }}
        />
      )}

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-orange-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{question.question}</h2>
          {question.description && <p className="text-gray-600">{question.description}</p>}
        </div>

        <div className="space-y-3 mb-8">
          {question.type === "radio" &&
            question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleRadioChange(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  value === option.value
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      value === option.value ? "border-orange-500 bg-orange-500" : "border-gray-300"
                    }`}
                  >
                    {value === option.value && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    {option.description && <div className="text-sm text-gray-600 mt-1">{option.description}</div>}
                  </div>
                </div>
              </button>
            ))}

          {question.type === "checkbox" &&
            question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCheckboxChange(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  Array.isArray(value) && value.includes(option.value)
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 ${
                      Array.isArray(value) && value.includes(option.value)
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {Array.isArray(value) && value.includes(option.value) && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    {option.description && <div className="text-sm text-gray-600 mt-1">{option.description}</div>}
                  </div>
                </div>
              </button>
            ))}

          {question.id === "meal_dislikes" && (
            <FoodAvoidanceSelector value={value as any} onChange={(avoidance) => onChange(avoidance as any)} />
          )}

          {question.type === "textarea" && question.id !== "meal_dislikes" && (
            <Textarea
              value={getStringValue(value)}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[120px] text-base"
            />
          )}

          {question.id === "meal_body_stats" && (
            <VitalsSelector value={value as any} onChange={(vitals) => onChange(vitals as any)} />
          )}

          {question.type === "text" && question.id !== "meal_body_stats" && question.id !== "meal_dislikes" && (
            <Input
              value={getStringValue(value)}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type your answer here..."
              className="text-base"
            />
          )}

          {question.type === "number" && (
            <Input
              type="number"
              value={getStringValue(value)}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter a number..."
              min={question.validation?.min}
              max={question.validation?.max}
              className="text-base"
            />
          )}
        </div>

        <div className="flex gap-4">
          {!isFirst && (
            <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
              Back
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={!isAnswered()}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {isLast ? "Review Answers" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
