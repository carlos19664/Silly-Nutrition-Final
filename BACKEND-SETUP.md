# Backend Setup Guide for Silly Nutrition

This guide will help you set up all the backend services needed for the beta launch.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (for deployment)

## 1. Install Dependencies

\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js @ai-sdk/openai ai resend
\`\`\`

## 2. Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Set project name: "silly-nutrition" (or your preferred name)
5. Set a strong database password (save this!)
6. Choose a region close to your users (e.g., "London" for UK)

### Get Your API Keys

1. In your Supabase dashboard, go to Settings → API
2. Copy these values:
   - **Project URL** (starts with https://xxx.supabase.co)
   - **anon public** key (starts with eyJ...)

### Run Database Migrations

1. In your Supabase dashboard, go to SQL Editor
2. Create a new query
3. Copy the entire contents of `scripts/001-create-schema.sql`
4. Paste and click "Run"
5. Verify tables were created in Database → Tables

## 3. OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Name it "Silly Nutrition Production"
6. Copy the key (you won't see it again!)
7. Add credits to your account (minimum $5 recommended for testing)

## 4. Environment Variables

Create a `.env.local` file in your project root:

\`\`\`bash
# Copy from .env.local.example
cp .env.local.example .env.local
\`\`\`

Fill in the values:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-proj-...
\`\`\`

## 5. Test Locally

\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000 and test:
1. Homepage loads correctly
2. Pricing section displays
3. Plan selection works
4. Sign up flow (if auth is set up)

## 6. Deploy to Vercel

### One-Click Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - All Stripe variables

5. Click "Deploy"

### Set Up Stripe Webhooks

1. In Stripe Dashboard, go to Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret
5. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## 7. Testing Checklist

Before launching to users:

- [ ] User can sign up with email
- [ ] User can sign in
- [ ] User can complete questionnaire
- [ ] AI generates meal plan successfully
- [ ] AI generates workout plan successfully
- [ ] Stripe checkout works (test mode)
- [ ] Webhook processes payments correctly
- [ ] User receives email after purchase (if email set up)
- [ ] Plans are saved to database
- [ ] User can view their plans in dashboard

## 8. Email Setup (Optional for Beta)

If you want to send transactional emails:

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain
3. Get API key
4. Add to environment variables: `RESEND_API_KEY`

## Troubleshooting

### "Supabase client error"
- Check that environment variables are set correctly
- Verify Supabase project is active
- Check database tables were created

### "OpenAI API error"
- Verify API key is correct
- Check you have credits in your OpenAI account
- Make sure key has correct permissions

### "Stripe webhook not working"
- Verify webhook URL is correct
- Check webhook signing secret matches
- Use Stripe CLI for local testing

## Need Help?

- Supabase: [docs.supabase.com](https://docs.supabase.com)
- OpenAI: [platform.openai.com/docs](https://platform.openai.com/docs)
- Stripe: [stripe.com/docs](https://stripe.com/docs)

## Cost Estimates (Monthly)

- Supabase: Free (up to 500MB database, 50,000 auth users)
- OpenAI: ~$20-50 (depends on usage, ~$0.03 per plan generation)
- Vercel: Free (hobby plan, unlimited bandwidth)
- Stripe: 2.9% + £0.20 per transaction

Total estimated cost for 100 users: ~£50-70/month
