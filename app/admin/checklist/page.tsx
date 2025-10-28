"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertCircle, Loader2, Trash2 } from "lucide-react"

export default function AdminChecklistPage() {
  const [token, setToken] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)

  const [dbStatus, setDbStatus] = useState<any>(null)
  const [dbDryRun, setDbDryRun] = useState<any>(null)
  const [oauthStatus, setOauthStatus] = useState<any>(null)
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [showTeardown, setShowTeardown] = useState(false)

  const authorize = () => {
    if (token) {
      setIsAuthorized(true)
    }
  }

  const previewDbBootstrap = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/db-bootstrap?dryRun=true", {
        method: "POST",
        headers: { "x-setup-token": token },
      })
      const data = await response.json()
      setDbDryRun(data)
    } catch (error: any) {
      setDbDryRun({ error: error.message })
    }
    setLoading(false)
  }

  const runDbBootstrap = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/db-bootstrap", {
        method: "POST",
        headers: { "x-setup-token": token },
      })
      const data = await response.json()
      setDbStatus(data)
      setDbDryRun(null)
    } catch (error: any) {
      setDbStatus({ error: error.message })
    }
    setLoading(false)
  }

  const runOAuthVerify = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/oauth-verify?token=${token}`)
      const data = await response.json()
      setOauthStatus(data)
    } catch (error: any) {
      setOauthStatus({ error: error.message })
    }
    setLoading(false)
  }

  const runEnvAudit = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/env-audit?token=${token}`)
      const data = await response.json()
      setEnvStatus(data)
    } catch (error: any) {
      setEnvStatus({ error: error.message })
    }
    setLoading(false)
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Setup Checklist</CardTitle>
            <CardDescription>Enter your admin setup token to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Admin Setup Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && authorize()}
              />
              <Button onClick={authorize} className="w-full">
                Authorize
              </Button>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Token is stored in environment variable: ADMIN_SETUP_TOKEN</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Setup Checklist</h1>
          <p className="text-gray-600">Automate and verify all setup steps</p>
        </div>

        {/* Database Bootstrap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>1. Database Bootstrap</span>
              {dbStatus?.success && <CheckCircle2 className="text-green-600" />}
            </CardTitle>
            <CardDescription>Execute SQL scripts to create tables and triggers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={previewDbBootstrap} disabled={loading} variant="outline">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Preview (Dry-Run)
              </Button>
              <Button onClick={runDbBootstrap} disabled={loading || !dbDryRun}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Run Now
              </Button>
            </div>

            {dbDryRun && !dbStatus && (
              <Alert className="border-blue-600">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <strong>Preview:</strong> Will execute 2 SQL scripts to create profiles, orders, plans tables and
                  OAuth trigger. Click "Run Now" to proceed.
                </AlertDescription>
              </Alert>
            )}

            {dbStatus && (
              <div className="space-y-2">
                {dbStatus.success ? (
                  <Alert className="border-green-600">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription>{dbStatus.message}</AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{dbStatus.error || dbStatus.message}</AlertDescription>
                  </Alert>
                )}

                {dbStatus.results && (
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Script 1 (Tables):</strong> {dbStatus.results.script1.status}
                      {dbStatus.results.script1.tables && (
                        <div className="ml-4 text-gray-600">Tables: {dbStatus.results.script1.tables.join(", ")}</div>
                      )}
                    </div>
                    <div>
                      <strong>Script 2 (Trigger):</strong> {dbStatus.results.script2.status}
                      {dbStatus.results.script2.trigger && (
                        <div className="ml-4 text-gray-600">Trigger: {dbStatus.results.script2.trigger}</div>
                      )}
                    </div>
                  </div>
                )}

                {dbStatus.instructions && (
                  <div className="bg-gray-100 p-4 rounded text-sm">
                    <strong>Manual Steps (if automated execution failed):</strong>
                    <ul className="list-disc ml-4 mt-2 space-y-1">
                      {dbStatus.instructions.manual_steps.map((step: string, i: number) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* OAuth Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>2. OAuth Providers</span>
              {oauthStatus?.googleEnabled && oauthStatus?.githubEnabled && <CheckCircle2 className="text-green-600" />}
            </CardTitle>
            <CardDescription>Verify Google and GitHub OAuth configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runOAuthVerify} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Verify OAuth Providers
            </Button>

            {oauthStatus && (
              <div className="space-y-4">
                {oauthStatus.error ? (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{oauthStatus.error}</AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        {oauthStatus.googleEnabled ? (
                          <CheckCircle2 className="text-green-600" />
                        ) : (
                          <XCircle className="text-red-600" />
                        )}
                        <span>Google OAuth</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {oauthStatus.githubEnabled ? (
                          <CheckCircle2 className="text-green-600" />
                        ) : (
                          <XCircle className="text-red-600" />
                        )}
                        <span>GitHub OAuth</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
                      <div>
                        <strong>Expected Callback URL:</strong>
                        <div className="font-mono text-xs mt-1 bg-white p-2 rounded">
                          {oauthStatus.expectedCallback}
                        </div>
                      </div>
                      <div>
                        <strong>App Redirect URL:</strong>
                        <div className="font-mono text-xs mt-1 bg-white p-2 rounded">{oauthStatus.redirectUrl}</div>
                      </div>
                    </div>

                    {oauthStatus.instructions && (
                      <div className="space-y-4">
                        {!oauthStatus.googleEnabled && (
                          <div className="bg-yellow-50 p-4 rounded">
                            <strong className="text-yellow-800">Google OAuth Setup:</strong>
                            <ul className="list-disc ml-4 mt-2 space-y-1 text-sm">
                              {oauthStatus.instructions.google.steps.map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {!oauthStatus.githubEnabled && (
                          <div className="bg-yellow-50 p-4 rounded">
                            <strong className="text-yellow-800">GitHub OAuth Setup:</strong>
                            <ul className="list-disc ml-4 mt-2 space-y-1 text-sm">
                              {oauthStatus.instructions.github.steps.map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Environment Audit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>3. Environment Variables</span>
              {envStatus?.status === "ready" && <CheckCircle2 className="text-green-600" />}
            </CardTitle>
            <CardDescription>Verify all required environment variables are set</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={runEnvAudit} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Run Environment Audit
            </Button>

            {envStatus && (
              <div className="space-y-4">
                {envStatus.error ? (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{envStatus.error}</AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <Alert className={envStatus.status === "ready" ? "border-green-600" : "border-yellow-600"}>
                      {envStatus.status === "ready" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      )}
                      <AlertDescription>{envStatus.instructions}</AlertDescription>
                    </Alert>

                    {envStatus.audit && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(envStatus.audit).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            {value ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span>{key}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {envStatus.missing && envStatus.missing.length > 0 && (
                      <div className="bg-red-50 p-4 rounded">
                        <strong className="text-red-800">Missing Required Variables:</strong>
                        <ul className="list-disc ml-4 mt-2 space-y-2 text-sm">
                          {envStatus.missing.map((item: any, i: number) => (
                            <li key={i}>
                              <strong>{item.var}</strong>: {item.description}
                              {item.example && <div className="text-gray-600">Example: {item.example}</div>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {envStatus.warnings && envStatus.warnings.length > 0 && (
                      <div className="bg-yellow-50 p-4 rounded">
                        <strong className="text-yellow-800">Optional Variables:</strong>
                        <ul className="list-disc ml-4 mt-2 space-y-2 text-sm">
                          {envStatus.warnings.map((item: any, i: number) => (
                            <li key={i}>
                              <strong>{item.var}</strong>: {item.description}
                              {item.example && <div className="text-gray-600">Example: {item.example}</div>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Trash2 className="w-5 h-5" />
              Remove Admin Tools
            </CardTitle>
            <CardDescription>After completing all setup steps, remove these temporary admin tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setShowTeardown(!showTeardown)} variant="destructive">
              {showTeardown ? "Hide" : "Show"} Removal Instructions
            </Button>

            {showTeardown && (
              <div className="bg-red-50 p-4 rounded space-y-4">
                <div>
                  <strong className="text-red-800">Files to Delete:</strong>
                  <ul className="list-disc ml-4 mt-2 space-y-1 text-sm font-mono">
                    <li>app/admin/checklist/page.tsx</li>
                    <li>app/api/admin/db-bootstrap/route.ts</li>
                    <li>app/api/admin/oauth-verify/route.ts</li>
                    <li>app/api/admin/env-audit/route.ts</li>
                  </ul>
                </div>

                <div>
                  <strong className="text-red-800">Git Commands:</strong>
                  <div className="bg-white p-3 rounded mt-2 font-mono text-xs space-y-1">
                    <div>git rm app/admin/checklist/page.tsx</div>
                    <div>git rm app/api/admin/db-bootstrap/route.ts</div>
                    <div>git rm app/api/admin/oauth-verify/route.ts</div>
                    <div>git rm app/api/admin/env-audit/route.ts</div>
                    <div>git commit -m "chore: remove one-time admin setup tools"</div>
                    <div>git push</div>
                  </div>
                </div>

                <Alert className="border-red-600">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    After deletion, these admin routes will return 404. This is expected and secure.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>After completing all checks above:</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Test sign-up flow at /sign-up</li>
              <li>Test Google OAuth at /sign-in</li>
              <li>Complete a test purchase with Stripe test card: 4242 4242 4242 4242</li>
              <li>Verify dashboard loads with real data at /dashboard</li>
              <li>Test all dashboard links and PDF downloads</li>
              <li>Test Stripe customer portal</li>
              <li>Delete admin tools using the instructions above</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
