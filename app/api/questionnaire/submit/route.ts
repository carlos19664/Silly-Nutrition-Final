import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { planType, tier, includeGLP1, responses } = body

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Save questionnaire response to database
    const { data, error } = await supabase
      .from("questionnaire_responses")
      .insert({
        user_id: user.id,
        plan_type: planType,
        tier,
        include_glp1: includeGLP1,
        responses,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error saving questionnaire:", error)
      return NextResponse.json({ error: "Failed to save questionnaire" }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error("[v0] Error in questionnaire submit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
