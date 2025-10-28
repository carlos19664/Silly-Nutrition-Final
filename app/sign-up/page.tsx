"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`,
          },
        },
      })

      if (error) {
        setErrors({ email: error.message })
        setIsSubmitting(false)
        return
      }

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: formData.email,
          full_name: `${formData.firstName} ${formData.lastName}`,
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }
      }

      alert("Account created successfully! Please check your email to verify your account.")
      router.push("/sign-in")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ email: "An error occurred during signup. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-orange-600 hover:text-orange-700 font-semibold">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                <p className="text-gray-600">Start your journey to better health today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                      if (errors.agreeToTerms) {
                        setErrors((prev) => ({ ...prev, agreeToTerms: "" }))
                      }
                    }}
                    className={errors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm font-normal leading-tight cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.agreeToTerms}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up Free"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join Silly Nutrition?</h2>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personalized Plans</h3>
                    <p className="text-gray-600 text-sm">
                      AI-powered meal and workout plans tailored to your unique goals
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                    <p className="text-gray-600 text-sm">Get your plan delivered in minutes, not days or weeks</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Affordable Pricing</h3>
                    <p className="text-gray-600 text-sm">
                      Premium features at a fraction of the cost of personal trainers
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Long-Term Commitment</h3>
                    <p className="text-gray-600 text-sm">Cancel anytime</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
                    <p className="text-gray-600 text-sm">Access to coaching and 24/7 support with premium plans</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mt-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Limited Time Offer</h3>
                    <p className="text-sm text-gray-700">
                      Lock in our launch pricing today! Prices will increase soon, but early members keep their rate
                      forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
