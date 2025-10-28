import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    let event

    // Check if we have Stripe configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (stripeSecretKey && webhookSecret && signature) {
      // Production mode - verify the signature
      const stripe = require("stripe")(stripeSecretKey)

      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      } catch (err: any) {
        console.error("⚠️  Webhook signature verification failed:", err.message)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
      }
    } else {
      // Demo mode - just parse the body
      console.log("⚠️  Running webhook in DEMO mode - no signature verification")
      event = JSON.parse(body)
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      // Extract customer data
      const customerEmail = session.customer_email || session.customer_details?.email
      const metadata = session.metadata || {}

      console.log("✅ Payment completed for:", customerEmail)

      const supabase = await createClient()

      try {
        // Check if user exists by email
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id, user_id")
          .eq("email", customerEmail)
          .single()

        let userId = existingProfile?.user_id
        let profileId = existingProfile?.id

        // If no profile exists, create one
        if (!existingProfile) {
          const { data: newProfile, error: profileError } = await supabase
            .from("profiles")
            .insert({
              email: customerEmail,
              first_name: metadata.firstName || "",
              plan_type: metadata.planType || "essential",
              subscription_status: "active",
              stripe_customer_id: session.customer,
            })
            .select()
            .single()

          if (profileError) {
            console.error("Failed to create profile:", profileError)
          } else {
            userId = newProfile.user_id
            profileId = newProfile.id
          }
        } else {
          // Update existing profile with subscription info
          await supabase
            .from("profiles")
            .update({
              plan_type: metadata.planType || "essential",
              subscription_status: "active",
              stripe_customer_id: session.customer,
            })
            .eq("id", profileId)
        }

        // Create order record
        if (profileId) {
          await supabase.from("orders").insert({
            profile_id: profileId,
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            amount: session.amount_total / 100,
            currency: session.currency || "gbp",
            plan_type: metadata.planType || "essential",
            status: "completed",
          })
        }

        console.log("✅ Database records created successfully")
      } catch (dbError) {
        console.error("Failed to create database records:", dbError)
      }

      // Trigger welcome email via Zapier
      try {
        await fetch("https://hooks.zapier.com/hooks/catch/11354546/um38ns9/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: metadata.firstName,
            email: customerEmail,
            planType: metadata.planType,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error("Failed to send welcome email:", error)
      }

      // Trigger payment confirmation email
      try {
        await fetch("https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: metadata.firstName,
            email: customerEmail,
            planType: metadata.planType,
            amount: session.amount_total / 100,
            isLaunchPrice: true,
            transactionId: session.id,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error("Failed to send payment confirmation:", error)
      }

      // Schedule plan delivery email (3 days later in production, immediate in demo)
      try {
        await fetch("https://hooks.zapier.com/hooks/catch/11354546/um6ike0/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: metadata.firstName,
            email: customerEmail,
            planType: metadata.planType,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error("Failed to send plan delivery email:", error)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
