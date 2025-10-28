import { type NextRequest, NextResponse } from "next/server"
import { generatePersonalizedPlan } from "@/lib/ai/plan-generator"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { questionnaireData, planType } = body

    if (!questionnaireData || !planType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate the personalized plan
    const plan = await generatePersonalizedPlan(questionnaireData, planType)

    try {
      const { error: insertError } = await supabase.from("meal_plans").insert({
        user_id: user.id,
        plan_type: planType,
        meal_plan: plan.mealPlan,
        workout_plan: plan.workoutPlan,
        calories: plan.calories,
        macros: plan.macros,
        questionnaire_data: questionnaireData,
      })

      if (insertError) {
        console.error("Error saving plan to database:", insertError)
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue even if database save fails
    }

    return NextResponse.json({ plan })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json({ error: "Failed to generate plan" }, { status: 500 })
  }
}
