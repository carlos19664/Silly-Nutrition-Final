import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id } = params

    const { answers_json, progress_pct, last_step } = body

    // Get current user (if authenticated)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Build update object
    const updates: any = {
      updated_at: new Date().toISOString(),
    }

    if (answers_json !== undefined) updates.answers_json = answers_json
    if (progress_pct !== undefined) updates.progress_pct = progress_pct
    if (last_step !== undefined) updates.last_step = last_step

    // Update draft (RLS will handle permissions)
    const { data: draft, error } = await supabase
      .from("questionnaire_drafts")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating draft:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!draft) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 })
    }

    return NextResponse.json({ draft }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in PATCH /api/drafts/[id]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
