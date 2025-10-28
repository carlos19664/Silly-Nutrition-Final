"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Mail } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

export default function AccountCancelledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Account Has Been Cancelled</h1>
            <p className="text-xl text-gray-600">We're sorry to see you go</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Immediate Effect</p>
                      <p className="text-sm text-gray-600">
                        Your subscription has been cancelled immediately and you will not be charged again.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Data Retention</p>
                      <p className="text-sm text-gray-600">
                        Your account data will be retained for 90 days in case you decide to return.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Confirmation</p>
                      <p className="text-sm text-gray-600">
                        We've sent a confirmation email with details about your cancellation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">We'd Love Your Feedback</h3>
                <p className="text-gray-600 mb-4">
                  Your input helps us improve. If you have a moment, please let us know what we could have done better.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Feedback
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Changed Your Mind?</h3>
            <p className="text-gray-700 mb-4">
              You can reactivate your account anytime within 90 days and pick up right where you left off.
            </p>
            <Link href="/sign-up">
              <Button className="bg-orange-600 hover:bg-orange-700">Reactivate My Account</Button>
            </Link>
          </div>

          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
