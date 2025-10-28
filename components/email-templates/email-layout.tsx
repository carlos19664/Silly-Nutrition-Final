import type React from "react"

interface EmailLayoutProps {
  children: React.ReactNode
  preheader?: string
}

export function EmailLayout({ children, preheader }: EmailLayoutProps) {
  const emailStyles = `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #F1EBDD;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(30, 78, 120, 0.1);
    }
    .header {
      background-color: #1E4E78;
      padding: 20px 30px;
      display: flex;
      align-items: center;
    }
    .logo {
      width: 40px;
      height: 40px;
      background-color: #F4B728;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #1E4E78;
      font-size: 16px;
      margin-right: 15px;
    }
    .brand-name {
      color: white;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .footer {
      background-color: #F1EBDD;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #B5B0A6;
    }
    .button {
      display: inline-block;
      background-color: #F4B728;
      color: #1E4E78;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .highlight-box {
      background-color: #F1EBDD;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #F4B728;
      margin: 20px 0;
    }
    h1 { color: #1E4E78; font-size: 28px; font-weight: 600; margin-bottom: 20px; }
    h2 { color: #1E4E78; font-size: 22px; font-weight: 600; margin-top: 30px; margin-bottom: 15px; }
    h3 { color: #1E4E78; font-size: 18px; font-weight: 600; margin-bottom: 10px; }
    p { color: #4a4a4a; font-size: 16px; margin-bottom: 16px; line-height: 1.6; }
    .small-text { font-size: 14px; color: #B5B0A6; line-height: 1.5; }
  `

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Silly Nutrition</title>
        <style dangerouslySetInnerHTML={{ __html: emailStyles }} />
      </head>
      <body>
        {preheader && (
          <div
            style={{
              display: "none",
              fontSize: "1px",
              color: "#fefefe",
              lineHeight: "1px",
              maxHeight: "0px",
              maxWidth: "0px",
              opacity: 0,
              overflow: "hidden",
            }}
          >
            {preheader}
          </div>
        )}
        <div style={{ padding: "20px 0" }}>
          <div className="container">
            <div className="header">
              <div className="logo">SN</div>
              <h1 className="brand-name">Silly Nutrition</h1>
            </div>
            <div className="content">{children}</div>
            <div className="footer">
              <p className="small-text">
                <strong>Silly Nutrition</strong>
                <br />
                Making healthy living simple and sustainable.
              </p>
              <p className="small-text">
                Need help?{" "}
                <a href="mailto:support@sillynutrition.com" style={{ color: "#1E4E78" }}>
                  Contact Support
                </a>
                <br />
                <a href="#" style={{ color: "#B5B0A6", fontSize: "12px" }}>
                  Unsubscribe
                </a>{" "}
                |{" "}
                <a href="#" style={{ color: "#B5B0A6", fontSize: "12px" }}>
                  Update Preferences
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
