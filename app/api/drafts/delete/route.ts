import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { draft_id, email } = body

    if (!draft_id) {
      return NextResponse.json({ error: "Missing required field: draft_id" }, { status: 400 })
    }

    // Get current user (if authenticated)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Delete draft (RLS will handle permissions)
    // For anonymous users, we verify email matches
    let query = supabase.from("questionnaire_drafts").delete().eq("id", draft_id)

    if (!user && email) {
      query = query.eq("email", email)
    }

    const { error } = await query

    if (error) {
      console.error("[v0] Error deleting draft:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Draft deleted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error in POST /api/drafts/delete:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
