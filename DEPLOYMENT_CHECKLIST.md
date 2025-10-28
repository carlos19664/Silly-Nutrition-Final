# Silly Nutrition — Auth & Dashboard Deployment Checklist

**Version:** build:v45-auth-stable  
**Date:** January 2025  
**Purpose:** Complete setup and verification of authentication, database, OAuth, emails, and dashboard features

---

## A) Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**:

### Required Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_APP_URL` | `https://sillynutrition.com` (prod) or staging URL | Base URL for email links and redirects |
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase project settings | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase project settings | Supabase anonymous key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase project settings | Supabase service role key (server-side only, DO NOT LOG) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe dashboard | Stripe publishable key (test or prod) |
| `STRIPE_SECRET_KEY` | From Stripe dashboard | Stripe secret key (test or prod, DO NOT LOG) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe dashboard | Webhook signing secret for deployed domain |
| `ADMIN_SETUP_TOKEN` | Generate a long random string | Used only during setup (e.g., `openssl rand -hex 32`) |

### Optional Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `CHECKIN_URL` | `https://calendly.com/yourname` or `https://cal.com/yourname` | External booking URL for "Schedule Check-in" button |

---

## B) Deploy Steps

### 1. Set Environment Variables
- Add all required variables listed above in Vercel dashboard
- Verify all values are correct (no typos, no trailing spaces)
- Redeploy after adding variables

### 2. Deploy to Vercel
\`\`\`bash
git add .
git commit -m "feat: complete auth and dashboard implementation"
git push origin main
\`\`\`
- Wait for Vercel deployment to complete
- Note the deployed URL (e.g., `https://sillynutrition.vercel.app` or custom domain)

### 3. Run Admin Checklist
Visit the admin checklist page with your token:

**URL:** `https://your-domain.com/admin/checklist?token=YOUR_ADMIN_SETUP_TOKEN`

Replace:
- `your-domain.com` with your actual deployed domain
- `YOUR_ADMIN_SETUP_TOKEN` with the value you set in environment variables

### 4. Execute Setup Steps (In Order)

#### Step 1: Database Bootstrap
1. Click "Preview (Dry-Run)" to see what will happen
2. Click "Run Now" to execute SQL scripts
3. Verify success message shows:
   - Script 1: Creates `profiles`, `orders`, `plans` tables
   - Script 2: Creates OAuth profile trigger
4. If automated execution fails, follow manual steps shown in the UI

#### Step 2: OAuth Verification
1. Click "Verify OAuth Providers"
2. Check status:
   - Green checkmark = Provider configured
   - Red X = Provider needs setup
3. If not configured, follow the step-by-step instructions shown for each provider
4. Configure in Supabase Dashboard → Authentication → Providers:
   - **Google:** Add Client ID and Secret from Google Cloud Console
   - **GitHub:** Add Client ID and Secret from GitHub OAuth App
5. Verify callback URLs match: `https://[your-project].supabase.co/auth/v1/callback`

#### Step 3: Environment Audit
1. Click "Run Environment Audit"
2. Verify all required variables show green checkmarks
3. If any are missing, add them in Vercel and redeploy
4. Optional variables (warnings) can be added later

---

## C) Testing Flows

### Auth Test: Email/Password Sign-Up
1. Go to `https://your-domain.com/sign-up`
2. Fill in: First Name, Last Name, Email, Password, Confirm Password
3. Check "I agree to terms"
4. Click "Sign Up"
5. Check email for verification link (from Supabase)
6. Click verification link
7. Go to `https://your-domain.com/sign-in`
8. Sign in with email and password
9. Verify redirect to `/dashboard`
10. Verify dashboard shows your name and real data (not demo data)

### Auth Test: Google OAuth
1. Go to `https://your-domain.com/sign-in`
2. Click "Continue with Google"
3. Select Google account in chooser
4. Grant permissions
5. Verify redirect to `/dashboard`
6. Verify profile was auto-created (check dashboard shows your name)

### Stripe Test: Checkout Flow
1. Complete questionnaire at `/questionnaire/start`
2. Select plan and tier
3. Click "Continue to Checkout"
4. Use Stripe test card: `4242 4242 4242 4242`
5. Expiry: Any future date (e.g., `12/25`)
6. CVC: Any 3 digits (e.g., `123`)
7. Complete payment
8. Verify redirect to `/payment/success`
9. Check email for:
   - Welcome email (from Zapier webhook)
   - Payment confirmation email
   - Plan delivery email
10. Verify emails contain correct dashboard link: `https://your-domain.com/dashboard`

### Dashboard Links Test
Test each button/link on the dashboard:

