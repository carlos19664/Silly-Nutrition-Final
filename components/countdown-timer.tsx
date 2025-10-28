"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const deadlineKey = "sn_launch_deadline"
    let deadline = localStorage.getItem(deadlineKey)

    if (!deadline) {
      const now = Date.now()
      const future = now + 72 * 60 * 60 * 1000 // 72 hours
      deadline = future.toString()
      localStorage.setItem(deadlineKey, deadline)
    }

    const updateTimer = () => {
      const now = Date.now()
      const remaining = Number.parseInt(deadline!) - now

      if (remaining <= 0) {
        setIsExpired(true)
        setTimeLeft(0)
      } else {
        setTimeLeft(remaining)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}d ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
    }
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-3 sm:p-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
        <p className="text-xs sm:text-sm text-gray-700 text-center">
          {isExpired ? (
            <span className="font-semibold">Launch offer ending — prices updating soon</span>
          ) : (
            <>
              <span className="font-semibold">Launch offer ends in:</span>{" "}
              <span className="font-mono font-bold text-orange-600" aria-live="polite">
                {formatTime(timeLeft)}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
