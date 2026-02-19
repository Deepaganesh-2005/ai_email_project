export const runtime = "nodejs"

export async function POST(req: Request) {
  const backendUrl = process.env.SERVER_API_URL ?? "http://localhost:8080/api/email"

  // Forward the incoming request body directly to the backend
  const body = await req.text().catch(() => "")

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const contentType = res.headers.get("content-type") || "application/json"
  const text = await res.text().catch(() => "")

  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": contentType,
    },
  })
}
