"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Copy } from "lucide-react"

interface DecodedJWT {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  raw: string
}

export default function OAuthCallbackPage() {
  const [params, setParams] = useState<Record<string, string>>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [callbackUrl, setCallbackUrl] = useState("")
  const [decodedTokens, setDecodedTokens] = useState<Record<string, DecodedJWT>>({})

  useEffect(() => {
    // Get query parameters
    const searchParams = new URLSearchParams(window.location.search)
    const queryParams: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      queryParams[key] = value
    })

    // Get hash fragment parameters (for implicit flow)
    const hash = window.location.hash.substring(1)
    const hashParams = new URLSearchParams(hash)
    hashParams.forEach((value, key) => {
      queryParams[key] = value
    })

    setParams(queryParams)
    setCallbackUrl(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)

    // Decode JWTs
    const tokens: Record<string, DecodedJWT> = {}
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value && typeof value === "string" && value.split(".").length === 3) {
        try {
          const decoded = decodeJWT(value)
          if (decoded) {
            tokens[key] = decoded
          }
        } catch (e) {
          // Not a valid JWT, skip
        }
      }
    })
    setDecodedTokens(tokens)
  }, [])

  const decodeJWT = (token: string): DecodedJWT | null => {
    try {
      const parts = token.split(".")
      if (parts.length !== 3) return null

      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))

      return { header, payload, raw: token }
    } catch (e) {
      return null
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const hasParams = Object.keys(params).length > 0

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">OAuth Callback Tester</h1>
          <p className="mt-2 text-muted-foreground">Test OAuth 2.0 and OIDC callback responses</p>
        </div>

        {!hasParams ? (
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Setup Instructions</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Use this URL as your OAuth callback/redirect URI in your OAuth provider configuration:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-sm font-mono">{callbackUrl}</code>
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(callbackUrl, "callback-url")}>
                {copiedKey === "callback-url" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Supported OAuth Flows:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Authorization Code Flow (query parameters)</li>
                <li>Implicit Flow (URL fragment)</li>
                <li>OIDC (OpenID Connect)</li>
                <li>PKCE (Proof Key for Code Exchange)</li>
                <li>Hybrid Flow</li>
              </ul>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Callback Parameters</h2>
              <div className="space-y-3">
                {Object.entries(params).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{key}</span>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(value, key)}>
                        {copiedKey === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <code className="block rounded bg-muted px-3 py-2 text-xs font-mono break-all">{value}</code>
                  </div>
                ))}
              </div>
            </Card>

            {Object.entries(decodedTokens).map(([key, decoded]) => (
              <Card key={key} className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Decoded JWT: {key}</h2>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium">Header</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), `${key}-header`)}
                      >
                        {copiedKey === `${key}-header` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="rounded bg-muted px-3 py-2 text-xs font-mono overflow-x-auto">
                      {JSON.stringify(decoded.header, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium">Payload</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), `${key}-payload`)}
                      >
                        {copiedKey === `${key}-payload` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="rounded bg-muted px-3 py-2 text-xs font-mono overflow-x-auto">
                      {JSON.stringify(decoded.payload, null, 2)}
                    </pre>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
