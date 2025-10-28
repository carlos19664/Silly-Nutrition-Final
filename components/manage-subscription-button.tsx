"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleManageSubscription = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error creating portal session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full mt-4 bg-transparent"
      onClick={handleManageSubscription}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Manage Subscription"}
    </Button>
  )
}
