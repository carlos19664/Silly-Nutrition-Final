import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E4E78]">Profile Settings</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="sarah@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" type="tel" placeholder="+44 7700 900000" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E4E78]">Dietary Preferences</CardTitle>
              <CardDescription>Help us personalize your meal plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies & Restrictions</Label>
                <Textarea id="allergies" placeholder="e.g., Dairy, nuts, shellfish..." className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dislikes">Foods You Dislike</Label>
                <Textarea id="dislikes" placeholder="e.g., Mushrooms, olives, cilantro..." className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Fitness Goals</Label>
                <Textarea
                  id="goals"
                  placeholder="e.g., Lose 10 pounds, build muscle, improve energy..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#1E4E78]">Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to hear from us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Plan Updates</Label>
                  <p className="text-sm text-gray-600">Get notified when your new plan is ready</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Workout Reminders</Label>
                  <p className="text-sm text-gray-600">Daily reminders to complete your workouts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tips & Motivation</Label>
                  <p className="text-sm text-gray-600">Helpful tips and motivational content</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-gray-600">Updates about new features and offers</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#1E4E78] hover:bg-[#1E4E78]/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
