"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { BadgeChip } from "@/components/badge-chip"
import { TestimonialRotator } from "@/components/testimonial-rotator"

export function HeroSillyNutrition() {
  const betaTestimonials = [
    {
      description: "Finally, a plan that actually fits my life",
      name: "Sarah M., Beta Tester",
    },
    {
      description: "I was skeptical, but the AI really gets it",
      name: "Mike R., Beta Tester",
    },
    {
      description: "Best nutrition advice I've ever received",
      name: "Emma L., Beta Tester",
    },
  ]

  const aiTestimonials = [
    {
      description: "The recommendations are spot-on every time",
      name: "James K., Beta Tester",
    },
    {
      description: "It's like having a nutritionist in my pocket",
      name: "Lisa P., Beta Tester",
    },
    {
      description: "Adapts to my progress perfectly",
      name: "David S., Beta Tester",
    },
  ]

  const quickTestimonials = [
    {
      description: "Got my plan in under 5 minutes",
      name: "Rachel T., Beta Tester",
    },
    {
      description: "So fast and easy to use",
      name: "Tom H., Beta Tester",
    },
    {
      description: "Quick setup, amazing results",
      name: "Nicole W., Beta Tester",
    },
  ]

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <SiteLogo size="large" />
        </div>

        {/* Badge */}
        <BadgeChip icon={Sparkles} text="Get exclusive prices NOW!" />

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
          Your Perfect Nutrition Plan
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Created by AI in Minutes
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get a personalized meal plan tailored to your goals, preferences, and lifestyle. No guesswork, just results.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
          >
            Build My Plan Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">Beta Launch</div>
            <div className="text-sm md:text-base text-gray-600 mb-3">Early access pricing</div>
            <TestimonialRotator testimonials={betaTestimonials} />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">AI-Powered</div>
            <div className="text-sm md:text-base text-gray-600 mb-3">Smart recommendations</div>
            <TestimonialRotator testimonials={aiTestimonials} />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">5 Minutes</div>
            <div className="text-sm md:text-base text-gray-600 mb-3">To your custom plan</div>
            <TestimonialRotator testimonials={quickTestimonials} />
          </div>
        </div>
      </div>
    </div>
  )
}
