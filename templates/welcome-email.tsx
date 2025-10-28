import { EmailLayout } from "../components/email-layout"

interface WelcomeEmailProps {
  firstName: string
  planType: "essential" | "coaching"
}

export function WelcomeEmail({ firstName, planType }: WelcomeEmailProps) {
  const isCoaching = planType === "coaching"

  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    : "https://sillynutrition.com/dashboard"

  return (
    <EmailLayout preheader="Welcome to Silly Nutrition! Let's get started on your health journey.">
      <h1>Welcome to Silly Nutrition 🎉</h1>

      <p>Hi {firstName},</p>

      <p>
        We're excited you're here! You've just taken the first step towards a healthier, simpler you, and we couldn't be
        more thrilled to be part of your journey.
      </p>

      <div className="highlight-box">
        <div className={`plan-badge ${isCoaching ? "popular-badge" : ""}`}>
          {isCoaching ? "Coaching Plan" : "Essential Plan"}
          {isCoaching && " - Most Popular"}
        </div>
        <h3>Here's what you get:</h3>
        {isCoaching ? (
          <ul>
            <li>Personalised weekly meal plans tailored to your preferences</li>
            <li>Complete shopping lists with macro breakdowns</li>
            <li>4-5 progressive workouts designed for your fitness level</li>
            <li>Preference and allergy adjustments</li>
            <li>Email support with 48-hour response time</li>
          </ul>
        ) : (
          <ul>
            <li>AI-generated 7-day meal plan (refreshed monthly)</li>
            <li>3 beginner-friendly workouts</li>
            <li>Personalised calorie and macro targets</li>
            <li>PDF downloads plus mobile-friendly view</li>
          </ul>
        )}
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a href={dashboardUrl} className="button">
          View Your Dashboard
        </a>
      </div>

      <h2>Getting Started is Simple</h2>
      <p>
        <strong>1. Check your dashboard:</strong> Your first plan is being prepared and will be ready shortly.
        <br />
        <strong>2. Start small:</strong> Pick one meal or workout to begin with - consistency beats perfection.
        <br />
        <strong>3. Need help?</strong> We're here to support you every step of the way.
      </p>

      <p>
        Remember, this is about progress, not perfection. Every small step counts, and we're here to make it as simple
        as possible.
      </p>

      <p>
        Here's to a healthier, simpler you 💪
        <br />
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}
