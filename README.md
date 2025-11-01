# Silly Nutrition Website

A comprehensive nutrition and fitness planning platform with AI-powered personalization.

## Features

- 🎯 Personalized meal and workout plans
- 💊 Specialized GLP-1 medication support
- 💳 Stripe payment integration
- 📧 Automated email notifications via Zapier
- 📱 Responsive design
- 🔒 Secure checkout process

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account
- Zapier account (webhooks already configured)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd silly-nutrition-landing
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Zapier Webhooks (Already configured)
ZAPIER_WELCOME_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um38ns9/
ZAPIER_TRIAL_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6ultt/
ZAPIER_PLAN_DELIVERY_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6ike0/
ZAPIER_PAYMENT_EMAIL_WEBHOOK=https://hooks.zapier.com/hooks/catch/11354546/um6s1nr/

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Netlify

### Option 1: Deploy from Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables in Netlify dashboard
7. Deploy!

### Option 2: Deploy ZIP File

1. Build the project locally:
\`\`\`bash
npm run build
\`\`\`

2. Create a ZIP file of your project
3. Go to Netlify dashboard
4. Drag and drop the ZIP file
5. Add environment variables
6. Your site is live!

## Email Automation

The application automatically triggers emails via Zapier webhooks:

- **Welcome Email**: Sent immediately after successful payment
- **Trial Reminder**: Scheduled for 5 days after trial starts
- **Plan Delivery**: Sent when new plans are ready
- **Payment Confirmation**: Sent after successful payment

## Payment Flow

1. User completes questionnaire
2. User selects a plan
3. Stripe checkout session is created
4. User completes payment
5. Webhook triggers email notifications
6. User receives welcome email and plan delivery

## Customer Journeys

### Essential Plan Journey
1. Homepage → Pricing → Select Essential Plan
2. Complete questionnaire (6 steps)
3. Payment (£69/month)
4. Welcome email sent
5. Plan delivered within 24 hours
6. Monthly plan updates

### Coaching Plan Journey
1. Homepage → Pricing → Select Coaching Plan
2. Complete questionnaire (6 steps)
3. Payment (£149/month)
4. Welcome email sent
5. Plan delivered within 24 hours
6. Weekly plan updates + priority support

### GLP-1 Plan Journey
1. Homepage → GLP-1 CTA
2. GLP-1 landing page
3. GLP-1 questionnaire (7 steps including medication details)
4. Select plan (Single £49 or Monthly £99)
5. Payment
6. Welcome email with GLP-1 specific guidance
7. Plan delivery with side effect management

## Stripe Integration

To complete Stripe integration:

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add them to your `.env.local` file
3. Set up webhook endpoint at `/api/webhook/stripe`
4. Test with Stripe CLI:
\`\`\`bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
\`\`\`

## Testing

### Test the email workflows:

\`\`\`bash
# Test Welcome Email
curl -X POST http://localhost:3000/api/emails/welcome \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","planType":"essential"}'

# Test Payment Email
curl -X POST http://localhost:3000/api/emails/payment \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","planType":"essential","amount":69,"isLaunchPrice":true,"transactionId":"test_123"}'
\`\`\`

## Support

For issues or questions:
- Email: support@sillynutrition.com
- Documentation: [Link to docs]

## License

Proprietary - All rights reserved
build test
