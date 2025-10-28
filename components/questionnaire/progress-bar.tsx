"use client"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, className = "" }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-orange-600">{Math.round(percentage)}% Complete</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
