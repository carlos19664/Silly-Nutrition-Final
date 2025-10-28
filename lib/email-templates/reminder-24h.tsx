interface ReminderEmailParams {
  firstName: string
  progressPct: number
  resumeLink: string
  unsubscribeLink: string
}

export function getReminderEmail24h({ firstName, progressPct, resumeLink, unsubscribeLink }: ReminderEmailParams) {
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Finish your plan to unlock your results</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    .btn{background:#3a82f6;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;display:inline-block}
    @media (prefers-color-scheme: dark){ body{background:#0b0b0b;color:#f5f5f5} .card{background:#141414} }
  </style>
</head>
<body style="margin:0;padding:0;background:#f6f8fb;color:#1f2937;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:28px 14px;">
      <table class="card" role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;padding:28px;">
        <tr><td align="center" style="padding-bottom:10px;">
          <img src="https://silly-nutrition.netlify.app/logo.png" alt="SillyNutrition" width="120" style="display:block;border:0;opacity:.9">
        </td></tr>
        <tr><td style="font-size:20px;font-weight:700;padding:6px 0;">Finish your plan to unlock your results</td></tr>
        <tr><td style="font-size:15px;line-height:22px;padding:6px 0;">
          Hi ${firstName}, your SillyNutrition questionnaire is <strong>${progressPct}%</strong> complete. It only takes a minute to finish and get your personalised plan.
        </td></tr>
        <tr><td style="font-size:15px;line-height:22px;padding:6px 0;color:#059669;font-weight:600;">
          Finish today to receive your plan PDF instantly.
        </td></tr>
        <tr><td align="center" style="padding:18px 0 8px;">
          <a class="btn" href="${resumeLink}" target="_blank" rel="noopener">Resume my plan</a>
        </td></tr>
        <tr><td style="font-size:13px;line-height:20px;color:#6b7280;padding-top:10px;">
          If the button doesn't work, paste this link into your browser:<br>
          <span style="word-break:break-all">${resumeLink}</span>
        </td></tr>
        <tr><td style="font-size:12px;color:#94a3b8;padding-top:18px;border-top:1px solid #e5e7eb;margin-top:16px">
          You're receiving this because you opted to save your progress. <a href="${unsubscribeLink}" style="color:#64748b;text-decoration:underline">Unsubscribe</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return {
    subject: "Finish your plan to unlock your results",
    html,
  }
}
