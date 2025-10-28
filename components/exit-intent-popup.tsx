"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasShown) {
        const shouldShow = Math.random() < 0.1
        if (shouldShow) {
          setShowPopup(true)
          setHasShown(true)
        }
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setShowPopup(false)
  }

  const handleAccept = () => {
    navigator.clipboard.writeText("WELCOME10")
    alert("Discount code WELCOME10 copied to clipboard!")
    window.location.href = "/#pricing"
  }

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Wait! Don't Leave Yet</h2>
          <p className="text-lg text-gray-600 mb-6">
            Get <span className="text-orange-600 font-bold text-2xl">10% OFF</span> your first month!
          </p>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Use code at checkout:</p>
            <p className="text-3xl font-bold text-orange-600 tracking-wider">WELCOME10</p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleAccept} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg">
              Claim My 10% Discount
            </Button>
            <Button onClick={handleClose} variant="ghost" className="w-full text-gray-600">
              No thanks, I'll pay full price
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">This offer expires in 24 hours. Valid for new customers only.</p>
        </div>
      </div>
    </div>
  )
}
