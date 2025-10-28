import { Button } from "@/components/ui/button"
import { ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { SiteLogo } from "@/components/site-logo"

export default function DemoPlans() {
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
              <Button variant="outline" className="border-gray-300 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sample Nutrition & Fitness Plans</h1>
          <p className="text-xl text-gray-600 mb-8">
            See what you'll get with your personalized plan - real examples from our AI
          </p>
        </div>
      </section>

      {/* Sample Meal Plan */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sample Daily Meal Plan</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-4">🍳 Breakfast</h3>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-900">Greek Yogurt Protein Bowl</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 200g Greek yogurt</li>
                    <li>• 30g granola</li>
                    <li>• 100g mixed berries</li>
                    <li>• 1 tbsp honey</li>
                    <li>• 15g almonds</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Macros:</strong> 420 kcal | 28g protein | 48g carbs | 14g fat
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-4">🥗 Lunch</h3>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-900">Grilled Chicken Salad</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 150g grilled chicken breast</li>
                    <li>• Mixed greens (rocket, spinach)</li>
                    <li>• Cherry tomatoes, cucumber</li>
                    <li>• 50g quinoa</li>
                    <li>• Olive oil & lemon dressing</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Macros:</strong> 385 kcal | 42g protein | 28g carbs | 12g fat
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-4">🍽️ Dinner</h3>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-900">Salmon with Sweet Potato</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 150g baked salmon</li>
                    <li>• 200g sweet potato</li>
                    <li>• 150g steamed broccoli</li>
                    <li>• 1 tsp olive oil</li>
                    <li>• Herbs & spices</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Macros:</strong> 485 kcal | 38g protein | 45g carbs | 16g fat
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-4">🍎 Snacks</h3>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-900">Mid-Morning & Afternoon</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• 1 apple with 20g peanut butter</li>
                    <li>• 30g protein bar</li>
                    <li>• Herbal tea</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Macros:</strong> 310 kcal | 12g protein | 38g carbs | 14g fat
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-orange-500">1,600</p>
                  <p className="text-sm text-gray-600">Total Calories</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-500">120g</p>
                  <p className="text-sm text-gray-600">Protein</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-500">159g</p>
                  <p className="text-sm text-gray-600">Carbs</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-500">56g</p>
                  <p className="text-sm text-gray-600">Fats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Workout Plan */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sample Weekly Workout Routine</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-500 mb-4">💪 Monday - Upper Body</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Bench Press: 3 sets × 10 reps</li>
                <li>• Bent-Over Rows: 3 sets × 12 reps</li>
                <li>• Shoulder Press: 3 sets × 10 reps</li>
                <li>• Bicep Curls: 3 sets × 12 reps</li>
                <li>• Tricep Dips: 3 sets × 10 reps</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 45-60 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-500 mb-4">🏃 Tuesday - Cardio & Core</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Running: 30 minutes moderate pace</li>
                <li>• Plank: 3 sets × 60 seconds</li>
                <li>• Russian Twists: 3 sets × 20 reps</li>
                <li>• Leg Raises: 3 sets × 15 reps</li>
                <li>• Mountain Climbers: 3 sets × 20 reps</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 45 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-500 mb-4">🦵 Wednesday - Lower Body</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Squats: 4 sets × 10 reps</li>
                <li>• Deadlifts: 3 sets × 8 reps</li>
                <li>• Lunges: 3 sets × 12 reps each leg</li>
                <li>• Leg Press: 3 sets × 12 reps</li>
                <li>• Calf Raises: 3 sets × 15 reps</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 50-60 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-500 mb-4">🧘 Thursday - Active Recovery</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Yoga Flow: 30 minutes</li>
                <li>• Light Swimming or Walking</li>
                <li>• Stretching Routine: 20 minutes</li>
                <li>• Foam Rolling: 10 minutes</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 40 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-500 mb-4">🏋️ Friday - Full Body</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Push-ups: 3 sets × 15 reps</li>
                <li>• Pull-ups: 3 sets × 8 reps</li>
                <li>• Goblet Squats: 3 sets × 12 reps</li>
                <li>• Kettlebell Swings: 3 sets × 15 reps</li>
                <li>• Burpees: 3 sets × 10 reps</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 45 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-600 mb-4">🚴 Saturday - Cardio</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Cycling: 45 minutes</li>
                <li>• HIIT Intervals: 15 minutes</li>
                <li>• Cool-down Stretching: 10 minutes</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Duration: 60 minutes</p>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-lg text-gray-700">
              <strong>Sunday:</strong> Rest Day - Focus on recovery, hydration, and meal prep
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready for Your Personalized Plan?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a plan tailored specifically to YOUR goals, preferences, and lifestyle
          </p>
          <Link href="/#pricing">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl"
            >
              Build My Custom Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Silly Nutrition. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
