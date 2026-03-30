const API_KEY = 'DEMO_KEY'

export async function GET() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  )

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch APOD' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
