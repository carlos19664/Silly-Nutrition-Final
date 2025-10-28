"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("draft-saved")

  // Sample data for template variables
  const sampleData = {
    first_name: "Sarah",
    progress_pct: "65",
    resume_link: "https://sillynutrition.co/questionnaire/resume?token=abc123",
    download_link: "https://sillynutrition.co/download/plan-abc123.pdf",
    checkout_link: "https://sillynutrition.co/checkout?session=xyz789",
    support_email: "hello@sillynutrition.co",
    unsubscribe_link: "https://sillynutrition.co/unsubscribe?token=abc123",
    BRAND_LOGO_URL: "/silly-nutrition-logo.png",
    brand_color: "#f97316",
  }

  // Function to replace template variables with sample data
  const renderTemplate = (html: string) => {
    let rendered = html
    Object.entries(sampleData).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, "g"), value)
    })
    // Handle partials
    rendered = rendered.replace(/{{> header}}/g, headerPartial)
    rendered = rendered.replace(/{{> footer}}/g, footerPartial)
    return rendered
  }

  const headerPartial = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fb;">
      <tr>
        <td align="center" style="padding: 28px 14px;">
          <table role="presentation" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 16px; padding: 32px 28px;">
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <img src="${sampleData.BRAND_LOGO_URL}" alt="Silly Nutrition" width="120" height="120" style="display: block; border: 0; border-radius: 50%;">
              </td>
            </tr>
  `

  const footerPartial = `
            <tr>
              <td style="font-size: 12px; line-height: 18px; color: #94a3b8; padding-top: 24px; border-top: 1px solid #e5e7eb; margin-top: 20px; text-align: center;">
                <p style="margin: 0 0 8px 0;">You're receiving this email because you started a questionnaire with Silly Nutrition.</p>
                <p style="margin: 0 0 8px 0;">
                  Need help? Email us at <a href="mailto:${sampleData.support_email}" style="color: ${sampleData.brand_color}; text-decoration: none;">${sampleData.support_email}</a>
                </p>
                <p style="margin: 0;">
                  <a href="${sampleData.unsubscribe_link}" style="color: #64748b; text-decoration: underline;">Unsubscribe from reminders</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `

  const templates = {
    "draft-saved": {
      name: "Draft Saved",
      description: "Sent when user clicks 'Save & Exit'",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your progress has been saved</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 24px; font-weight: 700; line-height: 32px; padding: 0 0 16px 0; color: #111827;">
      Your progress has been saved ✓
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Your questionnaire is <strong style="color: {{brand_color}};">{{progress_pct}}% complete</strong>. We've saved your answers so you can pick up exactly where you left off.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{resume_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Resume my questionnaire
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid {{brand_color}};">
      <strong>Tip:</strong> Bookmark this email or save the link below so you can return anytime within the next 30 days.
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "reminder-1h": {
      name: "1 Hour Reminder",
      description: "Sent 1 hour after saving draft",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your personalised plan is waiting</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 24px; font-weight: 700; line-height: 32px; padding: 0 0 16px 0; color: #111827;">
      Your personalised plan is waiting — pick up where you left off
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      You're <strong style="color: {{brand_color}};">{{progress_pct}}% of the way</strong> to your personalised nutrition and fitness plan. It only takes a few more minutes to complete your questionnaire.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{resume_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Continue my plan
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #f9fafb; border-radius: 8px;">
      <strong>What happens next:</strong><br>
      Complete your questionnaire → Get your personalised plan instantly → Download your PDF and start today
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "reminder-24h": {
      name: "24 Hour Reminder",
      description: "Sent 24 hours after saving draft",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finish your plan to unlock your results</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 24px; font-weight: 700; line-height: 32px; padding: 0 0 16px 0; color: #111827;">
      Finish your plan to unlock your results
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Your questionnaire is <strong style="color: {{brand_color}};">{{progress_pct}}% complete</strong>. You're so close to getting your personalised nutrition and fitness plan!
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      <strong>Finish today to receive your plan PDF instantly.</strong>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{resume_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Finish my plan now
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
      ⏰ <strong>Don't miss out:</strong> Complete your plan today and start seeing results this week.
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "reminder-3d": {
      name: "3 Day Final Reminder",
      description: "Sent 3 days after saving draft",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Final reminder: complete your plan today</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 24px; font-weight: 700; line-height: 32px; padding: 0 0 16px 0; color: #111827;">
      Final reminder: complete your plan today
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      This is your final reminder. Your questionnaire is <strong style="color: {{brand_color}};">{{progress_pct}}% complete</strong>, but we'll keep your answers for only <strong>7 more days</strong> before they're deleted.
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Don't lose your progress — finish your plan now and get your personalised results instantly.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{resume_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Complete my plan
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #fee2e2; border-radius: 8px; border-left: 4px solid #ef4444;">
      ⚠️ <strong>Last chance:</strong> After 7 days, your answers will be permanently deleted and you'll need to start over.
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "plan-ready": {
      name: "Plan Ready",
      description: "Sent when plan is generated and ready for download",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your personalised plan is ready!</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 26px; font-weight: 700; line-height: 34px; padding: 0 0 16px 0; color: #111827;">
      🎉 Your personalised plan is ready!
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Congratulations! Your personalised nutrition and fitness plan has been created based on your unique goals and preferences.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{download_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Download my plan (PDF)
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong>What's included:</strong><br>
      ✓ Personalised meal plans tailored to your goals<br>
      ✓ Custom workout routines for your fitness level<br>
      ✓ Shopping lists and macro breakdowns<br>
      ✓ Tips and guidance to help you succeed
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 20px 0 12px 0; color: #374151; font-weight: 600;">
      Want more support?
    </td>
  </tr>
  <tr>
    <td style="font-size: 15px; line-height: 22px; padding: 0 0 16px 0; color: #374151;">
      Upgrade to our Essential or Coaching plans for weekly updates, priority support, and ongoing personalisation.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 16px 0 24px 0;">
      <a href="{{checkout_link}}" target="_blank" rel="noopener" style="background: #ffffff; color: {{brand_color}}; border: 2px solid {{brand_color}}; text-decoration: none; padding: 12px 26px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        View upgrade options
      </a>
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "checkout-reminder": {
      name: "Checkout Reminder",
      description: "Sent when user completes questionnaire but doesn't checkout",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete your purchase</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 24px; font-weight: 700; line-height: 32px; padding: 0 0 16px 0; color: #111827;">
      Complete your purchase to get your plan
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      You're almost there! You completed your questionnaire, but haven't finished your purchase yet. Complete your order now to receive your personalised plan instantly.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{checkout_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Complete my purchase
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #f9fafb; border-radius: 8px;">
      <strong>What you'll get:</strong><br>
      ✓ Instant access to your personalised plan<br>
      ✓ Downloadable PDF with meal plans and workouts<br>
      ✓ Shopping lists and macro breakdowns<br>
      ✓ Email support from our team
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
    "welcome-start": {
      name: "Welcome Email",
      description: "Sent when user first signs up",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Silly Nutrition</title>
</head>
<body style="margin: 0; padding: 0; background: #f6f8fb; color: #1f2937;">
  {{> header}}
  <tr>
    <td style="font-size: 26px; font-weight: 700; line-height: 34px; padding: 0 0 16px 0; color: #111827;">
      Welcome to Silly Nutrition! 👋
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Hi {{first_name}},
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Thank you for choosing Silly Nutrition! We're excited to help you achieve your health and fitness goals with a personalised plan designed just for you.
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 0 0 20px 0; color: #374151;">
      Let's get started by answering a few quick questions about your goals, preferences, and lifestyle. It only takes 5 minutes.
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="{{resume_link}}" target="_blank" rel="noopener" style="background: {{brand_color}}; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
        Start my questionnaire
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-size: 14px; line-height: 20px; color: #6b7280; padding: 16px 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong>What to expect:</strong><br>
      1️⃣ Answer questions about your goals and preferences<br>
      2️⃣ Get your personalised nutrition and fitness plan<br>
      3️⃣ Download your PDF and start today
    </td>
  </tr>
  <tr>
    <td style="font-size: 16px; line-height: 24px; padding: 20px 0 12px 0; color: #374151;">
      Your progress is automatically saved, so you can complete the questionnaire at your own pace.
    </td>
  </tr>
  {{> footer}}
</body>
</html>`,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Email Template Preview</h1>
          <p className="text-slate-600">Preview all questionnaire email templates with sample data</p>
        </div>

        <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="draft-saved">Draft Saved</TabsTrigger>
            <TabsTrigger value="reminder-1h">1h Reminder</TabsTrigger>
            <TabsTrigger value="reminder-24h">24h Reminder</TabsTrigger>
            <TabsTrigger value="reminder-3d">3d Reminder</TabsTrigger>
            <TabsTrigger value="plan-ready">Plan Ready</TabsTrigger>
            <TabsTrigger value="checkout-reminder">Checkout</TabsTrigger>
            <TabsTrigger value="welcome-start">Welcome</TabsTrigger>
          </TabsList>

          {Object.entries(templates).map(([key, template]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 overflow-auto">
                    <div className="bg-white" dangerouslySetInnerHTML={{ __html: renderTemplate(template.html) }} />
                  </div>
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-semibold text-sm text-slate-700 mb-2">Sample Data Used:</h3>
                    <pre className="text-xs text-slate-600 overflow-auto">{JSON.stringify(sampleData, null, 2)}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
