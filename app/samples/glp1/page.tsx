import { Watermark } from "@/components/samples/watermark"
import { SampleRibbon } from "@/components/samples/sample-ribbon"
import { BlurBlock } from "@/components/samples/blur-block"
import { StickySampleBar } from "@/components/samples/sticky-sample-bar"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"

export default function GLP1Sample() {
  return (
    <div className="min-h-screen bg-white relative">
      <Watermark />
      <SampleRibbon />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">GLP-1 Nutrition Plan (Preview)</h1>
          <p className="text-xl text-gray-600">Optimized for GLP-1 medication users • High protein • Nutrient-dense</p>
        </div>

        {/* Overview */}
        <section className="mb-12 p-8 bg-purple-50 rounded-2xl border border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Targets</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">1,800</div>
              <div className="text-gray-600">Daily Calories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">135g</div>
              <div className="text-gray-600">Protein</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-1">60g</div>
              <div className="text-gray-600">Fat</div>
            </div>
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">GLP-1 Nutrition Guidelines</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-gray-700">
                <strong>Prioritize protein:</strong> 30-40g per meal to preserve muscle mass
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-gray-700">
                <strong>Eat slowly:</strong> Take 20-30 minutes per meal to avoid nausea
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-gray-700">
                <strong>Stay hydrated:</strong> Sip water between meals, not during
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-gray-700">
                <strong>Avoid trigger foods:</strong> Limit high-fat, fried, and very sweet foods
              </p>
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
                <p className="text-gray-700">Greek yogurt (200g) with berries (100g) and almonds (20g)</p>
                <p className="text-sm text-gray-500">Protein: 25g • Calories: 350</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Grilled chicken breast (150g) with quinoa (100g) and roasted vegetables</p>
                <p className="text-sm text-gray-500">Protein: 45g • Calories: 550</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Baked salmon (150g) with sweet potato (150g) and steamed broccoli</p>
                <p className="text-sm text-gray-500">Protein: 40g • Calories: 500</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Protein shake (30g protein) • Apple with peanut butter (15g)</p>
                <p className="text-sm text-gray-500">Protein: 35g • Calories: 400</p>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 2</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                <p className="text-gray-700">Scrambled eggs (3 eggs) with spinach and whole grain toast</p>
                <p className="text-sm text-gray-500">Protein: 28g • Calories: 380</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Turkey and avocado wrap with mixed greens</p>
                <p className="text-sm text-gray-500">Protein: 35g • Calories: 520</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Lean beef stir-fry (150g) with brown rice (100g) and vegetables</p>
                <p className="text-sm text-gray-500">Protein: 42g • Calories: 550</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Cottage cheese (150g) with cucumber • Protein bar</p>
                <p className="text-sm text-gray-500">Protein: 30g • Calories: 350</p>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day 3</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                <p className="text-gray-700">Protein smoothie with banana, spinach, and protein powder</p>
                <p className="text-sm text-gray-500">Protein: 32g • Calories: 400</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                <p className="text-gray-700">Tuna salad (150g) with mixed greens and olive oil dressing</p>
                <p className="text-sm text-gray-500">Protein: 38g • Calories: 480</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Dinner</div>
                <p className="text-gray-700">Grilled chicken thighs (150g) with roasted Brussels sprouts and quinoa</p>
                <p className="text-sm text-gray-500">Protein: 40g • Calories: 520</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Snacks</div>
                <p className="text-gray-700">Hard-boiled eggs (2) • Greek yogurt (150g)</p>
                <p className="text-sm text-gray-500">Protein: 28g • Calories: 400</p>
              </div>
            </div>
          </div>

          {/* Days 4-7 Blurred */}
          <BlurBlock blurred>
            <div className="space-y-8">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Day 4</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                    <p className="text-gray-700">Oatmeal with protein powder and berries</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Lunch</div>
                    <p className="text-gray-700">Grilled shrimp with zucchini noodles</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Day 5</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                    <p className="text-gray-700">Egg white omelet with vegetables</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Day 6</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                    <p className="text-gray-700">Protein pancakes with sugar-free syrup</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Day 7</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Breakfast</div>
                    <p className="text-gray-700">Greek yogurt parfait with granola</p>
                  </div>
                </div>
              </div>
            </div>
          </BlurBlock>
        </section>

        {/* Shopping List Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Week 1 Shopping List (Partial)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Proteins</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Chicken breast (1kg)</li>
                <li>• Salmon fillets (500g)</li>
                <li>• Eggs (18 count)</li>
                <li>• Greek yogurt (1kg)</li>
                <li>• Protein powder (1 tub)</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Vegetables</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Broccoli (500g)</li>
                <li>• Spinach (300g)</li>
                <li>• Mixed salad greens (400g)</li>
                <li>• Bell peppers (4)</li>
                <li>• Brussels sprouts (400g)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Get Your Plan Now CTA section */}
        <section className="mb-12">
          <div className="p-8 md:p-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 text-center">
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

      <StickySampleBar sampleSlug="glp1" />
    </div>
  )
}
