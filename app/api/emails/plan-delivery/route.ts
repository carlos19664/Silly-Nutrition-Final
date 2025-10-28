import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send to Zapier webhook for Plan Delivery Email
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/11354546/um6ike0/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        email: data.email,
        planType: data.planType,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!zapierResponse.ok) {
      throw new Error("Failed to trigger Zapier webhook")
    }

    return NextResponse.json({
      success: true,
      message: "Plan delivery email triggered successfully",
    })
  } catch (error) {
    console.error("Error triggering plan delivery email:", error)
    return NextResponse.json({ success: false, message: "Failed to trigger plan delivery email" }, { status: 500 })
  }
}
