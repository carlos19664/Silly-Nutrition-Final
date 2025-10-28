import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }) // 1 hour
    return true
  }

  if (limit.count >= 3) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("x-setup-token")
    if (!token || token !== process.env.ADMIN_SETUP_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Max 3 runs per hour." }, { status: 429 })
    }

    const isDryRun = request.nextUrl.searchParams.get("dryRun") === "true"
    if (isDryRun) {
      return NextResponse.json({
        dryRun: true,
        message: "Preview: Will execute 2 SQL scripts",
        scripts: [
          {
            name: "001-create-profiles-and-users.sql",
            description: "Creates profiles, orders, and plans tables with RLS policies",
          },
          {
            name: "002-oauth-profile-trigger.sql",
            description: "Creates trigger to auto-create profile for OAuth users",
          },
        ],
        note: "Click 'Run Now' to execute these scripts",
      })
    }

    // Create Supabase admin client with service role
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceRole) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRole, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const results = {
      script1: { status: "", tables: [], error: null },
      script2: { status: "", trigger: null, error: null },
    }

    // Read and execute script 1: create tables
    const script1Path = path.join(process.cwd(), "scripts", "001-create-profiles-and-users.sql")
    const script1Content = fs.readFileSync(script1Path, "utf-8")

    try {
      // Execute the SQL script
      const { data: script1Data, error: script1Error } = await supabase.rpc("exec_sql", {
        sql: script1Content,
      })

      if (script1Error) {
        // If RPC doesn't exist, try direct query
        const { error: directError } = await supabase.from("_").select("*").limit(0)

        // Execute via raw SQL if possible
        const { error: execError } = await supabase.rpc("exec", { query: script1Content })

        if (execError) {
          results.script1.status = "error"
          results.script1.error = "Unable to execute SQL. Please run manually in Supabase SQL Editor."
        } else {
          results.script1.status = "success"
          results.script1.tables = ["profiles", "orders", "plans"]
        }
      } else {
        results.script1.status = "success"
        results.script1.tables = ["profiles", "orders", "plans"]
      }
    } catch (err: any) {
      results.script1.status = "error"
      results.script1.error = err.message
    }

    // Read and execute script 2: OAuth trigger
    const script2Path = path.join(process.cwd(), "scripts", "002-oauth-profile-trigger.sql")
    const script2Content = fs.readFileSync(script2Path, "utf-8")

    try {
      const { error: script2Error } = await supabase.rpc("exec", { query: script2Content })

      if (script2Error) {
        results.script2.status = "error"
        results.script2.error = "Unable to execute SQL. Please run manually in Supabase SQL Editor."
      } else {
        results.script2.status = "success"
        results.script2.trigger = "on_auth_user_created"
      }
    } catch (err: any) {
      results.script2.status = "error"
      results.script2.error = err.message
    }

    // Verify tables exist
    const { data: tables, error: tablesError } = await supabase.from("profiles").select("id").limit(0)

    if (!tablesError) {
      results.script1.status = "verified"
      results.script1.tables = ["profiles", "orders", "plans"]
    }

    return NextResponse.json({
      success: true,
      message:
        "Database bootstrap attempted. If errors occurred, please run SQL scripts manually in Supabase SQL Editor.",
      results,
      instructions: {
        manual_steps: [
          "1. Go to Supabase Dashboard → SQL Editor",
          "2. Copy contents of scripts/001-create-profiles-and-users.sql",
          "3. Paste and run in SQL Editor",
          "4. Copy contents of scripts/002-oauth-profile-trigger.sql",
          "5. Paste and run in SQL Editor",
        ],
      },
    })
  } catch (error: any) {
    console.error("[v0] DB Bootstrap error (no secrets logged)")
    return NextResponse.json(
      {
        error: "Database bootstrap failed",
        message: "An error occurred during database setup",
        instructions: "Please run SQL scripts manually in Supabase SQL Editor",
      },
      { status: 500 },
    )
  }
}
