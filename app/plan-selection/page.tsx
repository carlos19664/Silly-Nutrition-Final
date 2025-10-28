"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function PlanSelectionContent() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get("plan") || "single"

  const planDetails = {
    single: {
      name: "Single Plans",
      price: "£29",
    },
    essential: {
      name: "Essential Plan",
      price: "£59/month",
    },
    coaching: {
      name: "Coaching Plan",
      price: "£99/month",
    },
  }

  const currentPlan = planDetails[plan as keyof typeof planDetails] || planDetails.single

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold text-gray-900">Silly Nutrition</span>
            </Link>

            <Link href="/">
              <Button variant="outline" className="border-gray-300 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Selected Plan Banner */}
        <div className="bg-white border-2 border-orange-500 rounded-2xl p-8 mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Selected: {currentPlan.name}</h1>
          <p className="text-2xl text-orange-500 font-bold">Price: {currentPlan.price}</p>
        </div>

        {/* Questionnaire Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Questionnaire Type</h2>
          <p className="text-xl text-gray-600">Select the questionnaire that best fits your needs:</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Standard Questionnaire */}
          <div className="bg-white border-2 border-blue-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 text-center">Standard Questionnaire</h3>
            <p className="text-gray-600 text-center mb-4">5-7 questions • 3-5 minutes</p>
            <p className="text-gray-700 text-center mb-6">Perfect for personal use and basic customization</p>
            <Link href="/questionnaire/standard" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold">
                Select Standard
              </Button>
            </Link>
          </div>

          {/* Advanced Questionnaire */}
          <div className="bg-white border-2 border-orange-500 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4 text-center">Advanced Questionnaire</h3>
            <p className="text-gray-600 text-center mb-4">15-20 questions • 8-10 minutes</p>
            <p className="text-gray-700 text-center mb-6">
              Includes dietary restrictions (vegetarian, vegan, halal) and detailed assessment. Perfect for personal
              trainers.
            </p>
            <Link href="/questionnaire/advanced" className="block">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold">
                Select Advanced
              </Button>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Quick & Easy</h4>
            <p className="text-gray-600 text-sm">Answer questions at your own pace</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">AI-Powered</h4>
            <p className="text-gray-600 text-sm">Personalized recommendations</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Instant Results</h4>
            <p className="text-gray-600 text-sm">Get your plan in minutes</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Silly Nutrition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default function PlanSelection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlanSelectionContent />
    </Suspense>
  )
}
