import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { Sparkles, Utensils, Dumbbell, Package } from "lucide-react"

export default function SamplesHub() {
  const samples = [
    {
      slug: "glp1",
      title: "GLP-1 Nutrition Sample",
      description: "Optimized meal plan for GLP-1 medication users with protein-rich, nutrient-dense meals",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      slug: "meal",
      title: "Standard Meal Plan",
      description: "Balanced nutrition plan with variety, flexibility, and realistic portions",
      icon: Utensils,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
    },
    {
      slug: "workout",
      title: "Workout Plan",
      description: "Progressive strength and cardio routine for all fitness levels",
      icon: Dumbbell,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      slug: "complete",
      title: "Complete Package",
      description: "Full nutrition + workout plan for comprehensive health transformation",
      icon: Package,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <SiteLogo size="md" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Silly Nutrition
              </span>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold bg-transparent"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Sample Plans</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Preview what your personalized plan could look like. These are demo samples—your actual plan will be
            tailored specifically to your goals, preferences, and lifestyle.
          </p>
        </div>
      </section>

      {/* Sample Cards Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {samples.map((sample) => {
              const Icon = sample.icon
              return (
                <Link key={sample.slug} href={`/samples/${sample.slug}`}>
                  <div
                    className={`group relative p-8 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-xl bg-gradient-to-br ${sample.bgGradient} cursor-pointer`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sample.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{sample.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{sample.description}</p>
                    <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                      View Sample →
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Personalized Plan?</h2>
          <p className="text-xl text-orange-100 mb-8">
            These samples show what's possible. Your plan will be uniquely tailored to you.
          </p>
          <Link href="/#pricing">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
