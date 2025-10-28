import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createDraftToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { draft_id, email } = body

    if (!draft_id || !email) {
      return NextResponse.json({ error: "Missing required fields: draft_id, email" }, { status: 400 })
    }

    const { data: draft, error } = await supabase
      .from("questionnaire_drafts")
      .select("*")
      .eq("id", draft_id)
      .eq("email", email)
      .single()

    if (error || !draft) {
      return NextResponse.json({ error: "Draft not found or unauthorized" }, { status: 404 })
    }

    // Update email if not set
    if (!draft.email) {
      await supabase.from("questionnaire_drafts").update({ email }).eq("id", draft_id)
    }

    // Create JWT token
    const token = await createDraftToken({
      draftId: draft.id,
      email,
    })

    // Create resume URL
    const resumeUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/questionnaire/resume?token=${token}`

    const summarySnapshot = draft.summary_snapshot_json as any
    let emailBody = `
You can return to your saved questionnaire anytime using the button below:

Resume My Plan: ${resumeUrl}
`

    // Add summary section if available
    if (summarySnapshot?.plan_summary) {
      const { plan_type, tier, price, highlights } = summarySnapshot.plan_summary

      emailBody += `

--- Your Saved Plan Summary ---
Plan: ${plan_type.charAt(0).toUpperCase() + plan_type.slice(1)} (${tier.charAt(0).toUpperCase() + tier.slice(1)})
Price: £${price}
Highlights:
${highlights.map((h: string) => `• ${h}`).join("\n")}

Thanks for using Silly Nutrition!
Team SillyNutrition
`
    }

    // TODO: Send email via your email service (Zapier, SendGrid, etc.)
    // For now, just log the email content
    console.log("[v0] Resume email content:", emailBody)
    console.log("[v0] Resume URL:", resumeUrl)

    return NextResponse.json(
      {
        success: true,
        message: "Resume link sent to email",
        resumeUrl, // Remove this in production
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error in POST /api/drafts/send-resume:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
