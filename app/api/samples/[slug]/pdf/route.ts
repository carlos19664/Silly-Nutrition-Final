import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    // Validate slug
    const validSlugs = ["glp1", "meal", "workout", "complete"]
    if (!validSlugs.includes(slug)) {
      return NextResponse.json({ error: "Invalid sample slug" }, { status: 400 })
    }

    // For now, return a simple response indicating PDF generation would happen here
    // In production, you would use a library like puppeteer or @react-pdf/renderer
    return NextResponse.json(
      {
        message: "PDF generation endpoint",
        slug,
        note: "In production, this would generate a watermarked PDF of the sample plan",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
