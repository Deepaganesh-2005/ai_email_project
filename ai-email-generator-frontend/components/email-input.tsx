"use client"

import { Textarea } from "@/components/ui/textarea"

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
}

export function EmailInput({ value, onChange }: EmailInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label htmlFor="email-input" className="text-sm font-medium text-foreground">
          Paste Your Email
        </label>
        {value.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {value.length} characters
          </span>
        )}
      </div>
      <Textarea
        id="email-input"
        placeholder="Paste your email content here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[220px] resize-none rounded-xl bg-muted/50 text-sm leading-relaxed transition-colors focus:bg-card"
      />
    </div>
  )
}
