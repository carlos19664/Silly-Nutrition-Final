import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageCircle, Clock } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F1EBDD] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E4E78] mb-4">We're Here to Help</h1>
          <p className="text-xl text-gray-600">Get the support you need to succeed on your health journey</p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="w-8 h-8 text-[#F4B728] mx-auto mb-2" />
              <CardTitle className="text-[#1E4E78]">Email Support</CardTitle>
              <CardDescription>Get detailed help via email</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">support@sillynutrition.com</p>
              <p className="text-xs text-gray-500">Response within 24-48 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="w-8 h-8 text-[#F4B728] mx-auto mb-2" />
              <CardTitle className="text-[#1E4E78]">Live Chat</CardTitle>
              <CardDescription>Quick answers to simple questions</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78] mb-2">Start Chat</Button>
              <p className="text-xs text-gray-500">Available 9am-6pm GMT</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="w-8 h-8 text-[#F4B728] mx-auto mb-2" />
              <CardTitle className="text-[#1E4E78]">Response Times</CardTitle>
              <CardDescription>When you can expect to hear back</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> 24-48 hours
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Chat:</strong> Immediate
              </p>
              <p className="text-sm text-gray-600">
                <strong>Urgent:</strong> Within 4 hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-[#1E4E78]">Send us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="What can we help you with?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account & Billing</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="plan">Plan & Content</SelectItem>
                    <SelectItem value="refund">Refund Request</SelectItem>
                    <SelectItem value="cancel">Cancel Subscription</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your issue or question in detail..." rows={5} />
              </div>

              <Button className="bg-[#1E4E78] hover:bg-[#1E4E78]/90 w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E4E78]">Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#1E4E78] mb-2">How do I cancel my subscription?</h3>
                <p className="text-gray-600 text-sm">
                  You can cancel anytime from your dashboard under "Manage Subscription" or by emailing us. You'll keep
                  access until your current billing period ends.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E4E78] mb-2">What's your refund policy?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day money-back guarantee. If you're not satisfied within 30 days, we'll refund your
                  payment, no questions asked.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E4E78] mb-2">
                  Can I change my meal plan for dietary restrictions?
                </h3>
                <p className="text-gray-600 text-sm">
                  Coaching Plan members can request changes anytime. Essential Plan members can update preferences in
                  their dashboard for the next monthly plan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E4E78] mb-2">I can't download my PDF plans</h3>
                <p className="text-gray-600 text-sm">
                  Try using a different browser, disabling ad blockers, or clearing your cache. If that doesn't work,
                  email us and we'll send your plans directly.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E4E78] mb-2">How long will launch pricing last?</h3>
                <p className="text-gray-600 text-sm">
                  Launch pricing is available for a limited time. If you sign up during this period, you'll keep the
                  discounted rate as long as you remain subscribed.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="bg-transparent">
                View All FAQs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
