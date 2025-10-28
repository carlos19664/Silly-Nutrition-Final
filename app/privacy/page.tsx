"use client"

import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold text-gray-900">Silly Nutrition</span>
            </a>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => (window.location.href = "/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            At Silly Nutrition, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our website and services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
          <p className="text-gray-700 mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Name and email address</li>
            <li>Payment and billing information</li>
            <li>Dietary preferences and restrictions</li>
            <li>Health and fitness goals</li>
            <li>Physical measurements (height, weight, age)</li>
            <li>Lifestyle information (activity level, dietary habits)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 mb-4">When you access our services, we automatically collect:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, features used)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Create and deliver personalized nutrition and fitness plans</li>
            <li>Process payments and manage your account</li>
            <li>Send you plan updates and important service notifications</li>
            <li>Improve our services and develop new features</li>
            <li>Respond to your comments and questions</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>
              <strong>Service Providers:</strong> Third-party companies that help us operate our business (payment
              processors, email services, hosting providers)
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law, court order, or government request
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
            </li>
            <li>
              <strong>With Your Consent:</strong> When you explicitly agree to share information
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication requirements</li>
            <li>Secure payment processing through trusted providers</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights and Choices</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>
              <strong>Access:</strong> Request a copy of your personal information
            </li>
            <li>
              <strong>Correct:</strong> Update or correct inaccurate information
            </li>
            <li>
              <strong>Delete:</strong> Request deletion of your personal information
            </li>
            <li>
              <strong>Object:</strong> Object to processing of your information
            </li>
            <li>
              <strong>Export:</strong> Receive your data in a portable format
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing communications
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar technologies to improve your experience. You can control cookies through your
            browser settings, but some features may not function properly if you disable them.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our services are not intended for children under 16. We do not knowingly collect personal information from
            children. If you believe we have collected information from a child, please contact us immediately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate
            safeguards are in place to protect your information in accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <ul className="list-none space-y-2 text-gray-700 mb-8">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@sillynutrition.com" className="text-orange-500 hover:text-orange-600">
                privacy@sillynutrition.com
              </a>
            </li>
            <li>
              <strong>Support:</strong>{" "}
              <a href="mailto:support@sillynutrition.com" className="text-orange-500 hover:text-orange-600">
                support@sillynutrition.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
