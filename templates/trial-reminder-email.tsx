import { EmailLayout } from "../components/email-layout"

interface TrialReminderEmailProps {
  firstName: string
  trialEndDate: string
  daysLeft: number
}

export function TrialReminderEmail({ firstName, trialEndDate, daysLeft }: TrialReminderEmailProps) {
  return (
    <EmailLayout preheader="Your trial is ending soon - don't miss out on your launch pricing!">
      <h1>Your trial is ending soon ⏳</h1>

      <p>Hi {firstName},</p>

      <p>
        Your 7-day free trial with Silly Nutrition ends on <strong>{trialEndDate}</strong>
        {daysLeft <= 1 ? " - that's tomorrow!" : ` - that's in just ${daysLeft} days!`}
      </p>

      <p>
        We hope you've enjoyed getting a taste of what personalised nutrition and fitness can do for you. Here's what
        you'll continue to get when you stay with us:
      </p>

      <div className="highlight-box">
        <h3>Keep Your Momentum Going</h3>
        <ul>
          <li>
            <strong>Personalised plans</strong> that adapt to your preferences and progress
          </li>
          <li>
            <strong>Simple workouts</strong> designed for real life, not just the gym
          </li>
          <li>
            <strong>Ongoing support</strong> to help you stay on track
          </li>
          <li>
            <strong>Fresh content</strong> so you never get bored
          </li>
        </ul>
      </div>

      <div className="price-highlight">
        <h2 style={{ color: "white", margin: "0 0 10px 0" }}>Lock in Your Launch Price</h2>

        <div style={{ marginBottom: "15px" }}>
          <div>
            <span className="strike-price">Essential: £59/month</span>
            <div className="launch-price">Now £39/month</div>
          </div>
        </div>

        <div>
          <span className="strike-price">Coaching: £139/month</span>
          <div className="launch-price">Now £99/month</div>
          <div style={{ color: "#F4B728", fontSize: "14px", marginTop: "5px" }}>Most Popular</div>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a href="#" className="button">
          Upgrade Now & Lock Your Launch Price
        </a>
      </div>

      <p>
        Don't let this opportunity slip away. These launch prices won't be available forever, and we'd hate for you to
        miss out on continuing your health journey with us.
      </p>

      <p>Questions? Just reply to this email - we're here to help!</p>

      <p>
        <strong>The Silly Nutrition Team</strong>
      </p>
    </EmailLayout>
  )
}
