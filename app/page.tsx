"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Clock, Sparkles } from "lucide-react"
import { PricingSection } from "@/components/pricing-section"
import { SiteLogo } from "@/components/site-logo"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { useState } from "react"
import Link from "next/link"
import { BadgeChip } from "@/components/badge-chip"
import Testimonials from "@/components/testimonials";


export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const betaTestimonials = [
    { description: "Excited to be part of the beta!", name: "Early User" },
    { description: "Love being one of the first to try this", name: "Beta Tester" },
    { description: "The beta experience has been incredible", name: "John D." },
  ];

  const aiTestimonials = [
    { description: "The AI recommendations are spot on", name: "Sarah K." },
    { description: "Feels like it was made just for me", name: "Mike R." },
    { description: "Best personalised plan I've ever used", name: "Emma L." },
  ];

  const quickTestimonials = [
    { description: "Fastest setup I've ever done", name: "Mike R." },
    { description: "Got my plan in under 5 minutes!", name: "Jessica T." },
    { description: "So quick and easy to get started", name: "David L." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <ExitIntentPopup />

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Silly Nutrition
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#how-it-works">
                <Button
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  How It Works
                </Button>
              </a>
              <a href="#pricing">
                <Button
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Plans
                </Button>
              </a>
              <Link href="/glp1">
                <Button
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  GLP-1 Support
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Help
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <a href="#pricing">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition-all">
                  Get Started
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
              <a href="#how-it-works" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  How It Works
                </Button>
              </a>
              <a href="#pricing" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Plans
                </Button>
              </a>
              <Link href="/glp1" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  GLP-1 Support
                </Button>
              </Link>
              <Link href="/help" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Help
                </Button>
              </Link>
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 bg-transparent font-semibold transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition-all">
                  Get Started
                </Button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-6 sm:mb-8">
              <SiteLogo size="lg" />
            </div>

            <BadgeChip>⚡ Get exclusive prices NOW!</BadgeChip>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Your Personalised Nutrition &<br />
              Fitness Plan in{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent relative inline-block">
                Minutes
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2 10C50 3 150 3 198 10"
                    stroke="url(#underlineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              AI-powered meal plans and workout routines tailored specifically to your goals, preferences, and lifestyle
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <a href="#pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </a>
              <Link href="/glp1" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-orange-500 text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-transparent transition-all"
                >
                  GLP-1 Nutrition Plans
                  <Sparkles className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats Grid with Testimonials */}
<section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
  {/* Card 1 — Beta Launch */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
      Beta Launch
    </div>
    <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-3">
      Join our exclusive beta program
    </div>
    {/* Use the list you already have in this file */}
    <Testimonials testimonials={betaTestimonials} />
  </div>

  {/* Card 2 — AI-Powered */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
      AI-Powered
    </div>
    <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-3">
      Personalised to your goals
    </div>
    <Testimonials testimonials={aiTestimonials} />
  </div>

  {/* Card 3 — 5 Minutes */}
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
      5 Minutes
    </div>
    <div className="text-xs sm:text-sm md:text-base text-gray-600 mb-3">
      So quick and easy to get started
    </div>
    <Testimonials testimonials={quickTestimonials} />
  </div>
</section>


      {/* Problem/Solution Section */}
      <ProblemSolutionSection />

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Get your personalised plan in three simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-orange-50 to-white border border-orange-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Answer Questions</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Tell us about your goals, dietary preferences, and fitness level through our quick questionnaire
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">AI Creates Your Plan</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our advanced AI analyses your responses and generates a completely personalised nutrition and fitness
                plan
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white text-2xl sm:text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Start Your Journey</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Receive your detailed plan with meal ideas, recipes, shopping lists, and workout routines ready to go
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Why Choose Section */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Silly Nutrition?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with nutritional science to deliver results
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Science-Backed Plans</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Every recommendation is based on proven nutritional science and fitness principles, ensuring safe and
                effective results
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Truly Personalised</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                No generic meal plans here. Every plan is uniquely created based on your specific goals, preferences,
                and lifestyle
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Save Time & Money</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Get professional-level meal plans and workout routines at a fraction of the cost of a personal trainer
                or nutritionist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Beta Users Say</h2>
            <p className="text-lg sm:text-xl text-gray-600">Real results from real people</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                  SK
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Sarah K.</div>
                  <div className="text-sm text-gray-600">Lost 8kg in 6 weeks</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                "Finally, a plan that actually fits my busy lifestyle. The AI understood exactly what I needed, and the
                results speak for themselves!"
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  MR
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Mike R.</div>
                  <div className="text-sm text-gray-600">Gained 5kg muscle</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                "The personalised workout routine combined with the meal plan gave me better results than my previous
                personal trainer. Highly recommend!"
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                  EL
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">Emma L.</div>
                  <div className="text-sm text-gray-600">Improved energy & focus</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                "I feel more energised than ever. The meal plans are easy to follow and the recipes are actually
                delicious. Worth every penny!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-lg sm:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of people who have already started their journey to a healthier, happier life
          </p>
          <a href="#pricing">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Get Your Personalised Plan Now
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Product</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Plans
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link href="/glp1" className="text-gray-400 hover:text-white transition-colors">
                    GLP-1 Support
                  </Link>
                </li>
                <li>
                  <Link href="/samples" className="text-gray-400 hover:text-white transition-colors">
                    Samples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Legal</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-base sm:text-lg">Support</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <a
                    href="mailto:support@sillynutrition.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    support@sillynutrition.com
                  </a>
                </li>
                <li>
                  <a href="mailto:bugs@sillynutrition.com" className="text-gray-400 hover:text-white transition-colors">
                    bugs@sillynutrition.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:business@sillynutrition.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    business@sillynutrition.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; 2025 Silly Nutrition. All rights reserved.</p>
          </div>
        </div>
      </footer>
</div>
)   // <-- close the: return (
}   // <-- close the function

