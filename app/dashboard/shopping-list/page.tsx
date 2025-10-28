import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ShoppingListPage() {
  // Demo shopping list data - in production, fetch from database
  const shoppingList = {
    weekOf: "January 15-21, 2025",
    categories: [
      {
        name: "Proteins",
        items: [
          { name: "Chicken breasts", amount: "600g", checked: false },
          { name: "Salmon fillets", amount: "400g", checked: false },
          { name: "Greek yogurt", amount: "500g", checked: false },
          { name: "Eggs", amount: "12", checked: false },
        ],
      },
      {
        name: "Vegetables",
        items: [
          { name: "Mixed greens", amount: "2 bags", checked: false },
          { name: "Cherry tomatoes", amount: "2 cups", checked: false },
          { name: "Cucumber", amount: "2", checked: false },
          { name: "Red onion", amount: "1", checked: false },
          { name: "Bell peppers", amount: "3", checked: false },
          { name: "Broccoli", amount: "1 head", checked: false },
        ],
      },
      {
        name: "Grains & Carbs",
        items: [
          { name: "Quinoa", amount: "500g", checked: false },
          { name: "Brown rice", amount: "500g", checked: false },
          { name: "Whole wheat bread", amount: "1 loaf", checked: false },
          { name: "Sweet potatoes", amount: "4", checked: false },
        ],
      },
      {
        name: "Dairy & Alternatives",
        items: [
          { name: "Feta cheese", amount: "200g", checked: false },
          { name: "Almond milk", amount: "1L", checked: false },
          { name: "Mozzarella", amount: "200g", checked: false },
        ],
      },
      {
        name: "Pantry",
        items: [
          { name: "Olive oil", amount: "1 bottle", checked: false },
          { name: "Lemons", amount: "3", checked: false },
          { name: "Garlic", amount: "1 bulb", checked: false },
          { name: "Honey", amount: "1 jar", checked: false },
        ],
      },
    ],
  }

  const totalItems = shoppingList.categories.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <div className="min-h-screen bg-[#F1EBDD] p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl text-[#1E4E78] flex items-center gap-2">
                  <ShoppingCart className="w-8 h-8" />
                  Shopping List
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Week of {shoppingList.weekOf} • {totalItems} items
                </CardDescription>
              </div>
              <Button className="bg-[#F4B728] hover:bg-[#E5A61F] text-[#1E4E78]">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {shoppingList.categories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-lg font-semibold text-[#1E4E78] mb-3 pb-2 border-b border-gray-200">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-[#F1EBDD] rounded">
                        <Checkbox id={`${category.name}-${index}`} />
                        <label
                          htmlFor={`${category.name}-${index}`}
                          className="flex-1 flex justify-between cursor-pointer"
                        >
                          <span className="text-gray-900">{item.name}</span>
                          <span className="text-gray-600">{item.amount}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#F1EBDD] rounded-lg">
              <h4 className="font-semibold text-[#1E4E78] mb-2">Shopping Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Check your pantry before shopping to avoid duplicates</li>
                <li>• Buy proteins in bulk and freeze portions for later</li>
                <li>• Choose seasonal vegetables for better prices and freshness</li>
                <li>• Prep ingredients on Sunday to save time during the week</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
