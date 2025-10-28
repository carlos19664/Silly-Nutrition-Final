"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get("session_id")
  const planType = searchParams.get("plan")

  useEffect(() => {
    // Simulate processing
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1EBDD] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E4E78] mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1EBDD] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-green-200">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-[#1E4E78] mb-4">Payment Successful! 🎉</h1>

            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing Silly Nutrition! Your personalized plan is being prepared.
            </p>

            <div className="bg-[#F1EBDD] rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Mail className="w-6 h-6 text-[#1E4E78]" />
                <h3 className="text-lg font-semibold text-[#1E4E78]">Check Your Email</h3>
              </div>
              <p className="text-gray-700 mb-2">We've sent a welcome email with your next steps to your inbox.</p>
              <p className="text-sm text-gray-600">
                Your personalized plan will be delivered within the next 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/dashboard">
                <Button className="w-full bg-[#1E4E78] hover:bg-[#1E4E78]/90 text-white font-semibold text-lg py-6">
                  Go to Your Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Return to Homepage
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Transaction ID:</strong> {sessionId || "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? Contact us at{" "}
            <a href="mailto:support@sillynutrition.com" className="text-[#1E4E78] font-semibold hover:underline">
              support@sillynutrition.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
