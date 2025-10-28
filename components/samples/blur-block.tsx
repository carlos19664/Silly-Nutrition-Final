"use client"

import { memo } from "react"
import type { ReactNode } from "react"

interface BlurBlockProps {
  children: ReactNode
  blurred?: boolean
}

export const BlurBlock = memo(function BlurBlock({ children, blurred = false }: BlurBlockProps) {
  if (!blurred) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      <div className="filter blur-sm select-none pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-2 border-orange-500 max-w-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Want to see the full plan?</h3>
          <p className="text-gray-600 mb-6">Get your personalized nutrition plan tailored to your goals</p>
          <a
            href="/#pricing"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all"
          >
            Get Your Plan Now
          </a>
        </div>
      </div>
    </div>
  )
})
