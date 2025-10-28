import { EmailLayout } from "../components/email-layout"

interface PaymentConfirmationEmailProps {
  firstName: string
  planType: "essential" | "coaching"
  amount: number
  isLaunchPrice: boolean
  transactionId: string
}

export function PaymentConfirmationEmail({
  firstName,
  planType,
  amount,
  isLaunchPrice,
  transactionId,
}: PaymentConfirmationEmailProps) {
  const isCoaching = planType === "coaching"
  const regularPrice = isCoaching ? 139 : 59

  return (
    <EmailLayout preheader="Payment received - welcome back to Silly Nutrition!">
      <h1>Payment Received - Welcome Back!</h1>

      <p>Hi {firstName},</p>

      <p>
        Thank you! Your payment has been successfully processed, and we're excited to continue supporting your health
        journey this month.
      </p>

      <div className="highlight-box">
        <h3>Payment Confirmation</h3>
        <p>
          <strong>Plan:</strong> {isCoaching ? "Coaching Plan" : "Essential Plan"}
          {isCoaching && " (Most Popular)"}
          <br />
          <strong>Amount:</strong> £{amount}
          {isLaunchPrice && (
            <>
              <span style={{ color: "#B5B0A6", textDecoration: "line-through", marginLeft: "10px" }}>
                £{regularPrice}
              </span>
              <span style={{ color: "#F4B728", fontWeight: "bold", marginLeft: "5px" }}>Launch Price!</span>
            </>
          )}
          <br />
          <strong>Transaction ID:</strong> {transactionId}
        </p>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a href="#" className="button-secondary">
          Download Receipt
        </a>
      </div>

      <h2>What You Get This Month</h2>
      {isCoaching ? (
        <ul>
          <li>Fresh personalised weekly meal plans</li>
          <li>Complete shopping lists with macro breakdowns</li>
          <li>Progressive workout routines that build on your progress</li>
          <li>Preference and allergy adjustments as needed</li>
          <li>Priority email support (48-hour response)</li>
        </ul>
      ) : (
        <ul>
          <li>Updated 7-day meal plan with fresh recipes</li>
          <li>3 beginner-friendly workouts</li>
          <li>Personalised calorie and macro targets</li>
          <li>PDF downloads plus mobile-friendly access</li>
        </ul>
      )}

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a href="#" className="button">
          Access Your Plan
        </a>
      </div>

      <p>Your updated plan will be ready shortly. We'll send you another email as soon as it's available to view.</p>

      <p>
        We're glad you're with us, and we're committed to making this month even better than the last. If you need
        anything at all, just reply to this email.
      </p>

      <p>
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}
