import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Download, Mail, Settings, Target, Utensils } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ManageSubscriptionButton } from "@/components/manage-subscription-button"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  let firstName = "User"
  let planType = "essential"
  let daysActive = 0
  let userEmail = user?.email || ""

  if (user) {
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)

    if (profile) {
      firstName = profile.full_name?.split(" ")[0] || "User"
      userEmail = profile.email
    }

    if (orders && orders.length > 0) {
      planType = orders[0].tier
      const createdDate = new Date(orders[0].created_at)
      const today = new Date()
      daysActive = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    }
  }

  const isCoaching = planType === "coaching" || planType === "advanced"

  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E4E78] mb-2">Welcome back, {firstName}!</h1>
          <p className="text-gray-600">Here's your personalized nutrition and fitness dashboard</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E4E78]">{isCoaching ? "Coaching" : "Essential"}</div>
              <p className="text-xs text-gray-500">{isCoaching ? "Most Popular" : "Great Start"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Days Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E4E78]">{daysActive}</div>
              <p className="text-xs text-gray-500">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Workouts Done</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E4E78]">0</div>
              <p className="text-xs text-gray-500">Start today!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1E4E78]">0%</div>
              <Progress value={0} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#1E4E78]">
                  <Utensils className="w-5 h-5 mr-2" />
                  This Week's Meal Plan
                </CardTitle>
                <CardDescription>Fresh recipes tailored to your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#F1EBDD] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#1E4E78]">Mediterranean Chicken Bowl</h4>
                      <p className="text-sm text-gray-600">Lunch • 450 calories • 35g protein</p>
                    </div>
                    <Link href="/dashboard/recipes/1">
                      <Button size="sm" variant="outline">
                        View Recipe
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#F1EBDD] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#1E4E78]">Quinoa Power Salad</h4>
                      <p className="text-sm text-gray-600">Dinner • 380 calories • 18g protein</p>
                    </div>
                    <Link href="/dashboard/recipes/2">
                      <Button size="sm" variant="outline">
                        View Recipe
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Link href="/api/download/meal-plan-pdf">
                    <Button className="bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78]">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </Link>
                  <Link href="/dashboard/shopping-list">
                    <Button variant="outline">View Shopping List</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-[#1E4E78]">
                  <Target className="w-5 h-5 mr-2" />
                  This Week's Workouts
                </CardTitle>
                <CardDescription>Progressive training designed for your level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#F1EBDD] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#1E4E78]">Upper Body Strength</h4>
                      <p className="text-sm text-gray-600">45 minutes • Intermediate</p>
                    </div>
                    <Link href="/dashboard/workouts/1">
                      <Button size="sm" variant="outline">
                        Start Workout
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#F1EBDD] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#1E4E78]">HIIT Cardio</h4>
                      <p className="text-sm text-gray-600">30 minutes • High intensity</p>
                    </div>
                    <Link href="/dashboard/workouts/2">
                      <Button size="sm" variant="outline">
                        Start Workout
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/api/download/workout-pdf">
                    <Button className="bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78]">
                      <Download className="w-4 h-4 mr-2" />
                      Download Workout PDF
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/settings" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Preferences
                  </Button>
                </Link>
                <Link href="/dashboard/support" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Check-in
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">Your Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{isCoaching ? "Coaching Plan" : "Essential Plan"}</p>
                  <p className="text-sm text-gray-600">£99/month (Launch Price)</p>
                  <p className="text-sm text-gray-600">Next billing: March 15, 2024</p>
                </div>
                <ManageSubscriptionButton />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E4E78]">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team responds within 48 hours to help you succeed.
                </p>
                <Link href="/dashboard/support">
                  <Button className="w-full bg-[#1E4E78] hover:bg-[#1E4E78]/90">Get Support</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
