/**
 * Fetches an image URL on the server and returns a base64 data URI.
 * This avoids COEP issues since the browser never makes a cross-origin request.
 */
export async function toDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null

    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await res.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    return `data:${contentType};base64,${base64}`
  } catch {
    return null
  }
}
