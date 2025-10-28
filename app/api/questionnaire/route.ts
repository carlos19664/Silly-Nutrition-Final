import { type NextRequest, NextResponse } from "next/server"
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

    // Mock plan generation for demo purposes
    // In production, this would connect to your AI service
    const mockPlan = {
      id: `plan_${Date.now()}`,
      userId: user.id,
      planType: body.planType,
      preferences: body,
      generatedPlan: {
        title: `Custom ${body.planType} Plan for ${body.name}`,
        description: `Personalized plan based on your ${body.goal} goal`,
        meals: [
          {
            name: "Breakfast",
            items: ["Oatmeal with berries", "Greek yogurt", "Green tea"],
            calories: 450,
          },
          {
            name: "Lunch",
            items: ["Grilled chicken salad", "Quinoa", "Olive oil dressing"],
            calories: 550,
          },
          {
            name: "Dinner",
            items: ["Salmon", "Roasted vegetables", "Brown rice"],
            calories: 600,
          },
        ],
        totalCalories: 1600,
        macros: {
          protein: "120g",
          carbs: "180g",
          fats: "50g",
        },
      },
      createdAt: new Date().toISOString(),
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Plan generated successfully",
      plan: mockPlan,
    })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate plan. Please try again.",
      },
      { status: 500 },
    )
  }
}
