# Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required for Production

\`\`\`env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51S6WdERrgAHCpfVeQctMOTyXUdGcaupIUWUJnWgMrXHylnZLnd7fK6M8pzwfU5pqyGZu3O1d6NcP8Pn53K1NFXRt00NzlawEoJ
STRIPE_SECRET_KEY=sk_live_... # Get this from your Stripe dashboard
STRIPE_WEBHOOK_SECRET=whsec_... # Get this after setting up webhooks

# Your domain
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### Getting Your Stripe Keys

1. **Publishable Key** (already have it): 
   - `pk_live_51S6WdERrgAHCpfVeQctMOTyXUdGcaupIUWUJnWgMrXHylnZLnd7fK6M8pzwfU5pqyGZu3O1d6NcP8Pn53K1NFXRt00NzlawEoJ`

2. **Secret Key**: 
   - Go to https://dashboard.stripe.com/apikeys
   - Find your "Secret key" (starts with `sk_live_`)
   - **Keep this private!** Never commit it to Git

3. **Webhook Secret**:
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Events to listen for: `checkout.session.completed`
   - Copy the "Signing secret" (starts with `whsec_`)

### Optional Services

\`\`\`env
# Email Service (choose one)
RESEND_API_KEY=re_...
# OR
SENDGRID_API_KEY=SG...

# AI Plan Generation
OPENAI_API_KEY=sk-...
\`\`\`

## Development Mode

The site works in "demo mode" without Stripe keys:
- ✅ Questionnaires work
- ✅ UI is fully functional
- ❌ No real payments processed
- ❌ No emails sent (logged to console)

## Production Mode

With Stripe keys configured:
- ✅ Real payment processing
- ✅ Webhook verification
- ✅ Automatic email triggers
- ✅ Subscription management

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env.local` with your keys

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Test with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## Deployment

When deploying to Vercel/Netlify:
1. Add all environment variables in the dashboard
2. Set up Stripe webhook pointing to your production URL
3. Test with a small payment first

## Need Help?

- Stripe docs: https://stripe.com/docs
- Contact support if you encounter issues
