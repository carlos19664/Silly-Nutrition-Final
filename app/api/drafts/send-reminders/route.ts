import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createDraftToken } from "@/lib/jwt"
import { getReminderEmail1h } from "@/lib/email-templates/reminder-1h"
import { getReminderEmail24h } from "@/lib/email-templates/reminder-24h"
import { getReminderEmail3d } from "@/lib/email-templates/reminder-3d"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

    const { data: drafts, error } = await supabase
      .from("questionnaire_drafts")
      .select("*")
      .eq("status", "draft")
      .eq("consent_reminders", true)
      .not("email", "is", null)
      .lt("reminders_sent", 3)
      .or(
        `and(updated_at.lte.${oneHourAgo.toISOString()},reminders_sent.eq.0),` +
          `and(updated_at.lte.${oneDayAgo.toISOString()},reminders_sent.eq.1),` +
          `and(updated_at.lte.${threeDaysAgo.toISOString()},reminders_sent.eq.2)`,
      )

    if (error) {
      console.error("[v0] Error fetching drafts for reminders:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const results = []

    for (const draft of drafts || []) {
      const token = await createDraftToken({
        draftId: draft.id,
        email: draft.email,
      })

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      const resumeLink = `${siteUrl}/questionnaire/resume?token=${token}`
      const unsubscribeLink = `${siteUrl}/api/drafts/delete?token=${token}`

      const firstName = draft.email.split("@")[0]

      let emailTemplate
      if (draft.reminders_sent === 0) {
        emailTemplate = getReminderEmail1h({
          firstName,
          progressPct: draft.progress_pct || 0,
          resumeLink,
          unsubscribeLink,
        })
      } else if (draft.reminders_sent === 1) {
        emailTemplate = getReminderEmail24h({
          firstName,
          progressPct: draft.progress_pct || 0,
          resumeLink,
          unsubscribeLink,
        })
      } else {
        emailTemplate = getReminderEmail3d({
          firstName,
          progressPct: draft.progress_pct || 0,
          resumeLink,
          unsubscribeLink,
        })
      }

      if (process.env.RESEND_API_KEY) {
        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "hello@sillynutrition.co",
              to: draft.email,
              subject: emailTemplate.subject,
              html: emailTemplate.html,
            }),
          })

          if (!response.ok) {
            console.error("[v0] Failed to send email:", await response.text())
          }
        } catch (emailError) {
          console.error("[v0] Error sending email:", emailError)
        }
      } else {
        console.log("[v0] RESEND_API_KEY not set, skipping email send")
        console.log("[v0] Would send:", emailTemplate.subject, "to", draft.email)
      }

      await supabase
        .from("questionnaire_drafts")
        .update({
          reminders_sent: draft.reminders_sent + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", draft.id)

      results.push({
        id: draft.id,
        email: draft.email,
        reminderType: draft.reminders_sent === 0 ? "1h" : draft.reminders_sent === 1 ? "24h" : "3d",
      })
    }

    return NextResponse.json(
      {
        success: true,
        reminders_sent: results.length,
        drafts: results,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error in POST /api/drafts/send-reminders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
