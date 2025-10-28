import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send to Zapier webhook for Welcome Email
    const zapierResponse = await fetch("https://hooks.zapier.com/hooks/catch/11354546/um38ns9/", {
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
      message: "Welcome email triggered successfully",
    })
  } catch (error) {
    console.error("Error triggering welcome email:", error)
    return NextResponse.json({ success: false, message: "Failed to trigger welcome email" }, { status: 500 })
  }
}
