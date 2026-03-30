export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return new Response('Missing url parameter', { status: 400 })
  }

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return new Response('Failed to fetch image', { status: res.status })
    }

    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    })
  } catch {
    return new Response('Image fetch failed', { status: 502 })
  }
}
