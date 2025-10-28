import type React from "react"
interface BadgeChipProps {
  children: React.ReactNode
}

export function BadgeChip({ children }: BadgeChipProps) {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6">
      {children}
    </div>
  )
}
