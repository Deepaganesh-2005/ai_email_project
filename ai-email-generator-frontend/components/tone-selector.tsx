"use client"

import { cn } from "@/lib/utils"

const TONES = [
  { value: "", label: "None", description: "No specific tone" },
  { value: "friendly", label: "Friendly", description: "Warm & approachable" },
  { value: "casual", label: "Casual", description: "Relaxed & informal" },
  { value: "professional", label: "Professional", description: "Formal & polished" },
] as const

export type Tone = (typeof TONES)[number]["value"]

interface ToneSelectorProps {
  value: Tone
  onChange: (tone: Tone) => void
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">
        Select Tone
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            className={cn(
              "relative flex flex-col items-center gap-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200",
              "hover:border-primary/50 hover:bg-accent/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              value === tone.value
                ? "border-primary bg-accent text-accent-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            <span className={cn(
              "text-sm font-semibold",
              value === tone.value ? "text-foreground" : "text-foreground/80"
            )}>
              {tone.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {tone.description}
            </span>
            {value === tone.value && (
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <svg
                  className="h-3 w-3 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
