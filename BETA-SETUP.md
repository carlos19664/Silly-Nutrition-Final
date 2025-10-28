# Beta Launch Setup Guide

This guide will help you set up Silly Nutrition for beta testing.

## Prerequisites

1. Node.js 18+ installed
2. A Supabase account (free tier is fine for beta)
3. A Stripe account (test mode for beta)
4. An OpenAI API key
5. A Resend account for emails (optional but recommended)

## Step 1: Database Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to Project Settings > API
4. Copy your:
   - Project URL
   - `anon/public` key
   - `service_role` key (keep this secret!)

### Run Database Migrations

1. Go to the SQL Editor in your Supabase dashboard
2. Open the file `scripts/001-create-schema.sql`
3. Copy all the SQL and paste it into the SQL Editor
4. Click "Run" to execute

### Enable Email Authentication

1. In Supabase, go to Authentication > Providers
2. Enable "Email" provider
3. Configure email templates (optional for beta)

## Step 2: Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in all the values:

\`\`\`bash
# Get these from Supabase Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... # Keep secret!

# Get these from Stripe Dashboard > Developers > API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Get webhook secret after setting up webhook (see Step 3)
STRIPE_WEBHOOK_SECRET=whsec_...

# Get from OpenAI Platform
OPENAI_API_KEY=sk-...

# Your deployment URL (use localhost for local testing)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Get from Resend (optional for beta)
RESEND_API_KEY=re_...
\`\`\`

## Step 3: Stripe Setup

### Configure Products

1. Go to Stripe Dashboard > Products
2. Create products for each plan:
   - Single Meal Plan: £39 one-time
   - Single Workout Plan: £29 one-time
   - Complete Package: £59 one-time
   - Essential Plan: £69/month recurring
   - Coaching Plan: £149/month recurring

3. Copy the product IDs and update `lib/stripe.ts`

### Configure Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhook/stripe` (or use Stripe CLI for local testing)
4. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret to your `.env.local`

### Test Mode

For beta, use Stripe Test Mode:
- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Step 4: Install Dependencies

\`\`\`bash
npm install
\`\`\`

New dependencies needed:
\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js
npm install @ai-sdk/openai ai
npm install resend
\`\`\`

## Step 5: Run Locally

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000`

## Step 6: Test the Flow

### 1. Sign Up
- Go to `/sign-up`
- Create a test account
- Check your email for verification (if enabled)

### 2. Select a Plan
- Go to homepage
- Click "Get Started"
- Select a plan
- Choose questionnaire type

### 3. Fill Questionnaire
- Complete the questionnaire
- Submit

### 4. Payment
- Use test card `4242 4242 4242 4242`
- Complete payment

### 5. Check Dashboard
- Plan should appear in dashboard
- Download PDF options should work

## Step 7: Deploy to Vercel

### Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
\`\`\`

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Deploy

### Update Webhook URL
1. After deployment, update Stripe webhook URL to:
   `https://your-domain.vercel.app/api/webhook/stripe`

## Testing Checklist

- [ ] User can sign up
- [ ] User receives verification email
- [ ] User can sign in
- [ ] User can select a plan
- [ ] User can complete questionnaire
- [ ] Payment processing works
- [ ] Plan is generated (check Supabase database)
- [ ] User can view plan in dashboard
- [ ] User can download plan as PDF
- [ ] Welcome email is sent
- [ ] Payment confirmation email is sent
- [ ] Plan delivery email is sent (after 3 days in production)

## Common Issues

### "Invalid API key" error
- Check your environment variables are set correctly
- Make sure you're using the correct Supabase project

### Payment not working
- Verify Stripe keys are correct
- Check you're in test mode
- Use test card number `4242 4242 4242 4242`

### Plan not generating
- Check OpenAI API key is valid
- Check you have credits in your OpenAI account
- Check browser console and server logs for errors

### Database errors
- Verify SQL migrations ran successfully
- Check RLS policies are set up correctly
- Try the queries manually in Supabase SQL Editor

## Beta Testing Notes

For beta testing, you may want to:

1. **Disable email verification** temporarily:
   - In Supabase > Authentication > Email Templates
   - Set confirmation to "disabled" for faster testing

2. **Monitor closely**:
   - Check Supabase logs for errors
   - Monitor Stripe dashboard for payments
   - Check OpenAI usage to avoid surprise bills

3. **Limit beta users** initially:
   - Start with 10-20 users
   - Get feedback before expanding

4. **Add monitoring**:
   - Consider adding Sentry for error tracking
   - Use Vercel Analytics for performance

## Support During Beta

For issues during beta:
- Check Supabase logs
- Check Vercel deployment logs
- Check Stripe dashboard
- Check OpenAI usage dashboard

Need help? Contact: support@sillynutrition.com
\`\`\`

Now update the package.json to include the new dependencies:
