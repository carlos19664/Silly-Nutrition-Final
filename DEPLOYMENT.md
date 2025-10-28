# Silly Nutrition - Deployment Guide

## ✅ Pre-Deployment Checklist

### Stripe Product IDs (Already Configured)
- ✅ Complete Plan: `prod_T8zAUtewF3E4s8`
- ✅ Workout Plan: `prod_T8ylikMxmOoFME`
- ✅ Meal Plan: `prod_T8yPaijUec8KUT`
- ✅ Essentials Plan: `prod_T5ijuxsfbLgRSP`
- ✅ Coaching Plan: `prod_T5imW60V83qIAQ`

### Zapier Webhooks (Already Configured)
- ✅ Welcome Email: `https://hooks.zapier.com/hooks/catch/11354546/um38ns9/`
- ✅ Trial Email: `https://hooks.zapier.com/hooks/catch/11354546/um6ultt/`
- ✅ Plan Delivery: `https://hooks.zapier.com/hooks/catch/11354546/um6ike0/`
- ✅ Payment Email: `https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/`

## 🚀 Deploy to Netlify

### Step 1: Add Your Logo
1. Save your logo as `public/logo.png` (or logo.svg)
2. The logo will automatically appear in navigation and footer

### Step 2: Set Environment Variables in Netlify

Go to Site Settings → Environment Variables and add:

\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

STRIPE_PRODUCT_COMPLETE_PLAN=prod_T8zAUtewF3E4s8
STRIPE_PRODUCT_WORKOUT_PLAN=prod_T8ylikMxmOoFME
STRIPE_PRODUCT_MEAL_PLAN=prod_T8yPaijUec8KUT
STRIPE_PRODUCT_ESSENTIAL_PLAN=prod_T5ijuxsfbLgRSP
STRIPE_PRODUCT_COACHING_PLAN=prod_T5imW60V83qIAQ

ZAPIER_WELCOME_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um38ns9/
ZAPIER_TRIAL_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6ultt/
ZAPIER_PLAN_DELIVERY_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6ike0/
ZAPIER_PAYMENT_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/

NEXT_PUBLIC_APP_URL=https://sillynutrition.com
\`\`\`

### Step 3: Build Settings

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18.x or higher

### Step 4: Deploy!

1. Connect your Git repository OR upload ZIP file
2. Netlify will automatically build and deploy
3. Your site will be live at your custom domain

## 🧪 Testing After Deployment

### Test Customer Journeys:

1. **Single Plan Purchase**
   - Go to homepage → Pricing
   - Click "Choose Your Plan" under Single Plans
   - Complete questionnaire
   - Verify payment flow
   - Check for welcome email

2. **Essential Plan**
   - Select Essential Plan (£69/month)
   - Complete questionnaire
   - Verify recurring subscription setup
   - Check for welcome email

3. **Coaching Plan**
   - Select Coaching Plan (£149/month)
   - Complete questionnaire
   - Verify recurring subscription
   - Check for welcome email

4. **GLP-1 Flow**
   - Click "Explore GLP-1 Plans" on pricing page
   - Read GLP-1 landing page
   - Complete GLP-1 questionnaire
   - Select plan
   - Verify purchase

### Verify Email Automation:

Test each webhook manually with curl:

\`\`\`bash
# Test Welcome Email
curl -X POST https://hooks.zapier.com/hooks/catch/11354546/um38ns9/ \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","planType":"essential"}'

# Test Payment Email
curl -X POST https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/ \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","planType":"essential","amount":69,"transactionId":"test_123"}'
\`\`\`

## 🔧 Post-Deployment

### Set up Stripe Webhook:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://sillynutrition.com/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret to environment variables

### Monitor:

- Check Netlify function logs
- Monitor Stripe dashboard for payments
- Verify Zapier task history for email triggers

## 📝 Customer Journey Map

### Journey 1: Single Purchase
1. User visits homepage
2. Clicks pricing section
3. Selects single plan (meal/workout/complete)
4. Completes questionnaire (6 steps)
5. Proceeds to payment
6. Completes Stripe checkout
7. Webhook triggers → Welcome email sent
8. User redirected to success page
9. Plan delivery email sent within 24h

### Journey 2: Subscription (Essential/Coaching)
1. User visits homepage
2. Selects subscription plan
3. Completes questionnaire
4. Stripe recurring checkout
5. Subscription created
6. Welcome email sent
7. First plan delivered
8. Recurring billing begins
9. New plans delivered monthly/weekly

### Journey 3: GLP-1 Specialized
1. User sees GLP-1 CTA on pricing page
2. Visits GLP-1 landing page
3. Reads medical disclaimers
4. Completes GLP-1 questionnaire (7 steps)
5. Selects GLP-1 plan (single/monthly)
6. Payment processed
7. Specialized welcome email with GLP-1 guidance
8. GLP-1 optimized plan delivered

## 🆘 Troubleshooting

**Emails not sending?**
- Check Zapier task history
- Verify webhook URLs are correct
- Test webhooks manually with curl

**Payment not working?**
- Verify Stripe keys are correct
- Check Stripe dashboard for errors
- Ensure webhook is configured

**Build failing?**
- Check Node.js version (18+)
- Verify all dependencies installed
- Review build logs in Netlify

## 📞 Support

If you encounter issues:
1. Check Netlify function logs
2. Review Stripe webhook logs
3. Verify Zapier task history
4. Contact support if needed
