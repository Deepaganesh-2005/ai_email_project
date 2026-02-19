import { EmailGenerator } from "@/components/email-generator"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">AI Email Generator</h1>
              <p className="text-xs text-muted-foreground">Refine your emails with AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-accent-foreground">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Transform Your Emails Instantly
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground">
            Paste your email, choose a tone, and let AI craft the perfect message for you.
          </p>
        </div>

        <EmailGenerator />

        {/* How it works */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Paste Your Email",
              description: "Copy and paste the email you want to refine into the input field.",
            },
            {
              step: "2",
              title: "Choose a Tone",
              description: "Select from friendly, casual, professional, or none to match your intent.",
            },
            {
              step: "3",
              title: "Generate & Copy",
              description: "Click generate and copy the polished email to your clipboard.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-6 text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
