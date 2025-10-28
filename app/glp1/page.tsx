"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteLogo } from "@/components/site-logo"
import { ArrowRight, Check, AlertCircle, Pill, Heart, Shield, TrendingDown, Home } from "lucide-react"
import Link from "next/link"

export default function GLP1Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold text-gray-900">Silly Nutrition</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent font-semibold"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/glp1/questionnaire">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  Start Questionnaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-200 mb-6 px-4 py-2">
              🏥 Specialized GLP-1 Nutrition Plans
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Optimize Your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                GLP-1 Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Personalized nutrition plans designed specifically for GLP-1 medications like Ozempic, Wegovy, Mounjaro,
              and Zepbound
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/glp1/questionnaire">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start Your GLP-1 Plan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">5,000+</div>
              <div className="text-gray-600">GLP-1 Users Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
              <div className="text-gray-600">Report Better Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">Medical</div>
              <div className="text-gray-600">Expert-Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why GLP-1 Specific Nutrition */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why GLP-1-Specific Nutrition Matters</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              GLP-1 medications change how your body processes food. Your nutrition plan should adapt.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Maintain Muscle Mass",
                description: "Specialized protein targets to preserve lean muscle while losing weight on GLP-1s",
                color: "bg-red-500",
              },
              {
                icon: Shield,
                title: "Reduce Side Effects",
                description: "Minimize nausea, constipation, and digestive issues with optimized meal timing",
                color: "bg-blue-500",
              },
              {
                icon: TrendingDown,
                title: "Maximize Results",
                description: "Enhance medication effectiveness with properly balanced nutrients and portions",
                color: "bg-green-500",
              },
              {
                icon: Pill,
                title: "Safe Supplementation",
                description: "Know which vitamins and minerals you need while on GLP-1 medications",
                color: "bg-purple-500",
              },
              {
                icon: Check,
                title: "Prevent Deficiencies",
                description: "Combat common nutritional gaps that occur with reduced appetite",
                color: "bg-gradient-to-br from-orange-500 to-orange-600",
              },
              {
                icon: AlertCircle,
                title: "Medication-Aware",
                description: "Plans account for your specific GLP-1 medication and dosage",
                color: "bg-indigo-500",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-16 px-4 bg-yellow-50 border-y-2 border-yellow-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Medical Disclaimer</h3>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  <strong>This is NOT medical advice.</strong> Our nutrition plans are designed to complement your GLP-1
                  medication but do not replace guidance from your healthcare provider.
                </p>
                <p>
                  <strong>Always consult your doctor before:</strong>
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Starting any new diet or nutrition plan while on GLP-1 medications</li>
                  <li>Making significant changes to your eating patterns</li>
                  <li>Adding supplements or vitamins to your routine</li>
                  <li>Experiencing concerning side effects or symptoms</li>
                </ul>
                <p>
                  <strong>Emergency situations:</strong> If you experience severe side effects, dehydration, or
                  concerning symptoms, contact your healthcare provider immediately or seek emergency medical care.
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Our plans are educational tools created by nutrition experts familiar with GLP-1 medications. They are
                  not a substitute for personalized medical care from your prescribing physician or healthcare team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your personalized GLP-1 nutrition plan in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete GLP-1 Questionnaire</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your GLP-1 medication (type, dosage, start date), current side effects, dietary
                restrictions, and health goals.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-orange-300 to-orange-400 z-0"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Creates Your Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Our specialized AI analyzes your GLP-1 medication and creates a nutrition plan optimized for your
                specific needs and timeline.
              </p>
              <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-orange-300 to-orange-400 z-0"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Journey</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your personalized plan with meal timing, portion sizes, and strategies to maximize results and
                minimize side effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">GLP-1 Specialized Plans</h2>
            <p className="text-xl text-gray-600">
              £99/month — includes weekly updates, GLP-1-safe nutrition guidance, and 1-to-1 plan adjustments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Single GLP-1 Plan */}
            <Card className="border-2 border-orange-500 hover:shadow-xl transition-all flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Single GLP-1 Plan</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">£49</div>
                  <p className="text-gray-600">one-time</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "7-day/Monthly GLP-1 optimised meal Plan",
                    "Medication-specific guidance",
                    "Side effect management tips",
                    "Protein preservation strategies",
                    "PDF download",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/glp1/questionnaire">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition-all">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Monthly GLP-1 Coaching */}
            <Card className="border-2 border-orange-500 shadow-xl relative flex flex-col">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 px-6 py-2 text-sm font-bold shadow-lg">
                  ⭐ RECOMMENDED
                </Badge>
              </div>
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly GLP-1 Coaching</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">£99</div>
                  <p className="text-gray-600">/month</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Weekly GLP-1-optimized meal plans",
                    "Dosage adjustment support",
                    "Ongoing side effect management",
                    "Monthly progress tracking",
                    "Priority email support",
                    "Supplement recommendations",
                    "Cancel anytime",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/glp1/questionnaire">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition-all">
                    Start Coaching
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A personalised AI plan specifically designed for GLP-1 users- safely bridge medication and real-world
              nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your GLP-1 Results?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a nutrition plan designed specifically for your GLP-1 medication and maximize your results while
            minimizing side effects.
          </p>
          <Link href="/glp1/questionnaire">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-orange-600 text-lg px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your GLP-1 Questionnaire
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4">
            <SiteLogo size="sm" />
            <span className="text-xl font-bold">Silly Nutrition</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            This service provides nutritional guidance and is not a substitute for medical advice. Always consult your
            healthcare provider regarding your GLP-1 medication and any dietary changes.
          </p>
          <div className="mt-8 text-sm text-gray-400">
            <p>&copy; 2025 Silly Nutrition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
