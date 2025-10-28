"use client"

import { Button } from "@/components/ui/button"
import { Check, Zap, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Choice = "meal" | "workout" | "complete" | null

export function PricingSection() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [choice, setChoice] = useState<Choice>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleContinue = () => {
    if (!choice) return

    const payload = {
      plan_type: "single",
      selected_subplan: choice,
      plan_price: choice === "meal" ? 39 : choice === "workout" ? 29 : choice === "complete" ? 59 : null,
    }

    // Session fallback for refresh
    sessionStorage.setItem("sn:selectedPlan", JSON.stringify(payload))

    // Navigate to tier chooser with URL params
    router.push(`/questionnaire/start?plan=single&sub=${payload.selected_subplan}&price=${payload.plan_price}`)
  }

  const baseRow =
    "relative w-full rounded-xl border-2 border-orange-300 hover:border-orange-400 hover:shadow-[0_0_8px_rgba(249,115,22,0.2)] transition cursor-pointer focus:outline-none " +
    "flex flex-col items-center justify-center text-center " +
    "min-h-[92px] md:min-h-[104px] px-4 py-4"
  const activeRow = "border-[2.5px] border-orange-500 bg-orange-50 shadow-sm"

  const faqs = [
    {
      question: "Why can't I just use ChatGPT to create my own plan?",
      answer: (
        <div className="space-y-4">
          <p>
            You could, but you'd still be missing the most important part: structure, accuracy, and personalisation.
          </p>
          <p>
            ChatGPT gives general suggestions, but it doesn't know how to safely calculate your calories, match your
            preferences, filter for allergies, or format a usable 4-week plan that's actually balanced and measurable.
          </p>
          <p>SillyNutrition is built on top of AI, not just using it.</p>
          <p>
            We've trained our system with nutritionist-approved logic, real meal data, and progressive workout
            structures, so every plan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Follows correct calorie and macro formulas</li>
            <li>Adapts to your cooking time, budget, and allergies</li>
            <li>Includes clear weekly structure and PDF delivery</li>
            <li>Stays consistent and compliant with UK nutritional standards</li>
          </ul>
          <p className="font-semibold">
            In short: ChatGPT gives answers. SillyNutrition gives you a plan that works, fits, and lasts.
          </p>
        </div>
      ),
    },
    {
      question: "How personalized are the plans?",
      answer:
        "Every plan is 100% unique to you. Our AI analyzes your goals, dietary preferences, fitness level, available time, and any restrictions to create a plan that fits your exact lifestyle. No two plans are the same.",
    },
    {
      question: "Can I change my plan if my goals change?",
      answer:
        "With our Essential and Coaching plans, you can request plan updates monthly. If you want to shift from weight loss to muscle gain, or adjust your dietary preferences, we can regenerate your plan to match your new goals.",
    },
    {
      question: "What if I have allergies or dietary restrictions?",
      answer:
        "Our questionnaire captures all your dietary needs, allergies, and restrictions. The AI will only suggest meals and ingredients that are safe and suitable for you. Whether you're vegetarian, vegan, gluten-free, or have specific allergies, we've got you covered.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Yes! Our Single Plans are specifically designed for beginners who want to try us out. The workouts are progressive, starting at your current fitness level, and the meal plans include simple recipes with easy-to-find ingredients. You don't need any prior experience.",
    },
    {
      question: "How quickly will I see results?",
      answer:
        "Most users see noticeable changes within 2-4 weeks when following the plan consistently. However, results vary based on your starting point, goals, and adherence to the plan. Sustainable, healthy progress is always better than quick fixes.",
    },
    {
      question: "What if I don't like my plan?",
      answer:
        "We offer a 14-day money-back guarantee on all plans. If you're not satisfied with your personalized plan, simply contact us within 14 days of purchase for a full refund. No questions asked.",
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-600">Select the perfect plan for your fitness journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {/* Single Plans */}
          <div
            id="single-plans-live"
            data-file="components/pricing-section.tsx"
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 flex flex-col relative mt-8"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                Best For Beginners
              </span>
            </div>

            <div className="p-8 flex-grow flex flex-col pt-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 relative">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Plans</h3>
                <p className="text-center text-gray-700 font-semibold mt-1">Perfect for trying us out!</p>
              </div>

              {choice && (
                <div className="mb-4 text-center">
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4" />
                    {choice === "meal" ? "Meal Plan" : choice === "workout" ? "Workout Plan" : "Complete Package"}{" "}
                    selected
                  </span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <button
                  type="button"
                  onClick={() => setChoice("meal")}
                  className={`${baseRow} ${choice === "meal" ? activeRow : ""}`}
                  aria-pressed={choice === "meal"}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900">Meal Plan Only</div>
                    <div className="flex items-center gap-2 justify-center flex-wrap">
                      <span className="mr-2 line-through decoration-2 md:decoration-4 tracking-wide text-gray-500 md:text-gray-600 text-sm md:text-base">
                        £49
                      </span>
                      <span className="text-[22px] md:text-2xl font-semibold text-orange-600">£39</span>
                      {process.env.NEXT_PUBLIC_FEATURE_LAUNCH_BADGE !== "false" && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1">
                          ⭐ Special launch price
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">Save £10!</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setChoice("workout")}
                  className={`${baseRow} ${choice === "workout" ? activeRow : ""}`}
                  aria-pressed={choice === "workout"}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900">Workout Plan Only</div>
                    <div className="flex items-center gap-2 justify-center flex-wrap">
                      <span className="mr-2 line-through decoration-2 md:decoration-4 tracking-wide text-gray-500 md:text-gray-600 text-sm md:text-base">
                        £39
                      </span>
                      <span className="text-[22px] md:text-2xl font-semibold text-orange-600">£29</span>
                      {process.env.NEXT_PUBLIC_FEATURE_LAUNCH_BADGE !== "false" && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1">
                          ⭐ Special launch price
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">Save £10!</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setChoice("complete")}
                  className={`${baseRow} ${choice === "complete" ? activeRow : ""}`}
                  aria-pressed={choice === "complete"}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900">Complete Package</div>
                    <div className="flex items-center gap-2 justify-center flex-wrap">
                      <span className="mr-2 line-through decoration-2 md:decoration-4 tracking-wide text-gray-500 md:text-gray-600 text-sm md:text-base">
                        £79
                      </span>
                      <span className="text-[22px] md:text-2xl font-semibold text-orange-600">£59</span>
                      {process.env.NEXT_PUBLIC_FEATURE_LAUNCH_BADGE !== "false" && (
                        <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-1">
                          ⭐ Special launch price
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">Save £20!</div>
                  </div>
                </button>
              </div>

              <div className="space-y-3 flex-grow text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Choose: Meal Plan OR Workout Plan</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">7-day personalized plan</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">PDF download + mobile view</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic macro/calorie targets</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">One-time purchase</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email support</span>
                </div>
              </div>
            </div>

            <div className="p-8 mt-auto">
              {choice ? (
                <Button
                  onClick={handleContinue}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-semibold"
                >
                  Continue with{" "}
                  {choice === "meal" ? "Meal Plan" : choice === "workout" ? "Workout Plan" : "Complete Package"}
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full bg-gray-900 text-white py-6 text-lg font-semibold opacity-50 cursor-not-allowed"
                >
                  Select a Plan to Continue
                </Button>
              )}
            </div>
          </div>

          {/* Essential Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-500 flex flex-col relative mt-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 whitespace-nowrap">
                <Zap className="w-4 h-4" />
                Best Value
              </span>
            </div>

            <div className="p-8 flex-grow flex flex-col pt-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 relative">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential Plan</h3>
                <p className="text-gray-600 font-semibold mb-4">Great for getting started</p>
              </div>

              <div className="space-y-3 flex-grow text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">AI-generated 7-day meal plan (refreshed monthly)</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">3 beginner-friendly workouts</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personalised calorie and macro targets</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">PDF downloads plus mobile view</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Monthly plan updates</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email support</span>
                </div>
              </div>
            </div>

            <div className="p-8 mt-auto">
              <Link href="/plan-selection?plan=essential" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-semibold">
                  Start Essential Plan
                </Button>
              </Link>
            </div>
          </div>

          {/* Coaching Plan */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-600 flex flex-col relative mt-8">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 whitespace-nowrap">
                <Star className="w-4 h-4 fill-white" />
                MOST POPULAR
              </span>
            </div>

            <div className="p-8 flex-grow flex flex-col pt-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Coaching Plan</h3>
                <p className="text-gray-600 font-semibold mb-4">Full support & personalization</p>
              </div>

              <div className="space-y-3 flex-grow text-sm">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personalised weekly meal plans</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Shopping lists + macro breakdowns</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">4-5 progressive workouts</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Preference/allergy adjustments</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly plan updates</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority email support (48h response)</span>
                </div>
              </div>
            </div>

            <div className="p-8 mt-auto">
              <Link href="/plan-selection?plan=coaching" className="block">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 text-lg font-semibold">
                  Start Coaching Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers! Here are the most common questions about Silly Nutrition.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-8">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform flex-shrink-0 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                    {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
