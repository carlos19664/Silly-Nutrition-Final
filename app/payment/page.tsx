"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, Lock, CreditCard, Shield, Home } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

function PaymentContent() {
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const planType = searchParams.get("plan") || "essential"
  const planName = searchParams.get("name") || "Essential Plan"
  const planPrice = searchParams.get("price") || "£24"

  const planDetails: Record<string, any> = {
    "single-meal": {
      price: "£39",
      period: "one-time",
      trial: false,
      features: ["1 personalized meal plan", "Complete macro breakdown", "Shopping list", "PDF download"],
    },
    "single-workout": {
      price: "£29",
      period: "one-time",
      trial: false,
      features: ["1 personalized workout plan", "Exercise demonstrations", "Progress guide", "PDF download"],
    },
    "single-complete": {
      price: "£59",
      period: "one-time",
      trial: false,
      features: ["1 meal + 1 workout plan", "Complete guides", "Shopping list", "PDF downloads"],
    },
    essential: {
      price: "£24",
      period: "per month",
      trial: true,
      features: ["4 meal plans per month", "4 workout plans", "Macro breakdown", "Priority email support"],
    },
    coaching: {
      price: "£59",
      period: "per month",
      trial: true,
      features: ["Everything in Essential", "Weekly 1-on-1 coaching", "Custom adjustments", "24/7 priority support"],
    },
  }

  const currentPlan = planDetails[planType] || planDetails.essential

  const handlePayment = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          email: searchParams.get("email") || "",
          questionnaireData: searchParams.get("data") || "{}",
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SiteLogo />
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <Home className="w-4 h-4 mr-2" />
          <span>Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{planName}</h3>
                  {currentPlan.trial && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 mb-3">
                      7-Day Free Trial Included
                    </Badge>
                  )}
                  <ul className="space-y-2 text-sm">
                    {currentPlan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{currentPlan.trial ? "After 7-day trial:" : "Total:"}</span>
                    <span className="text-2xl font-bold text-gray-900">{currentPlan.price}</span>
                  </div>
                  {currentPlan.period && <p className="text-sm text-gray-500">{currentPlan.period}</p>}
                  {currentPlan.trial && (
                    <p className="text-xs text-gray-500 mt-2">Free for 7 days, then {currentPlan.price}/month</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">30-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form - Left Side */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </h3>

                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600 mb-2">Stripe Payment Integration</p>
                      <p className="text-sm text-gray-500">
                        Secure payment processing powered by Stripe will be integrated here
                      </p>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="123 Main Street" required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="London" required />
                        </div>
                        <div>
                          <Label htmlFor="postcode">Postcode</Label>
                          <Input id="postcode" placeholder="SW1A 1AA" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value="United Kingdom" disabled />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2 pt-4 border-t">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . {currentPlan.trial && "I understand I will be charged after the 7-day free trial ends."}
                    </Label>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    disabled={!acceptTerms || isProcessing}
                    className="w-full py-6 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : currentPlan.trial ? (
                      "Start 7-Day Free Trial"
                    ) : (
                      <>Complete Purchase - {currentPlan.price}</>
                    )}
                  </Button>

                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Lock className="w-3 h-3 mr-1" />
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Money-Back Guarantee</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
