import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Flame, Users } from "lucide-react"
import Link from "next/link"

export default function RecipePage({ params }: { params: { id: string } }) {
  // Demo recipe data - in production, fetch from database based on params.id
  const recipe = {
    id: params.id,
    name: "Mediterranean Chicken Bowl",
    description: "A delicious and nutritious bowl packed with protein and fresh vegetables",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    calories: 450,
    protein: "35g",
    carbs: "42g",
    fat: "12g",
    ingredients: [
      "2 chicken breasts (300g)",
      "1 cup quinoa",
      "2 cups mixed greens",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, sliced",
      "1/4 cup feta cheese",
      "2 tbsp olive oil",
      "1 lemon, juiced",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa according to package instructions and set aside.",
      "Season chicken breasts with salt, pepper, and olive oil.",
      "Heat a pan over medium-high heat and cook chicken for 6-7 minutes per side until cooked through.",
      "Let chicken rest for 5 minutes, then slice.",
      "In a large bowl, combine mixed greens, cucumber, tomatoes, and red onion.",
      "Divide quinoa and salad between two bowls.",
      "Top with sliced chicken and crumbled feta cheese.",
      "Drizzle with lemon juice and remaining olive oil.",
      "Season with additional salt and pepper if desired.",
    ],
    tags: ["High Protein", "Mediterranean", "Gluten-Free"],
  }

  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-3xl text-[#1E4E78]">{recipe.name}</CardTitle>
            <CardDescription className="text-base">{recipe.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-8 p-4 bg-[#F1EBDD] rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Prep Time</p>
                  <p className="font-semibold text-[#1E4E78]">{recipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Cook Time</p>
                  <p className="font-semibold text-[#1E4E78]">{recipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Servings</p>
                  <p className="font-semibold text-[#1E4E78]">{recipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#1E4E78]" />
                <div>
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="font-semibold text-[#1E4E78]">{recipe.calories}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8 p-4 bg-[#F1EBDD] rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-lg font-semibold text-[#1E4E78]">{recipe.protein}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-lg font-semibold text-[#1E4E78]">{recipe.carbs}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-lg font-semibold text-[#1E4E78]">{recipe.fat}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1E4E78] mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F4B728] mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E4E78] mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4B728] text-[#1E4E78] flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <span className="pt-1">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
