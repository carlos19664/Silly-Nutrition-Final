"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { ArrowLeft, Mail, Bug, Briefcase, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Have a question? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <Card className="p-6 sm:p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="business">Business Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">General Support</h3>
              <a
                href="mailto:support@sillynutrition.com"
                className="text-orange-500 hover:text-orange-600 font-semibold text-lg block mb-3"
              >
                support@sillynutrition.com
              </a>
              <p className="text-gray-600">We typically respond within 24 hours</p>
            </Card>

            <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bug className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Bug Reports</h3>
              <a
                href="mailto:bugs@sillynutrition.com"
                className="text-orange-500 hover:text-orange-600 font-semibold text-lg block mb-3"
              >
                bugs@sillynutrition.com
              </a>
              <p className="text-gray-600">Spot any issues? Let us know and help us improve!</p>
            </Card>

            <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Business Inquiries</h3>
              <a
                href="mailto:business@sillynutrition.com"
                className="text-orange-500 hover:text-orange-600 font-semibold text-lg block mb-3"
              >
                business@sillynutrition.com
              </a>
              <p className="text-gray-600">Want to work with us? Contact us for partnerships and collaborations!</p>
            </Card>

            <Card className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-900 font-semibold text-lg mb-2">Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
              <p className="text-gray-600">Weekend: Limited support available</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Silly Nutrition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
