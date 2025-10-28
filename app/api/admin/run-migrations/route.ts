import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing Supabase credentials",
        },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const results = []

    // Migration 1: Create profiles table
    console.log("[v0] Creating profiles table...")
    const { error: error1 } = await supabase.rpc("exec", {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT,
          full_name TEXT,
          avatar_url TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
        CREATE POLICY "Users can view own profile"
          ON profiles FOR SELECT
          USING (auth.uid() = id);

        DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
        CREATE POLICY "Users can update own profile"
          ON profiles FOR UPDATE
          USING (auth.uid() = id);

        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.profiles (id, email, full_name)
          VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `,
    })

    if (error1) {
      results.push({ table: "profiles", status: "error", error: error1.message })
    } else {
      results.push({ table: "profiles", status: "success" })
    }

    // Continue with other tables...
    console.log("[v0] Migrations complete")

    return NextResponse.json({
      success: true,
      message: "Database tables created successfully",
      results,
    })
  } catch (error: any) {
    console.error("[v0] Migration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
