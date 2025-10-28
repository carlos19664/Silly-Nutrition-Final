import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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

    const supabase = await createClient()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

    // Try to check OAuth providers (this may not work without proper permissions)
    let googleEnabled = false
    let githubEnabled = false

    try {
      const { data: googleData, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: `${appUrl}/dashboard`,
        },
      })

      googleEnabled = !googleError && !!googleData?.url
    } catch (err) {
      googleEnabled = false
    }

    try {
      const { data: githubData, error: githubError } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          skipBrowserRedirect: true,
          redirectTo: `${appUrl}/dashboard`,
        },
      })

      githubEnabled = !githubError && !!githubData?.url
    } catch (err) {
      githubEnabled = false
    }

    return NextResponse.json({
      googleEnabled,
      githubEnabled,
      expectedCallback: `${supabaseUrl}/auth/v1/callback`,
      redirectUrl: `${appUrl}/dashboard`,
      instructions: {
        google: {
          enabled: googleEnabled,
          steps: googleEnabled
            ? ["Google OAuth is configured"]
            : [
                "1. Go to Supabase Dashboard → Authentication → Providers",
                "2. Enable Google provider",
                "3. Add Google OAuth Client ID and Client Secret from Google Cloud Console",
                `4. Add authorized redirect URI: ${supabaseUrl}/auth/v1/callback`,
                "5. In Google Cloud Console, add the same redirect URI to your OAuth app",
              ],
        },
        github: {
          enabled: githubEnabled,
          steps: githubEnabled
            ? ["GitHub OAuth is configured"]
            : [
                "1. Go to Supabase Dashboard → Authentication → Providers",
                "2. Enable GitHub provider",
                "3. Add GitHub OAuth App Client ID and Client Secret",
                `4. Add authorized callback URL: ${supabaseUrl}/auth/v1/callback`,
                "5. In GitHub OAuth App settings, add the same callback URL",
              ],
        },
      },
    })
  } catch (error: any) {
    console.error("[v0] OAuth verify error (no secrets logged)")
    return NextResponse.json(
      {
        error: "OAuth verification failed",
        message: "An error occurred during OAuth verification",
      },
      { status: 500 },
    )
  }
}
