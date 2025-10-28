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
    const { questionnaireData } = body

    if (!questionnaireData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("questionnaire_responses")
      .insert({
        user_id: user.id,
        responses: questionnaireData,
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving questionnaire:", error)
      return NextResponse.json({ error: "Failed to save questionnaire" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error in questionnaire save:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
