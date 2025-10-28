"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" })
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters" })
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Password updated successfully! Redirecting to sign in...",
      })

      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to reset password. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {message && (
            <Alert
              className={`mb-6 ${message.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
