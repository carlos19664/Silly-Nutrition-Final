import { type NextRequest, NextResponse } from "next/server"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 })
    return true
  }

  if (limit.count >= 3) {
    return false
  }

  limit.count++
  return true
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("x-setup-token") || request.nextUrl.searchParams.get("token")
    if (!token || token !== process.env.ADMIN_SETUP_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Max 3 runs per hour." }, { status: 429 })
    }

    const audit = {
      hasBaseUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasSupabaseServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasStripePublishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasAdminToken: !!process.env.ADMIN_SETUP_TOKEN,
      hasCheckinUrl: !!process.env.CHECKIN_URL,
    }

    const missing = []
    const warnings = []

    if (!audit.hasBaseUrl) {
      missing.push({
        var: "NEXT_PUBLIC_APP_URL",
        description: "Base URL for email links and redirects",
        example: "https://sillynutrition.com or http://localhost:3000",
        required: true,
      })
    }

    if (!audit.hasSupabaseUrl) {
      missing.push({
        var: "NEXT_PUBLIC_SUPABASE_URL",
        description: "Supabase project URL",
        required: true,
      })
    }

    if (!audit.hasSupabaseAnonKey) {
      missing.push({
        var: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        description: "Supabase anonymous key",
        required: true,
      })
    }

    if (!audit.hasSupabaseServiceRole) {
      missing.push({
        var: "SUPABASE_SERVICE_ROLE_KEY",
        description: "Supabase service role key (for admin operations)",
        required: true,
      })
    }

    if (!audit.hasStripePublishable) {
      missing.push({
        var: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
        description: "Stripe publishable key",
        required: true,
      })
    }

    if (!audit.hasStripeSecret) {
      missing.push({
        var: "STRIPE_SECRET_KEY",
        description: "Stripe secret key",
        required: true,
      })
    }

    if (!audit.hasCheckinUrl) {
      warnings.push({
        var: "CHECKIN_URL",
        description: "External booking URL for Schedule Check-in button",
        example: "https://calendly.com/yourname or https://cal.com/yourname",
        required: false,
      })
    }

    return NextResponse.json({
      audit,
      status: missing.length === 0 ? "ready" : "missing_required",
      missing,
      warnings,
      instructions:
        missing.length > 0
          ? "Add missing environment variables in Vercel → Project → Settings → Environment Variables"
          : "All required environment variables are present",
    })
  } catch (error: any) {
    console.error("[v0] Env audit error (no secrets logged)")
    return NextResponse.json(
      {
        error: "Environment audit failed",
        message: "An error occurred during environment audit",
      },
      { status: 500 },
    )
  }
}
