# Local Development Setup

## Prerequisites
- Node.js 18+ installed
- A Supabase account and project
- A Stripe account (test mode)

## Step 1: Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd silly-nutrition-landing
npm install
\`\`\`

## Step 2: Set Up Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use existing)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to **Settings** → **API** → **JWT Settings**
   - Copy **JWT Secret** → `SUPABASE_JWT_SECRET`

## Step 3: Set Up Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Go to **Developers** → **API Keys**
4. Copy these values:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
5. Go to **Developers** → **Webhooks**
6. Click **Add endpoint** for local testing:
   - Endpoint URL: `http://localhost:3000/api/webhook/stripe`
   - Events to send: `checkout.session.completed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

## Step 4: Create .env.local File

Copy `.env.example` to `.env.local`:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and fill in all the values from Steps 2 and 3.

**Generate Admin Token:**
\`\`\`bash
openssl rand -hex 32
\`\`\`
Add this to `ADMIN_SETUP_TOKEN` in `.env.local`

## Step 5: Set Up Database

1. Go to Supabase Dashboard → **SQL Editor**
2. Run `scripts/001-create-profiles-and-users.sql` (creates tables)
3. Run `scripts/002-oauth-profile-trigger.sql` (creates OAuth trigger)

## Step 6: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Test Admin Checklist (Optional)

Visit: `http://localhost:3000/admin/checklist?token=YOUR_ADMIN_SETUP_TOKEN`

Run the verification steps to ensure everything is configured correctly.

## Common Issues

### "Import Error - Failed to load @supabase/supabase-js"
- Make sure you've run `npm install`
- Check that `.env.local` exists with all Supabase variables

### "Database error" or "Profile creation failed"
- Make sure you've executed both SQL scripts in Supabase SQL Editor
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### Stripe webhook not working locally
- Use [Stripe CLI](https://stripe.com/docs/stripe-cli) for local webhook testing:
  \`\`\`bash
  stripe listen --forward-to localhost:3000/api/webhook/stripe
  \`\`\`
- Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Need Help?

If you're still having issues:
1. Check that all environment variables are set in `.env.local`
2. Verify Supabase project is active and accessible
3. Ensure database tables are created (run SQL scripts)
4. Check browser console for specific error messages
