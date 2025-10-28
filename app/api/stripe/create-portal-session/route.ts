import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's Stripe customer ID from profile
    const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    // Create Stripe customer portal session
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = require("stripe")(stripeSecretKey)

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${request.nextUrl.origin}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating portal session:", error)
    return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 })
  }
}