| Button/Link | Expected Destination | Final URL | Status |
|-------------|---------------------|-----------|--------|
| View Recipe | Recipe detail page | `/dashboard/recipes/[id]` | ✅ |
| Download PDF (meals) | PDF download | `/api/download/meal-plan-pdf` | ✅ |
| View Shopping List | Shopping list page | `/dashboard/shopping-list` | ✅ |
| Start Workout | Workout detail page | `/dashboard/workouts/[id]` | ✅ |
| Download Workout PDF | PDF download | `/api/download/workout-pdf` | ✅ |
| Update Preferences | Settings page | `/dashboard/settings` | ✅ |
| Contact Support | Support page | `/dashboard/support` | ✅ |
| Get Support | Support page | `/dashboard/support` | ✅ |
| Manage Subscription | Stripe customer portal | Opens Stripe portal, returns to `/dashboard` | ✅ |
| Schedule Check-in | External booking or "Coming soon" | Uses `CHECKIN_URL` if set | ⚠️ Optional |

### Stripe Portal Test
1. On dashboard, click "Manage Subscription"
2. Verify Stripe customer portal opens in new tab
3. Test portal features:
   - View subscription details
   - Update payment method
   - Cancel subscription (test mode only!)
4. Click "Return to dashboard"
5. Verify redirect back to `/dashboard`

---

## D) Acceptance Criteria (GREEN = Go-Live)

### Critical (Must Pass)
- [ ] Sign-up creates user and profile in database
- [ ] Email verification link works
- [ ] Sign-in with email/password works
- [ ] Google OAuth creates user and profile automatically
- [ ] Dashboard loads with real user data (not demo data)
- [ ] Dashboard is protected (redirects to `/sign-in` if not authenticated)
- [ ] All dashboard buttons route to live pages/APIs
- [ ] PDF downloads work (meal plan and workout)
- [ ] Stripe checkout completes successfully
- [ ] Stripe webhook creates order and profile records
- [ ] Emails use correct domain (not hardcoded production URL)
- [ ] Stripe customer portal opens and returns to dashboard

### Optional (Nice to Have)
- [ ] GitHub OAuth configured and working
- [ ] Schedule Check-in button links to booking tool
- [ ] Password reset flow tested
- [ ] Forgot password email received and link works

---

## E) Teardown: Remove Admin Tools

After all tests pass, remove the temporary admin tools:

### Files to Delete
\`\`\`bash
git rm app/admin/checklist/page.tsx
git rm app/api/admin/db-bootstrap/route.ts
git rm app/api/admin/oauth-verify/route.ts
git rm app/api/admin/env-audit/route.ts
git commit -m "chore: remove one-time admin setup tools"
git push
\`\`\`

### Verify Removal
- Visit `https://your-domain.com/admin/checklist` → Should return 404
- Visit `https://your-domain.com/api/admin/db-bootstrap` → Should return 404

### Remove Admin Token (Optional)
- Go to Vercel → Project → Settings → Environment Variables
- Delete `ADMIN_SETUP_TOKEN` variable
- Redeploy

---

## F) Tag Release

After successful deployment and testing:

\`\`\`bash
git tag build:v45-auth-stable
git push origin build:v45-auth-stable
\`\`\`

---

## G) Troubleshooting

### Database Scripts Fail to Execute
**Solution:** Run manually in Supabase SQL Editor
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `scripts/001-create-profiles-and-users.sql`
3. Paste and run
4. Copy contents of `scripts/002-oauth-profile-trigger.sql`
5. Paste and run

### OAuth Providers Not Working
**Solution:** Verify callback URLs match exactly
- Supabase callback: `https://[your-project].supabase.co/auth/v1/callback`
- Google Cloud Console: Add same URL to authorized redirect URIs
- GitHub OAuth App: Add same URL to authorization callback URL

### Emails Not Received
**Solution:** Check Zapier webhook configuration
- Verify webhook URLs are correct in `app/api/webhook/stripe/route.ts`
- Test webhooks in Zapier dashboard
- Check Stripe webhook logs for delivery status

### Dashboard Shows Demo Data
**Solution:** Database tables not created or profile not created
- Run database bootstrap again
- Check Supabase logs for errors
- Verify user has profile record in `profiles` table

### Stripe Portal Fails
**Solution:** Check Stripe configuration
- Verify `STRIPE_SECRET_KEY` is set correctly
- Verify customer has active subscription
- Check Stripe dashboard for customer portal settings

---

## H) Support

If you encounter issues not covered in this checklist:
1. Check Vercel deployment logs
2. Check Supabase logs (Dashboard → Logs)
3. Check Stripe webhook logs (Dashboard → Developers → Webhooks)
4. Review browser console for client-side errors

---

**Checklist Complete!** Your auth and dashboard system is now fully operational.
