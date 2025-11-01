"use client";

// marker test 1
import Link from "next/link";
import { Button } from "components/ui/button";
import SiteLogo from "components/site-logo";
import { ArrowRight, Users, Target, Heart, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold">Silly Nutrition</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <Link href="/#pricing">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Pricing
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  About
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Contact
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Sign Up Free</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforming Health Through
            <span className="text-orange-600"> Personalized Nutrition</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We believe everyone deserves access to expert nutrition guidance. Our AI-powered platform makes personalized
            meal planning affordable and accessible.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At Silly Nutrition, we're on a mission to democratize personalized nutrition. We combine cutting-edge AI
                technology with nutritional science to create custom meal plans that fit your lifestyle, budget, and
                goals.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                No more one-size-fits-all diets. No more expensive nutritionists. Just science-backed, personalized
                nutrition guidance at a fraction of the cost.
              </p>
              <Link href="/sign-up">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white" size="lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-xl">
                <Users className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50K+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <Target className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">1M+</h3>
                <p className="text-gray-600">Plans Created</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <Heart className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <Award className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8/5</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalization First</h3>
              <p className="text-gray-600">
                Every person is unique. We create plans tailored to your specific needs, preferences, and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Science-Backed</h3>
              <p className="text-gray-600">
                Our recommendations are based on peer-reviewed research and nutritional science.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessible to All</h3>
              <p className="text-gray-600">
                Premium nutrition guidance shouldn't be a luxury. We make it affordable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built by Nutrition Experts</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team combines registered dietitians, AI engineers, and fitness professionals to create the most advanced
            nutrition platform available.
          </p>
          <p className="text-lg text-gray-600">
            We're constantly improving our algorithms and adding new features based on the latest nutritional research
            and user feedback.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of people achieving their health goals with personalized nutrition
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SiteLogo size="sm" />
                <span className="font-bold text-lg">Silly Nutrition</span>
              </div>
              <p className="text-gray-400 text-sm">Personalized nutrition plans powered by AI</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Silly Nutrition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
