export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? 'space'
  const count = searchParams.get('count') ?? '6'

  const res = await fetch(
    `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${count}`,
  )

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await res.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
