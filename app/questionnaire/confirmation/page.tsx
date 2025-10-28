"use client"

import { useEffect, useState } from "react"
import { Check, Download, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QuestionnaireConfirmationPage() {
  const [planType, setPlanType] = useState<string>("")

  useEffect(() => {
    const savedPlanType = localStorage.getItem("questionnaire_plan_type")
    if (savedPlanType) setPlanType(savedPlanType)

    // Clear questionnaire data from localStorage
    // localStorage.removeItem('questionnaire_plan_type')
    // localStorage.removeItem('questionnaire_tier')
    // localStorage.removeItem('questionnaire_glp1')
    // localStorage.removeItem('questionnaire_responses')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Plan is Ready!</h1>
          <p className="text-xl text-gray-600">We've created your personalized {planType} plan based on your answers</p>
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Access Your Plan</h2>
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              <Download className="w-5 h-5" />
              Download PDF Plan
            </Button>
            <Button size="lg" variant="outline" className="w-full gap-3 bg-transparent">
              <Mail className="w-5 h-5" />
              Email Plan to Me
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-4">
            Your plan has also been saved to your account dashboard
          </p>
        </div>

        {/* Upsell Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Want Even Better Results?</h2>
          <p className="text-lg mb-6 text-orange-50">
            Upgrade to our monthly coaching plan for ongoing support, weekly plan updates, and priority email support
          </p>
          <div className="flex gap-4">
            <Link href="/pricing" className="flex-1">
              <Button size="lg" variant="secondary" className="w-full gap-2">
                View Coaching Plans
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Review Your Plan</h3>
                <p className="text-gray-600">Download and read through your personalized plan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Start Following It</h3>
                <p className="text-gray-600">Begin implementing your plan today for best results</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Track Your Progress</h3>
                <p className="text-gray-600">Monitor your results and adjust as needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
