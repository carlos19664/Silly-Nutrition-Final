import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { plan_type, tier, glp_addon, email } = body

    if (!plan_type || !tier) {
      return NextResponse.json({ error: "Missing required fields: plan_type, tier" }, { status: 400 })
    }

    // Get current user (if authenticated)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create draft
    const { data: draft, error } = await supabase
      .from("questionnaire_drafts")
      .insert({
        user_id: user?.id || null,
        email: email || user?.email || null,
        plan_type,
        tier,
        glp_addon: glp_addon || false,
        answers_json: {},
        progress_pct: 0,
        last_step: "start",
        status: "draft",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating draft:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ draft }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/drafts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
