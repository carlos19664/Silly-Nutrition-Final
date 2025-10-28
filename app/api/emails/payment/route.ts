import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send to Zapier webhook for Payment Confirmation Email
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        email: data.email,
        planType: data.planType,
        amount: data.amount,
        isLaunchPrice: data.isLaunchPrice,
        transactionId: data.transactionId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!zapierResponse.ok) {
      throw new Error("Failed to trigger Zapier webhook")
    }

    return NextResponse.json({
      success: true,
      message: "Payment confirmation email triggered successfully",
    })
  } catch (error) {
    console.error("Error triggering payment email:", error)
    return NextResponse.json({ success: false, message: "Failed to trigger payment email" }, { status: 500 })
  }
}
