"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Gift } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

export default function CancelAccountPage() {
  const [reason, setReason] = useState("")
  const [feedback, setFeedback] = useState("")
  const [showRetentionOffer, setShowRetentionOffer] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const cancellationReasons = [
    "Too expensive",
    "Not using it enough",
    "Found a better alternative",
    "Technical issues",
    "Not seeing results",
    "Other",
  ]

  const handleContinueCancellation = () => {
    if (!reason) {
      alert("Please select a reason for cancellation")
      return
    }
    setShowRetentionOffer(true)
  }

  const handleAcceptOffer = async () => {
    setIsProcessing(true)
    // Simulate API call to apply discount
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Copy discount code
    navigator.clipboard.writeText("STAY50")
    alert(
      "Great! Discount code STAY50 has been applied to your account and copied to clipboard. Your next month will be 50% off!",
    )

    // Redirect to account dashboard
    window.location.href = "/dashboard"
  }

  const handleDeclineOffer = async () => {
    setIsProcessing(true)
    // Simulate API call to cancel account
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to cancellation confirmation
    window.location.href = "/account/cancelled"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {!showRetentionOffer ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Cancel Your Account</h1>
                  <p className="text-gray-600">We're sorry to see you go</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Why are you cancelling?</Label>
                  <RadioGroup value={reason} onValueChange={setReason}>
                    <div className="space-y-3">
                      {cancellationReasons.map((r) => (
                        <div
                          key={r}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
                        >
                          <RadioGroupItem value={r} id={r} />
                          <Label htmlFor={r} className="cursor-pointer flex-1 font-normal">
                            {r}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="feedback" className="text-base font-semibold mb-3 block">
                    Additional Feedback (Optional)
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Help us improve by sharing your thoughts..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Cancelling will immediately end your subscription. You'll lose access to all
                    features and your personalized plans.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Keep My Account
                    </Button>
                  </Link>
                  <Button
                    onClick={handleContinueCancellation}
                    variant="destructive"
                    className="flex-1"
                    disabled={!reason}
                  >
                    Continue Cancellation
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-orange-500">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                    <Gift className="h-10 w-10 text-orange-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Wait! We Have a Special Offer</h2>
                <p className="text-xl text-gray-700 mb-2">Stay with us and get 50% off your next month</p>
                <p className="text-gray-600">We value you as a member and want to help you reach your goals</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 mb-8">
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-2">Your exclusive discount code:</p>
                  <div className="text-4xl font-bold text-orange-600 tracking-wider mb-3">STAY50</div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    <span className="line-through text-gray-400 mr-2">£29</span>
                    £14.50
                  </p>
                  <p className="text-sm text-gray-600">for your next month</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">What you'll keep with this offer:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <p className="text-gray-700">Your personalized meal and workout plans</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <p className="text-gray-700">AI-powered plan adjustments based on your progress</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <p className="text-gray-700">24/7 customer support</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <p className="text-gray-700">Access to new features and updates</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAcceptOffer}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Yes! Apply 50% Discount"}
                </Button>
                <Button
                  onClick={handleDeclineOffer}
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-800"
                  disabled={isProcessing}
                >
                  No thanks, complete cancellation
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-6">
                This offer is valid for one month only. You can still cancel anytime.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
