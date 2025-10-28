import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { jsPDF } from "jspdf"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user profile for personalization
    const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

    const userName = profile?.full_name || "User"

    // Create PDF document
    const doc = new jsPDF()

    // Add branding colors
    const brandBlue = [30, 78, 120]
    const brandYellow = [244, 183, 40]

    // Cover page
    doc.setFillColor(...brandBlue)
    doc.rect(0, 0, 210, 297, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(32)
    doc.text("Your Personalized", 105, 100, { align: "center" })
    doc.text("Workout Plan", 105, 120, { align: "center" })

    doc.setFontSize(16)
    doc.text(`Prepared for ${userName}`, 105, 150, { align: "center" })

    doc.setFontSize(12)
    doc.text("Silly Nutrition", 105, 270, { align: "center" })

    // Page 2: Weekly Overview
    doc.addPage()
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.text("This Week's Workout Plan", 20, 30)

    doc.setFontSize(12)
    doc.text("Week of " + new Date().toLocaleDateString(), 20, 45)

    // Sample workouts
    const workouts = [
      {
        day: "Monday",
        name: "Upper Body Strength",
        duration: "45 minutes",
        exercises: ["Bench Press: 3x10", "Rows: 3x12", "Shoulder Press: 3x10", "Bicep Curls: 3x12"],
      },
      {
        day: "Wednesday",
        name: "Lower Body Power",
        duration: "50 minutes",
        exercises: ["Squats: 4x8", "Deadlifts: 3x8", "Lunges: 3x10 each", "Calf Raises: 3x15"],
      },
      {
        day: "Friday",
        name: "HIIT Cardio",
        duration: "30 minutes",
        exercises: ["Burpees: 30 sec", "Mountain Climbers: 30 sec", "Jump Squats: 30 sec", "Rest: 30 sec"],
      },
    ]

    let yPos = 60
    workouts.forEach((workout) => {
      doc.setFillColor(...brandYellow)
      doc.rect(20, yPos - 5, 170, 8, "F")

      doc.setFontSize(14)
      doc.setFont(undefined, "bold")
      doc.text(`${workout.day} - ${workout.name}`, 25, yPos)

      doc.setFontSize(10)
      doc.setFont(undefined, "normal")
      yPos += 10
      doc.text(`Duration: ${workout.duration}`, 25, yPos)
      yPos += 10

      workout.exercises.forEach((exercise) => {
        doc.text(`• ${exercise}`, 30, yPos)
        yPos += 7
      })

      yPos += 10
    })

    // Page 3: Exercise Notes
    doc.addPage()
    doc.setFontSize(24)
    doc.text("Exercise Notes", 20, 30)

    doc.setFontSize(12)
    const notes = [
      "Warm-up: 5-10 minutes of light cardio before each workout",
      "Cool-down: 5-10 minutes of stretching after each workout",
      "Rest: Take 60-90 seconds between sets",
      "Progression: Increase weight by 5% when you can complete all sets",
      "Form: Focus on proper form over heavy weight",
      "Hydration: Drink water before, during, and after workouts",
    ]

    yPos = 50
    notes.forEach((note) => {
      doc.text(`• ${note}`, 25, yPos)
      yPos += 10
    })

    // Generate PDF as buffer
    const pdfBuffer = doc.output("arraybuffer")

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="workout-plan.pdf"',
      },
    })
  } catch (error) {
    console.error("[v0] Error generating workout PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
