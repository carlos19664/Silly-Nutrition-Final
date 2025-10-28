// Questionnaire data structure for Meal and Workout plans

export interface QuestionOption {
  value: string
  label: string
  description?: string
}

export interface Question {
  id: string
  type: "radio" | "checkbox" | "text" | "textarea" | "number" | "select"
  question: string
  description?: string
  options?: QuestionOption[]
  required: boolean
  tier: "standard" | "advanced"
  backgroundImage?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

// Meal Plan Questions
export const mealPlanQuestions: Question[] = [
  // Standard Questions (1-10)
  {
    id: "meal_goal",
    type: "radio",
    question: "What is your primary nutrition goal?",
    description: "This helps us tailor your meal plan to your specific objectives",
    options: [
      { value: "weight_loss", label: "Weight Loss", description: "Reduce body fat while maintaining muscle" },
      { value: "muscle_gain", label: "Muscle Gain", description: "Build lean muscle mass" },
      { value: "maintenance", label: "Maintenance", description: "Maintain current weight and health" },
      { value: "performance", label: "Athletic Performance", description: "Optimize energy for training" },
      { value: "health", label: "General Health", description: "Improve overall wellbeing" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/healthy-nutrition-goals.jpg",
  },
  {
    id: "meal_dietary_restrictions",
    type: "checkbox",
    question: "Do you have any dietary restrictions or preferences?",
    description: "Select all that apply",
    options: [
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "pescatarian", label: "Pescatarian" },
      { value: "gluten_free", label: "Gluten-Free" },
      { value: "dairy_free", label: "Dairy-Free" },
      { value: "keto", label: "Keto" },
      { value: "paleo", label: "Paleo" },
      { value: "halal", label: "Halal" },
      { value: "kosher", label: "Kosher" },
      { value: "none", label: "No restrictions" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/diverse-healthy-foods.jpg",
  },
  {
    id: "meal_allergies",
    type: "checkbox",
    question: "Do you have any food allergies?",
    description: "Select all that apply - this is critical for your safety",
    options: [
      { value: "nuts", label: "Tree Nuts" },
      { value: "peanuts", label: "Peanuts" },
      { value: "shellfish", label: "Shellfish" },
      { value: "fish", label: "Fish" },
      { value: "eggs", label: "Eggs" },
      { value: "soy", label: "Soy" },
      { value: "wheat", label: "Wheat" },
      { value: "dairy", label: "Dairy" },
      { value: "none", label: "No allergies" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/food-allergy-awareness.jpg",
  },
  {
    id: "meal_dislikes",
    type: "textarea",
    question: "Are there any foods you strongly dislike or want to avoid?",
    description: "List any foods you prefer not to eat (optional)",
    required: false,
    tier: "standard",
    backgroundImage: "/variety-of-foods.jpg",
  },
  {
    id: "meal_frequency",
    type: "radio",
    question: "How many meals per day do you prefer?",
    options: [
      { value: "2", label: "2 meals (Intermittent fasting style)" },
      { value: "3", label: "3 meals (Traditional)" },
      { value: "4", label: "4 meals (3 meals + 1 snack)" },
      { value: "5", label: "5-6 small meals (Frequent eating)" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/meal-planning-schedule.jpg",
  },
  {
    id: "meal_cooking_time",
    type: "radio",
    question: "How much time can you dedicate to meal preparation?",
    options: [
      { value: "minimal", label: "Minimal (15 min or less)", description: "Quick and simple meals" },
      { value: "moderate", label: "Moderate (15-30 min)", description: "Some cooking required" },
      { value: "extended", label: "Extended (30-60 min)", description: "Enjoy cooking" },
      { value: "meal_prep", label: "Meal Prep (Batch cooking)", description: "Cook once, eat multiple times" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/cooking-preparation-kitchen.jpg",
  },
  {
    id: "meal_cooking_skill",
    type: "radio",
    question: "What is your cooking skill level?",
    options: [
      { value: "beginner", label: "Beginner", description: "Basic cooking skills" },
      { value: "intermediate", label: "Intermediate", description: "Comfortable with most recipes" },
      { value: "advanced", label: "Advanced", description: "Experienced home cook" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/cooking-skills-chef.jpg",
  },
  {
    id: "meal_budget",
    type: "radio",
    question: "What is your weekly grocery budget per person?",
    options: [
      { value: "budget", label: "£30-50", description: "Budget-friendly options" },
      { value: "moderate", label: "£50-80", description: "Balanced quality and cost" },
      { value: "premium", label: "£80+", description: "Premium ingredients" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/grocery-shopping-budget.jpg",
  },
  {
    id: "meal_activity_level",
    type: "radio",
    question: "What is your current activity level?",
    description: "This helps us calculate your calorie needs",
    options: [
      { value: "sedentary", label: "Sedentary", description: "Little to no exercise" },
      { value: "light", label: "Lightly Active", description: "1-3 days/week exercise" },
      { value: "moderate", label: "Moderately Active", description: "3-5 days/week exercise" },
      { value: "very", label: "Very Active", description: "6-7 days/week exercise" },
      { value: "extreme", label: "Extremely Active", description: "Athlete/physical job" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/fitness-activity-levels.jpg",
  },
  {
    id: "meal_body_stats",
    type: "text",
    question: "Please provide your current stats",
    description: "Age, Height, Current Weight, Target Weight (if applicable)",
    required: true,
    tier: "standard",
    backgroundImage: "/health-measurements.jpg",
  },

  // Advanced Questions (11-15)
  {
    id: "meal_macro_preference",
    type: "radio",
    question: "Do you have a preferred macronutrient distribution?",
    options: [
      { value: "balanced", label: "Balanced (40% carbs, 30% protein, 30% fat)" },
      { value: "high_protein", label: "High Protein (30% carbs, 40% protein, 30% fat)" },
      { value: "low_carb", label: "Low Carb (20% carbs, 40% protein, 40% fat)" },
      { value: "custom", label: "Custom (specify in notes)" },
    ],
    required: true,
    tier: "advanced",
    backgroundImage: "/macronutrients-nutrition.jpg",
  },
  {
    id: "meal_supplements",
    type: "checkbox",
    question: "Are you currently taking any supplements?",
    description: "Select all that apply",
    options: [
      { value: "protein", label: "Protein Powder" },
      { value: "creatine", label: "Creatine" },
      { value: "bcaa", label: "BCAAs" },
      { value: "multivitamin", label: "Multivitamin" },
      { value: "omega3", label: "Omega-3" },
      { value: "vitamin_d", label: "Vitamin D" },
      { value: "other", label: "Other (specify in notes)" },
      { value: "none", label: "None" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/supplements-vitamins.jpg",
  },
  {
    id: "meal_timing",
    type: "radio",
    question: "Do you have specific meal timing preferences?",
    options: [
      { value: "flexible", label: "Flexible - no specific timing" },
      { value: "intermittent", label: "Intermittent Fasting (specify window)" },
      { value: "pre_workout", label: "Pre/Post workout nutrition focus" },
      { value: "evening", label: "Prefer larger evening meals" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/meal-timing-clock.jpg",
  },
  {
    id: "meal_medical_conditions",
    type: "textarea",
    question: "Do you have any medical conditions that affect your diet?",
    description: "E.g., diabetes, PCOS, thyroid issues, IBS (optional but helpful)",
    required: false,
    tier: "advanced",
    backgroundImage: "/medical-health-consultation.jpg",
  },
  {
    id: "meal_additional_notes",
    type: "textarea",
    question: "Any additional information or specific requests?",
    description: "Share anything else that would help us create your perfect meal plan",
    required: false,
    tier: "advanced",
    backgroundImage: "/notes-planning.jpg",
  },
]

// Workout Plan Questions
export const workoutPlanQuestions: Question[] = [
  // Standard Questions (1-10)
  {
    id: "workout_goal",
    type: "radio",
    question: "What is your primary fitness goal?",
    description: "This helps us design the right workout program for you",
    options: [
      { value: "strength", label: "Build Strength", description: "Increase overall strength" },
      { value: "muscle", label: "Build Muscle", description: "Hypertrophy focus" },
      { value: "fat_loss", label: "Fat Loss", description: "Burn fat while maintaining muscle" },
      { value: "endurance", label: "Improve Endurance", description: "Cardiovascular fitness" },
      { value: "athletic", label: "Athletic Performance", description: "Sport-specific training" },
      { value: "general", label: "General Fitness", description: "Overall health and wellness" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_experience",
    type: "radio",
    question: "What is your current fitness level?",
    options: [
      { value: "beginner", label: "Beginner", description: "New to structured training" },
      { value: "intermediate", label: "Intermediate", description: "6-12 months consistent training" },
      { value: "advanced", label: "Advanced", description: "1+ years consistent training" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_frequency",
    type: "radio",
    question: "How many days per week can you train?",
    options: [
      { value: "2", label: "2 days/week" },
      { value: "3", label: "3 days/week" },
      { value: "4", label: "4 days/week" },
      { value: "5", label: "5 days/week" },
      { value: "6", label: "6+ days/week" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_duration",
    type: "radio",
    question: "How long can you train per session?",
    options: [
      { value: "30", label: "30 minutes or less" },
      { value: "45", label: "30-45 minutes" },
      { value: "60", label: "45-60 minutes" },
      { value: "90", label: "60-90 minutes" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_location",
    type: "radio",
    question: "Where will you be training?",
    options: [
      { value: "gym", label: "Gym (Full Equipment)", description: "Access to all equipment" },
      { value: "home_full", label: "Home Gym (Full Equipment)", description: "Weights, rack, bench" },
      { value: "home_minimal", label: "Home (Minimal Equipment)", description: "Dumbbells, resistance bands" },
      { value: "bodyweight", label: "Bodyweight Only", description: "No equipment needed" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_equipment",
    type: "checkbox",
    question: "What equipment do you have access to?",
    description: "Select all that apply",
    options: [
      { value: "barbell", label: "Barbell" },
      { value: "dumbbells", label: "Dumbbells" },
      { value: "kettlebells", label: "Kettlebells" },
      { value: "resistance_bands", label: "Resistance Bands" },
      { value: "pull_up_bar", label: "Pull-up Bar" },
      { value: "bench", label: "Bench" },
      { value: "squat_rack", label: "Squat Rack" },
      { value: "cable_machine", label: "Cable Machine" },
      { value: "cardio", label: "Cardio Equipment" },
      { value: "none", label: "None (Bodyweight only)" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_injuries",
    type: "textarea",
    question: "Do you have any injuries or physical limitations?",
    description: "List any injuries, pain, or movements to avoid (optional but important)",
    required: false,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_cardio_preference",
    type: "radio",
    question: "What is your cardio preference?",
    options: [
      { value: "none", label: "Minimal/None", description: "Focus on strength training" },
      { value: "light", label: "Light Cardio", description: "1-2 sessions/week" },
      { value: "moderate", label: "Moderate Cardio", description: "2-3 sessions/week" },
      { value: "high", label: "High Cardio", description: "3+ sessions/week" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_split_preference",
    type: "radio",
    question: "Do you have a training split preference?",
    options: [
      { value: "full_body", label: "Full Body", description: "Train all muscles each session" },
      { value: "upper_lower", label: "Upper/Lower Split", description: "Alternate upper and lower body" },
      { value: "push_pull_legs", label: "Push/Pull/Legs", description: "Classic 3-day split" },
      { value: "body_part", label: "Body Part Split", description: "One muscle group per day" },
      { value: "flexible", label: "No Preference", description: "Let AI decide" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_age_gender",
    type: "text",
    question: "Please provide your age and gender",
    description: "This helps us tailor exercise selection and intensity",
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },

  // Advanced Questions (11-15)
  {
    id: "workout_rep_range",
    type: "radio",
    question: "Do you have a preferred rep range?",
    options: [
      { value: "strength", label: "Strength (1-5 reps)", description: "Heavy weight, low reps" },
      { value: "hypertrophy", label: "Hypertrophy (6-12 reps)", description: "Muscle building" },
      { value: "endurance", label: "Endurance (12+ reps)", description: "Higher reps, lighter weight" },
      { value: "mixed", label: "Mixed/Periodized", description: "Vary rep ranges" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_intensity",
    type: "radio",
    question: "What training intensity do you prefer?",
    options: [
      { value: "moderate", label: "Moderate", description: "Sustainable, steady progress" },
      { value: "high", label: "High Intensity", description: "Push hard, maximize results" },
      { value: "variable", label: "Variable", description: "Mix of intensities" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_mobility",
    type: "radio",
    question: "Do you want mobility/flexibility work included?",
    options: [
      { value: "yes_integrated", label: "Yes - Integrated into workouts" },
      { value: "yes_separate", label: "Yes - Separate sessions" },
      { value: "minimal", label: "Minimal - Just warm-up/cool-down" },
      { value: "no", label: "No - Focus on strength only" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_tracking",
    type: "radio",
    question: "How do you prefer to track your workouts?",
    options: [
      { value: "detailed", label: "Detailed Logging", description: "Track every set, rep, weight" },
      { value: "simple", label: "Simple Tracking", description: "Basic completion tracking" },
      { value: "none", label: "No Tracking", description: "Just follow the plan" },
    ],
    required: false,
    tier: "advanced",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workout_additional_notes",
    type: "textarea",
    question: "Any additional information or specific requests?",
    description: "Share anything else that would help us create your perfect workout plan",
    required: false,
    tier: "advanced",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
]

// GLP-1 Questions (optional add-on)
export const glp1Questions: Question[] = [
  {
    id: "glp1_medication",
    type: "radio",
    question: "Which GLP-1 medication are you taking?",
    options: [
      { value: "ozempic", label: "Ozempic (Semaglutide)" },
      { value: "wegovy", label: "Wegovy (Semaglutide)" },
      { value: "mounjaro", label: "Mounjaro (Tirzepatide)" },
      { value: "saxenda", label: "Saxenda (Liraglutide)" },
      { value: "other", label: "Other (specify in notes)" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "glp1_duration",
    type: "radio",
    question: "How long have you been on GLP-1 medication?",
    options: [
      { value: "new", label: "Just starting (0-4 weeks)" },
      { value: "recent", label: "Recent (1-3 months)" },
      { value: "established", label: "Established (3-6 months)" },
      { value: "long_term", label: "Long-term (6+ months)" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "glp1_side_effects",
    type: "checkbox",
    question: "Are you experiencing any side effects?",
    description: "Select all that apply",
    options: [
      { value: "nausea", label: "Nausea" },
      { value: "appetite_loss", label: "Severe appetite loss" },
      { value: "fatigue", label: "Fatigue" },
      { value: "constipation", label: "Constipation" },
      { value: "diarrhea", label: "Diarrhea" },
      { value: "none", label: "No side effects" },
    ],
    required: true,
    tier: "standard",
    backgroundImage: "/placeholder.svg?height=400&width=600",
  },
]
