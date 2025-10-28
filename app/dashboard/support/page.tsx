import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E4E78] flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Contact Support
                </CardTitle>
                <CardDescription>We typically respond within 48 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meal-plan">Meal Plan Question</SelectItem>
                        <SelectItem value="workout">Workout Question</SelectItem>
                        <SelectItem value="billing">Billing & Subscription</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us how we can help..." className="min-h-[200px]" />
                  </div>

                  <Button className="w-full bg-[#1E4E78] hover:bg-[#1E4E78]/90">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#1E4E78]">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#1E4E78] mb-2">Common Questions</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="#" className="text-blue-600 hover:underline">
                        How do I update my meal preferences?
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-blue-600 hover:underline">
                        Can I swap recipes in my plan?
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-blue-600 hover:underline">
                        How do I cancel my subscription?
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-blue-600 hover:underline">
                        What equipment do I need for workouts?
                      </Link>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#1E4E78] flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us Directly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">For urgent matters, you can reach us at:</p>
                <a href="mailto:support@sillynutrition.com" className="text-blue-600 hover:underline font-semibold">
                  support@sillynutrition.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-[#F1EBDD]">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-[#1E4E78] mb-2">Response Time</h4>
                <p className="text-sm text-gray-700">
                  We aim to respond to all inquiries within 48 hours during business days. For billing issues, we
                  typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
