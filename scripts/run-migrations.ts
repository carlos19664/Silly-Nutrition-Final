import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigrations() {
  const scriptsDir = path.join(process.cwd(), "scripts")
  const sqlFiles = [
    "001_create_profiles_table.sql",
    "002_create_subscriptions_table.sql",
    "003_create_questionnaire_responses_table.sql",
    "004_create_meal_plans_table.sql",
  ]

  console.log("[v0] Starting database migrations...")

  for (const file of sqlFiles) {
    const filePath = path.join(scriptsDir, file)
    console.log(`[v0] Running ${file}...`)

    try {
      const sql = fs.readFileSync(filePath, "utf-8")
      const { error } = await supabase.rpc("exec_sql", { sql_query: sql })

      if (error) {
        console.error(`[v0] Error running ${file}:`, error)
      } else {
        console.log(`[v0] ✓ Successfully ran ${file}`)
      }
    } catch (err) {
      console.error(`[v0] Error reading ${file}:`, err)
    }
  }

  console.log("[v0] Database migrations complete!")
}

runMigrations()
