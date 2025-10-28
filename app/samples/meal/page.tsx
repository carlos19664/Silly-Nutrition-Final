import { Watermark } from "@/components/samples/watermark"
import { SampleRibbon } from "@/components/samples/sample-ribbon"
import { BlurBlock } from "@/components/samples/blur-block"
import { StickySampleBar } from "@/components/samples/sticky-sample-bar"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"

export default function MealSample() {
  return (
    <div className="min-h-screen bg-white relative">
      <Watermark />
      <SampleRibbon />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Standard Meal Plan (Preview)</h1>
          <p className="text-xl text-gray-600">Balanced nutrition • Flexible portions • Realistic for everyday life</p>
        </div>

        {/* Overview */}
        <section className="mb-12 p-8 bg-orange-50 rounded-2xl border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Targets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">2,000</div>
              <div className="text-gray-600">Daily Calories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">150g</div>
              <div className="text-gray-600">Protein</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">220g</div>
              <div className="text-gray-600">Carbs</div>
            </div>
          </div>
        </section>

        {/* Week Preview - Days 1-3 Visible */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Week 1 Preview</h2>

          {/* Day 1 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 1</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                <p className="text-gray-700">Oatmeal (80g) with banana, honey, and walnuts</p>
                <p className="text-sm text-gray-500">Protein: 12g • Calories: 450</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Chicken Caesar salad with whole grain roll</p>
                <p className="text-sm text-gray-500">Protein: 40g • Calories: 600</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Spaghetti with turkey meatballs and marinara sauce</p>
                <p className="text-sm text-gray-500">Protein: 45g • Calories: 700</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Apple with almond butter • Protein bar</p>
                <p className="text-sm text-gray-500">Protein: 18g • Calories: 250</p>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 2</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                <p className="text-gray-700">Scrambled eggs (2) with whole wheat toast and avocado</p>
                <p className="text-sm text-gray-500">Protein: 20g • Calories: 480</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Tuna sandwich on whole grain with side salad</p>
                <p className="text-sm text-gray-500">Protein: 35g • Calories: 550</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Grilled salmon with roasted potatoes and green beans</p>
                <p className="text-sm text-gray-500">Protein: 42g • Calories: 680</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Greek yogurt with berries • Handful of almonds</p>
                <p className="text-sm text-gray-500">Protein: 22g • Calories: 290</p>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 3</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                <p className="text-gray-700">Smoothie bowl with granola, berries, and chia seeds</p>
                <p className="text-sm text-gray-500">Protein: 15g • Calories: 420</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Chicken burrito bowl with rice, beans, and vegetables</p>
                <p className="text-sm text-gray-500">Protein: 38g • Calories: 620</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Beef stir-fry with noodles and mixed vegetables</p>
                <p className="text-sm text-gray-500">Protein: 40g • Calories: 650</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Hummus with carrot sticks • Protein shake</p>
                <p className="text-sm text-gray-500">Protein: 25g • Calories: 310</p>
              </div>
            </div>
          </div>

          {/* Days 4-7 Blurred */}
          <BlurBlock blurred>
            <div className="space-y-8">
              {[4, 5, 6, 7].map((day) => (
                <div key={day} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Day {day}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                      <p className="text-gray-700">Delicious breakfast option</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                      <p className="text-gray-700">Nutritious lunch meal</p>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                      <p className="text-gray-700">Satisfying dinner choice</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BlurBlock>
        </section>

        {/* Substitutions */}
        <section className="mb-12 p-8 bg-blue-50 rounded-2xl border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Easy Substitutions</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              • <strong>Don't like salmon?</strong> Swap for chicken, turkey, or tofu
            </p>
            <p>
              • <strong>Vegetarian?</strong> Replace meat with beans, lentils, or tempeh
            </p>
            <p>
              • <strong>Dairy-free?</strong> Use almond milk, coconut yogurt, or oat milk
            </p>
            <p>
              • <strong>Gluten-free?</strong> Choose rice, quinoa, or gluten-free bread
            </p>
          </div>
        </section>

        {/* Get Your Plan Now CTA section */}
        <section className="mb-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Want to see the full plan?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Get your personalized nutrition plan tailored to your goals.
            </p>
            <a href="/#pricing">
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

      <StickySampleBar sampleSlug="meal" />
    </div>
  )
}
