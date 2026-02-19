"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmailInput } from "@/components/email-input"
import { EmailOutput } from "@/components/email-output"
import { ToneSelector, type Tone } from "@/components/tone-selector"

// Default to the provided backend endpoint. You can override with `NEXT_PUBLIC_API_URL`.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/email"

export function EmailGenerator() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState<Tone>("")
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!emailContent.trim()) return

    setIsLoading(true)
    setError(null)
    setGeneratedEmail("")

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent.trim(),
          tone: tone || undefined,
        }),
      })

      if (!response.ok) {
        const text = await response.text().catch(() => "")
        throw new Error(text || `Failed to generate email (${response.status})`)
      }

      const contentType = response.headers.get("content-type") || ""
      let data: any = null
      if (contentType.includes("application/json")) {
        data = await response.json().catch(() => null)
      } else {
        data = await response.text().catch(() => "")
      }

      if (data === null || data === "") {
        setGeneratedEmail("")
      } else if (typeof data === "string") {
        setGeneratedEmail(data)
      } else {
        setGeneratedEmail(data.email || data.generatedEmail || data.result || data.message || "")
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setEmailContent("")
    setTone("")
    setGeneratedEmail("")
    setError(null)
  }

  const canGenerate = emailContent.trim().length > 0 && !isLoading

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden border-border/50 bg-card shadow-lg shadow-background/50">
        <CardContent className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Side */}
            <div className="flex flex-col gap-6">
              <EmailInput value={emailContent} onChange={setEmailContent} />
              <ToneSelector value={tone} onChange={setTone} />
            </div>

            {/* Output Side */}
            <div className="flex flex-col gap-4">
              <EmailOutput content={generatedEmail} isLoading={isLoading} />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isLoading || (!emailContent && !generatedEmail)}
              className="rounded-xl bg-transparent"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Clear All
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="rounded-xl px-8 font-semibold"
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  Generate Email
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
