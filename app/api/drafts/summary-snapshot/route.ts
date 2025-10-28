import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { draft_id } = body

    if (!draft_id) {
      return NextResponse.json({ error: "Missing required field: draft_id" }, { status: 400 })
    }

    // Get draft
    const { data: draft, error } = await supabase.from("questionnaire_drafts").select("*").eq("id", draft_id).single()

    if (error || !draft) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    // Parse answers to build summary
    const answers = draft.answers_json || {}

    // Extract plan details from localStorage (passed in request or from draft)
    const planType = answers.plan_type || "meal"
    const tier = answers.tier || "standard"

    // Calculate price
    let price = 39
    if (planType === "meal") price = tier === "standard" ? 39 : 49
    if (planType === "workout") price = tier === "standard" ? 29 : 39
    if (planType === "both") price = tier === "standard" ? 59 : 79

    // Build highlights from answers
    const highlights: string[] = []

    // Add relevant highlights based on answers
    if (answers.fitness_level) highlights.push(`${answers.fitness_level} level`)
    if (answers.workout_location) highlights.push(answers.workout_location)
    if (answers.workout_frequency) highlights.push(`${answers.workout_frequency} per week`)
    if (answers.dietary_preference) highlights.push(answers.dietary_preference)
    if (answers.meal_prep_time) highlights.push(`${answers.meal_prep_time} prep time`)

    // Limit to 4 highlights
    const finalHighlights = highlights.slice(0, 4)

    // Build summary snapshot
    const summarySnapshot = {
      plan_summary: {
        plan_type: planType,
        tier: tier,
        price: price,
        highlights:
          finalHighlights.length > 0
            ? finalHighlights
            : ["Personalized plan", "Expert guidance", "Flexible approach", "Results-driven"],
      },
    }

    // Save to database
    const { error: updateError } = await supabase
      .from("questionnaire_drafts")
      .update({ summary_snapshot_json: summarySnapshot })
      .eq("id", draft_id)

    if (updateError) {
      console.error("[v0] Error updating draft with summary:", updateError)
      return NextResponse.json({ error: "Failed to save summary" }, { status: 500 })
    }

    return NextResponse.json({ success: true, summary: summarySnapshot }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in POST /api/drafts/summary-snapshot:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
