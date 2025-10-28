import { EmailLayout } from "../components/email-layout"

interface PlanDeliveryEmailProps {
  firstName: string
  planType: "essential" | "coaching"
}

export function PlanDeliveryEmail({ firstName, planType }: PlanDeliveryEmailProps) {
  const isCoaching = planType === "coaching"

  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    : "https://sillynutrition.com/dashboard"

  return (
    <EmailLayout preheader="Your new Silly Nutrition plan is ready to view!">
      <h1>Your new plan is ready 📩</h1>

      <p>Hi {firstName},</p>

      <p>Great news! Your {isCoaching ? "Coaching" : "Essential"} plan has been updated and is ready for you.</p>

      <div className="highlight-box">
        <h3>What's New This {isCoaching ? "Week" : "Month"}</h3>
        {isCoaching ? (
          <p>
            Your personalised weekly meal plan includes fresh recipes tailored to your preferences, complete shopping
            lists with macro breakdowns, and your progressive workout routine that builds on last week's progress.
          </p>
        ) : (
          <p>
            Your refreshed 7-day meal plan features new recipes to keep things interesting, plus your updated workout
            routine and personalised macro targets.
          </p>
        )}
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a href={dashboardUrl} className="button">
          View My Dashboard
        </a>
      </div>

      <p>
        <strong>Quick tip:</strong> Take a few minutes to review your plan and add any ingredients to your shopping
        list. The more prepared you are, the easier it becomes to stick with it.
      </p>

      <p style={{ textAlign: "center", fontStyle: "italic", color: "#1E4E78", fontSize: "18px", margin: "30px 0" }}>
        "Every meal, every workout, one step closer to your goals."
      </p>

      <p>
        As always, if you have any questions or need adjustments to your plan, just reply to this email. We're here to
        support you.
      </p>

      <p>
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}
