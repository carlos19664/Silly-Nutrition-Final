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
    doc.text("Meal Plan", 105, 120, { align: "center" })

    doc.setFontSize(16)
    doc.text(`Prepared for ${userName}`, 105, 150, { align: "center" })

    doc.setFontSize(12)
    doc.text("Silly Nutrition", 105, 270, { align: "center" })

    // Page 2: Weekly Overview
    doc.addPage()
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(24)
    doc.text("This Week's Meal Plan", 20, 30)

    doc.setFontSize(12)
    doc.text("Week of " + new Date().toLocaleDateString(), 20, 45)

    // Sample meals
    const meals = [
      {
        day: "Monday",
        breakfast: "Greek Yogurt Parfait with Berries",
        lunch: "Mediterranean Chicken Bowl",
        dinner: "Grilled Salmon with Quinoa",
        calories: 1850,
      },
      {
        day: "Tuesday",
        breakfast: "Avocado Toast with Poached Eggs",
        lunch: "Quinoa Power Salad",
        dinner: "Turkey Meatballs with Zucchini Noodles",
        calories: 1800,
      },
      {
        day: "Wednesday",
        breakfast: "Protein Smoothie Bowl",
        lunch: "Chicken Caesar Wrap",
        dinner: "Baked Cod with Roasted Vegetables",
        calories: 1750,
      },
    ]

    let yPos = 60
    meals.forEach((meal) => {
      doc.setFillColor(...brandYellow)
      doc.rect(20, yPos - 5, 170, 8, "F")

      doc.setFontSize(14)
      doc.setFont(undefined, "bold")
      doc.text(meal.day, 25, yPos)

      doc.setFontSize(10)
      doc.setFont(undefined, "normal")
      yPos += 10
      doc.text(`Breakfast: ${meal.breakfast}`, 25, yPos)
      yPos += 7
      doc.text(`Lunch: ${meal.lunch}`, 25, yPos)
      yPos += 7
      doc.text(`Dinner: ${meal.dinner}`, 25, yPos)
      yPos += 7
      doc.text(`Total Calories: ${meal.calories}`, 25, yPos)
      yPos += 15
    })

    // Page 3: Shopping List
    doc.addPage()
    doc.setFontSize(24)
    doc.text("Shopping List", 20, 30)

    doc.setFontSize(12)
    const shoppingItems = [
      "Proteins: Chicken breast, Salmon, Turkey, Eggs",
      "Vegetables: Spinach, Tomatoes, Zucchini, Bell peppers",
      "Fruits: Berries, Avocado, Bananas",
      "Grains: Quinoa, Brown rice, Whole wheat bread",
      "Dairy: Greek yogurt, Feta cheese",
      "Pantry: Olive oil, Spices, Nuts",
    ]

    yPos = 50
    shoppingItems.forEach((item) => {
      doc.text(`• ${item}`, 25, yPos)
      yPos += 10
    })

    // Generate PDF as buffer
    const pdfBuffer = doc.output("arraybuffer")

    // Return PDF with proper headers
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="meal-plan.pdf"',
      },
    })
  } catch (error) {
    console.error("[v0] Error generating meal plan PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
