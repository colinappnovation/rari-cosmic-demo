const API_KEY = 'DEMO_KEY'

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`,
  )

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch NEO data' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
