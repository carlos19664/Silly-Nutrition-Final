// Stripe Price ID mapping
export const STRIPE_PRICE_IDS = {
  MEAL_PLAN: "price_1SCgSXRrgAHCpfVe3Y2mxtf5", // £49 one-time
  WORKOUT_PLAN: "price_1SCgnmRrgAHCpfVeSRrnSOiz", // £39 one-time
  COMPLETE_PLAN: "price_1SChC2RrgAHCpfVewcED3yFn", // £79 one-time
  ESSENTIAL_PLAN: "price_1S9XIIRrgAHCpfVeesCoLjuJ", // £89.99/month
  COACHING_PLAN: "price_1S9XQsRrgAHCpfVeg4s7epI2", // £199/month
  GLP1_SINGLE: "price_1SIdi3RrgAHCpfVedBXldJeK", // £49 one-time
  GLP1_MONTHLY: "price_1SIdE4RrgAHCpfVeOzdjI2zN", // £99/month
} as const

// Stripe Product ID mapping
export const STRIPE_PRODUCTS = {
  COMPLETE_PLAN: "prod_T8zAUtewF3E4s8",
  WORKOUT_PLAN: "prod_T8ylikMxmOoFME",
  MEAL_PLAN: "prod_T8yPaijUec8KUT",
  ESSENTIAL_PLAN: "prod_T5ijuxsfbLgRSP",
  COACHING_PLAN: "prod_T5imW60V83qIAQ",
} as const

export type PlanType =
  | "single-meal"
  | "single-workout"
  | "single-complete"
  | "essential"
  | "coaching"
  | "glp1-single"
  | "glp1-monthly"

export interface PlanConfig {
  productId: string
  priceId: string
  priceAmount: number
  name: string
  isRecurring: boolean
  description: string
}

export const PLAN_CONFIGS: Record<PlanType, PlanConfig> = {
  "single-meal": {
    productId: STRIPE_PRODUCTS.MEAL_PLAN,
    priceId: STRIPE_PRICE_IDS.MEAL_PLAN, // Added Price ID
    priceAmount: 4900, // £49.00 (regular price)
    name: "Single Meal Plan",
    isRecurring: false,
    description: "7-day personalized meal plan with shopping lists",
  },
  "single-workout": {
    productId: STRIPE_PRODUCTS.WORKOUT_PLAN,
    priceId: STRIPE_PRICE_IDS.WORKOUT_PLAN, // Added Price ID
    priceAmount: 3900, // £39.00 (regular price)
    name: "Single Workout Plan",
    isRecurring: false,
    description: "7-day workout routine tailored to your level",
  },
  "single-complete": {
    productId: STRIPE_PRODUCTS.COMPLETE_PLAN,
    priceId: STRIPE_PRICE_IDS.COMPLETE_PLAN,
    priceAmount: 7900, // £79.00
    name: "Complete Package",
    isRecurring: false,
    description: "Both meal and workout plans together",
  },
  essential: {
    productId: STRIPE_PRODUCTS.ESSENTIAL_PLAN,
    priceId: STRIPE_PRICE_IDS.ESSENTIAL_PLAN,
    priceAmount: 8999, // £89.99/month
    name: "Essential Plan",
    isRecurring: true,
    description: "Monthly AI-generated meal plans and workouts",
  },
  coaching: {
    productId: STRIPE_PRODUCTS.COACHING_PLAN,
    priceId: STRIPE_PRICE_IDS.COACHING_PLAN,
    priceAmount: 19900, // £199.00/month
    name: "Coaching Plan",
    isRecurring: true,
    description: "Weekly personalized plans with priority support",
  },
  "glp1-single": {
    productId: STRIPE_PRODUCTS.MEAL_PLAN,
    priceId: STRIPE_PRICE_IDS.GLP1_SINGLE,
    priceAmount: 4900, // £49.00
    name: "GLP-1 Single Plan",
    isRecurring: false,
    description: "Specialized nutrition plan for GLP-1 medications",
  },
  "glp1-monthly": {
    productId: STRIPE_PRODUCTS.ESSENTIAL_PLAN,
    priceId: STRIPE_PRICE_IDS.GLP1_MONTHLY,
    priceAmount: 9900, // £99.00/month
    name: "GLP-1 Monthly Coaching",
    isRecurring: true,
    description: "Ongoing GLP-1 nutrition support and adjustments",
  },
}

export function formatPrice(amount: number): string {
  return `£${(amount / 100).toFixed(2)}`
}

export function getPlanConfig(planType: PlanType): PlanConfig {
  const config = PLAN_CONFIGS[planType]
  if (!config) {
    throw new Error(`Invalid plan type: ${planType}`)
  }
  return config
}
