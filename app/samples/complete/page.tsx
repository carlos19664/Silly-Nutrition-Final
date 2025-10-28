import { Watermark } from "@/components/samples/watermark"
import { SampleRibbon } from "@/components/samples/sample-ribbon"
import { BlurBlock } from "@/components/samples/blur-block"
import { StickySampleBar } from "@/components/samples/sticky-sample-bar"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"

export default function CompleteSample() {
  return (
    <div className="min-h-screen bg-white relative">
      <Watermark />
      <SampleRibbon />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Complete Package (Preview)</h1>
          <p className="text-xl text-gray-600">Full nutrition + workout plan • Comprehensive health transformation</p>
        </div>

        {/* Overview */}
        <section className="mb-12 p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Package Includes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-green-600 mb-3">Nutrition Plan</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 7-day meal plans with recipes</li>
                <li>• Macro-balanced meals</li>
                <li>• Shopping lists</li>
                <li>• Meal prep guidance</li>
                <li>• Substitution options</li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Workout Plan</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 4-day training split</li>
                <li>• Progressive overload</li>
                <li>• Video demonstrations</li>
                <li>• Form cues & tips</li>
                <li>• Recovery protocols</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Day 1 Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Day 1 Example</h2>

          <div className="mb-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition - Day 1</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast (7:00 AM)</div>
                <p className="text-gray-700">Oatmeal with berries, almonds, and protein powder</p>
                <p className="text-sm text-gray-500">Protein: 25g • Calories: 450</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch (12:30 PM)</div>
                <p className="text-gray-700">Grilled chicken salad with quinoa and avocado</p>
                <p className="text-sm text-gray-500">Protein: 40g • Calories: 600</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner (6:30 PM)</div>
                <p className="text-gray-700">Baked salmon with sweet potato and broccoli</p>
                <p className="text-sm text-gray-500">Protein: 42g • Calories: 650</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Greek yogurt • Apple with peanut butter</p>
                <p className="text-sm text-gray-500">Protein: 20g • Calories: 300</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Workout - Day 1: Upper Body</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Timing</div>
                <p className="text-gray-700">Morning (8:00 AM) or Evening (5:00 PM) - 60 minutes</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Exercises</div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bench press: 4 sets × 8-10 reps</li>
                  <li>• Bent-over rows: 4 sets × 10 reps</li>
                  <li>• Overhead press: 3 sets × 10 reps</li>
                  <li>• Pull-ups: 3 sets × max reps</li>
                  <li>• Bicep curls: 3 sets × 12 reps</li>
                  <li>• Tricep extensions: 3 sets × 12 reps</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Post-Workout</div>
                <p className="text-gray-700">Protein shake within 30 minutes + stretching</p>
              </div>
            </div>
          </div>
        </section>

        {/* Days 2-3 Visible */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Days 2-3 Preview</h2>

          <div className="mb-8 space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Day 2: Lower Body + Nutrition</h3>
              <p className="text-gray-700 mb-2">
                <strong>Workout:</strong> Squats, lunges, leg press, hamstring curls
              </p>
              <p className="text-gray-700">
                <strong>Meals:</strong> High-carb day to fuel leg training
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Day 3: Active Recovery + Nutrition</h3>
              <p className="text-gray-700 mb-2">
                <strong>Activity:</strong> Light cardio, yoga, or swimming
              </p>
              <p className="text-gray-700">
                <strong>Meals:</strong> Moderate calories, focus on recovery foods
              </p>
            </div>
          </div>

          {/* Days 4-7 Blurred */}
          <BlurBlock blurred>
            <div className="space-y-6">
              {[4, 5, 6, 7].map((day) => (
                <div key={day} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Day {day}: Full Program</h3>
                  <p className="text-gray-700">Complete workout and nutrition plan...</p>
                </div>
              ))}
            </div>
          </BlurBlock>
        </section>

        {/* Integration Tips */}
        <section className="mb-12 p-8 bg-purple-50 rounded-2xl border border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition + Workout Integration</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              • <strong>Pre-workout:</strong> Eat 1-2 hours before training (carbs + protein)
            </p>
            <p>
              • <strong>Post-workout:</strong> Protein shake + meal within 2 hours
            </p>
            <p>
              • <strong>Rest days:</strong> Slightly lower calories, focus on recovery
            </p>
            <p>
              • <strong>Hydration:</strong> Drink extra water on training days
            </p>
            <p>
              • <strong>Sleep:</strong> Aim for 7-9 hours for optimal recovery
            </p>
          </div>
        </section>

        {/* Get Your Plan Now CTA section */}
        <section className="mb-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Want to see the full plan?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Get your personalized nutrition plan tailored to your goals.
            </p>
            <a href="/glp1">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Your Plan Now
              </Button>
            </a>
          </div>
        </section>
      </div>

      <StickySampleBar sampleSlug="complete" />
    </div>
  )
}
