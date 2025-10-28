"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Home } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Refund Policy</h1>
        <p className="text-lg text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
              <p className="text-gray-700">
                We're confident you'll love your personalized plan. If you're not satisfied, we offer a full refund
                within 30 days of purchase, no questions asked.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility for Refunds</h2>
            <p className="text-gray-700 mb-4">You are eligible for a full refund if:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You request a refund within 30 days of your initial purchase</li>
              <li>You have not received the value promised in your plan</li>
              <li>There was a technical error preventing you from accessing your plan</li>
              <li>You're unsatisfied with the quality of your personalized plan for any reason</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
            <p className="text-gray-700 mb-4">Requesting a refund is simple and straightforward:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>
                Email our support team at{" "}
                <a href="mailto:refunds@sillynutrition.com" className="text-orange-600 hover:text-orange-700">
                  refunds@sillynutrition.com
                </a>
              </li>
              <li>Include your order number and email address used for purchase</li>
              <li>Briefly explain the reason for your refund request (optional but helpful)</li>
              <li>We'll process your refund within 3-5 business days</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
            <p className="text-gray-700 mb-4">
              Once your refund is approved, it will be processed automatically to your original payment method. The time
              it takes for the refund to appear in your account depends on your bank or payment provider, but typically
              takes 5-10 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Cancellations</h2>
            <p className="text-gray-700 mb-4">
              For subscription plans (Essential and Coaching), you can cancel at any time. If you cancel before your
              next billing date, you won't be charged again. You'll continue to have access until the end of your
              current billing period.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our refund policy, please don't hesitate to reach out:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Refunds:</strong>{" "}
                <a href="mailto:refunds@sillynutrition.com" className="text-orange-600 hover:text-orange-700">
                  refunds@sillynutrition.com
                </a>
              </li>
              <li>
                <strong>General Support:</strong>{" "}
                <a href="mailto:support@sillynutrition.com" className="text-orange-600 hover:text-orange-700">
                  support@sillynutrition.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" className="bg-transparent">
                Contact Support
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
