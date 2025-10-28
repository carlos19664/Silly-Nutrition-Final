import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Sparkles } from "lucide-react"

export function ProblemSolutionSection() {
  const problems = [
    {
      title: "Generic meal plans that taste like cardboard",
      description: "Cookie-cutter diets that ignore your preferences and lifestyle",
      icon: X,
    },
    {
      title: "Endless cycle of starting and stopping",
      description: "Motivation fades when plans don't fit your real life",
      icon: X,
    },
    {
      title: "Confusion about what actually works",
      description: "Conflicting advice everywhere, no clear path forward",
      icon: X,
    },
  ]

  const solutions = [
    "Technology that learns and improves with every plan",
    "Instant personalization (no waiting for appointments)",
    "Consistent results without human bias or error",
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sound Familiar?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're not alone. These are the most common frustrations we hear from people trying to get healthy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problems Side */}
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-red-50 rounded-xl border border-red-100">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <X className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Solution Side */}
          <div className="relative">
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold text-gray-900">What if there was a better way?</h3>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Silly Nutrition creates plans that are uniquely YOURS using advanced AI technology. No more guessing,
                  no more generic advice. Just personalized nutrition and fitness that fits your life perfectly.
                </p>

                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{solution}</span>
                    </div>
                  ))}
                </div>

                <Badge className="mt-6 bg-orange-100 text-orange-700 hover:bg-orange-100">Powered by Advanced AI</Badge>
              </CardContent>
            </Card>

            {/* Decorative arrow */}
            <div className="hidden lg:block absolute -left-8 top-1/2 transform -translate-y-1/2">
              <div className="w-16 h-0.5 bg-orange-300"></div>
              <div className="w-0 h-0 border-l-8 border-l-orange-300 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-16 -mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
