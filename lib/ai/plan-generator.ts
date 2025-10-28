import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface QuestionnaireData {
  age: number
  gender: string
  weight: number
  height: number
  activityLevel: string
  goal: string
  dietaryPreferences: string[]
  allergies: string[]
  mealsPerDay: number
  cookingTime: string
  budget: string
}

export interface GeneratedPlan {
  mealPlan: string
  workoutPlan: string
  calories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
}

export async function generatePersonalizedPlan(
  data: QuestionnaireData,
  planType: "meal" | "workout" | "complete",
): Promise<GeneratedPlan> {
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error("OpenAI API key is not configured")
  }

  // Calculate calorie needs using Mifflin-St Jeor equation
  let bmr: number
  if (data.gender.toLowerCase() === "male") {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
  } else {
    bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161
  }

  // Activity multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  }

  const tdee = bmr * (activityMultipliers[data.activityLevel] || 1.2)

  // Adjust calories based on goal
  let targetCalories = tdee
  if (data.goal === "lose-weight") {
    targetCalories = tdee * 0.8 // 20% deficit
  } else if (data.goal === "gain-muscle") {
    targetCalories = tdee * 1.1 // 10% surplus
  }

  // Calculate macros
  const proteinGrams = data.weight * 2 // 2g per kg bodyweight
  const fatsGrams = (targetCalories * 0.25) / 9 // 25% of calories from fats
  const carbsGrams = (targetCalories - (proteinGrams * 4 + fatsGrams * 9)) / 4

  let mealPlan = ""
  let workoutPlan = ""

  // Generate meal plan if requested
  if (planType === "meal" || planType === "complete") {
    const mealPrompt = `Create a detailed 7-day meal plan for a ${data.age} year old ${data.gender} who weighs ${data.weight}kg and is ${data.height}cm tall.

Target calories: ${Math.round(targetCalories)} per day
Target macros: ${Math.round(proteinGrams)}g protein, ${Math.round(carbsGrams)}g carbs, ${Math.round(fatsGrams)}g fats

Dietary preferences: ${data.dietaryPreferences.join(", ")}
Allergies/restrictions: ${data.allergies.join(", ") || "None"}
Meals per day: ${data.mealsPerDay}
Cooking time: ${data.cookingTime}
Budget: ${data.budget}

Provide a structured meal plan with specific meals, recipes, and a shopping list. Make it practical and easy to follow.`

    const mealResult = await generateText({
      model: openai("gpt-4o"),
      prompt: mealPrompt,
      maxTokens: 3000,
    })

    mealPlan = mealResult.text
  }

  // Generate workout plan if requested
  if (planType === "workout" || planType === "complete") {
    const workoutPrompt = `Create a detailed 4-week progressive workout plan for a ${data.age} year old ${data.gender}.

Activity level: ${data.activityLevel}
Goal: ${data.goal}
Gender: ${data.gender}

Provide a structured workout plan with:
- 3-5 workouts per week
- Exercise descriptions
- Sets, reps, and rest periods
- Progressive overload strategy
- Warm-up and cool-down routines

Make it suitable for their fitness level and progressively challenging.`

    const workoutResult = await generateText({
      model: openai("gpt-4o"),
      prompt: workoutPrompt,
      maxTokens: 2500,
    })

    workoutPlan = workoutResult.text
  }

  return {
    mealPlan,
    workoutPlan,
    calories: Math.round(targetCalories),
    macros: {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fats: Math.round(fatsGrams),
    },
  }
}
