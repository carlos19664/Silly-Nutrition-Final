"use client"

import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"

export default function TermsPage() {
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
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-lg text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Please read these Terms of Service carefully before using Silly Nutrition's services. By accessing or using
            our services, you agree to be bound by these terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By creating an account or using our services, you agree to these Terms of Service and our Privacy Policy. If
            you do not agree to these terms, you may not access or use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Services</h2>
          <p className="text-gray-700 mb-6">
            Silly Nutrition provides AI-powered personalized nutrition and fitness planning services. Our services
            include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Personalized meal plans based on your preferences and goals</li>
            <li>Customized workout routines</li>
            <li>Shopping lists and nutritional guidance</li>
            <li>PDF downloads and mobile access to your plans</li>
            <li>Optional coaching and support services</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Creation</h3>
          <p className="text-gray-700 mb-4">To use our services, you must create an account. You agree to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be responsible for all activities under your account</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Termination</h3>
          <p className="text-gray-700 mb-6">
            We reserve the right to suspend or terminate your account if you violate these terms or engage in fraudulent
            or abusive behavior.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Payment and Billing</h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Pricing</h3>
          <p className="text-gray-700 mb-6">
            All prices are listed in British Pounds (£) unless otherwise stated. Prices are subject to change, but
            existing customers will maintain their current pricing for the duration of their subscription.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Payment Processing</h3>
          <p className="text-gray-700 mb-6">
            Payments are processed securely through Stripe. By providing payment information, you authorize us to charge
            your payment method for all fees incurred.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Subscriptions</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Subscriptions automatically renew unless cancelled</li>
            <li>You can cancel your subscription at any time</li>
            <li>Cancellations take effect at the end of the current billing period</li>
            <li>No refunds for partial months or unused time after cancellation</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Refund Policy</h2>
          <p className="text-gray-700 mb-6">
            We offer a 30-day money-back guarantee on all plans. Please see our{" "}
            <a href="/refund-policy" className="text-orange-500 hover:text-orange-600">
              Refund Policy
            </a>{" "}
            for full details.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. User Responsibilities</h2>
          <p className="text-gray-700 mb-4">You agree to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Provide accurate health and dietary information</li>
            <li>Consult with healthcare professionals before making significant dietary changes</li>
            <li>Use the services only for lawful purposes</li>
            <li>Not share, resell, or distribute our content without permission</li>
            <li>Not attempt to reverse engineer or copy our AI technology</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Medical Disclaimer</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <p className="text-gray-700 font-semibold mb-2">Important Medical Information</p>
            <p className="text-gray-700">
              Silly Nutrition provides general nutritional guidance and is not a substitute for professional medical
              advice. Always consult with qualified healthcare providers before:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Starting any new diet or exercise program</li>
              <li>Making significant changes to your current routine</li>
              <li>If you have any medical conditions or concerns</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Intellectual Property</h2>
          <p className="text-gray-700 mb-6">
            All content, features, and functionality of our services are owned by Silly Nutrition and protected by
            copyright, trademark, and other intellectual property laws. You may not:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Copy, modify, or distribute our content without permission</li>
            <li>Use our brand name, logo, or trademarks without authorization</li>
            <li>Reproduce or resell our meal plans or workout routines</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            To the maximum extent permitted by law, Silly Nutrition shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use of our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We may modify these terms at any time. We will notify you of any material changes via email or through our
            website. Your continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These terms are governed by the laws of the United Kingdom. Any disputes shall be resolved in the courts of
            England and Wales.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
          <p className="text-gray-700 mb-4">For questions about these Terms of Service, please contact us:</p>
          <ul className="list-none space-y-2 text-gray-700 mb-8">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@sillynutrition.com" className="text-orange-500 hover:text-orange-600">
                legal@sillynutrition.com
              </a>
            </li>
            <li>
              <strong>Support:</strong>{" "}
              <a href="mailto:support@sillynutrition.com" className="text-orange-500 hover:text-orange-600">
                support@sillynutrition.com
              </a>
            </li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <p className="text-sm text-gray-600">
              By using Silly Nutrition, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
