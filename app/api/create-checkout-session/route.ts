import { type NextRequest, NextResponse } from "next/server"
import { getPlanConfig, type PlanType } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { planType, email, firstName, questionnaireData, draft_id } = data

    // Get plan configuration
    const planConfig = getPlanConfig(planType as PlanType)

    // Check if we have Stripe keys configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    if (stripeSecretKey) {
      // Production mode - create actual Stripe checkout session
      const stripe = require("stripe")(stripeSecretKey)

      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product: planConfig.productId,
              unit_amount: planConfig.priceAmount,
              recurring: planConfig.isRecurring
                ? {
                    interval: "month",
                  }
                : undefined,
            },
            quantity: 1,
          },
        ],
        mode: planConfig.isRecurring ? "subscription" : "payment",
        success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/questionnaire`,
        metadata: {
          firstName,
          planType,
          email,
          draft_id: draft_id || "",
          questionnaireData: JSON.stringify(questionnaireData),
        },
      })

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      })
    } else {
      // Demo mode - redirect to success page without payment
      console.log("⚠️  Running in DEMO mode - no Stripe keys configured")
      console.log("Add STRIPE_SECRET_KEY to environment variables for live payments")

      const checkoutUrl = `${appUrl}/payment/success?session_id=demo_${Date.now()}&plan=${planType}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&draft_id=${draft_id || ""}`

      return NextResponse.json({
        sessionId: `demo_${Date.now()}`,
        url: checkoutUrl,
        productId: planConfig.productId,
        amount: planConfig.priceAmount,
        demo: true,
      })
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
