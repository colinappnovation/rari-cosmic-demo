const BASE = typeof process !== 'undefined' && process.env.RARI_ORIGIN
  ? process.env.RARI_ORIGIN
  : 'http://localhost:3000'

export interface ApodResponse {
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: string
  date: string
  copyright?: string
}

export interface NeoObject {
  id: string
  name: string
  absolute_magnitude_h: number
  estimated_diameter: {
    meters: { estimated_diameter_min: number; estimated_diameter_max: number }
  }
  is_potentially_hazardous_asteroid: boolean
  close_approach_data: {
    close_approach_date: string
    relative_velocity: { kilometers_per_hour: string }
    miss_distance: { kilometers: string; lunar: string }
  }[]
}

export interface NeoFeedResponse {
  element_count: number
  near_earth_objects: Record<string, NeoObject[]>
}

export interface NasaImage {
  title: string
  description: string
  nasa_id: string
  date_created: string
  thumbUrl: string
  mediumUrl?: string
}

export async function fetchApod(): Promise<ApodResponse | null> {
  try {
    const res = await fetch(`${BASE}/api/nasa/apod`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchNeoFeed(): Promise<NeoFeedResponse | null> {
  try {
    const res = await fetch(`${BASE}/api/nasa/neo`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchNasaImages(
  query: string,
  count = 6,
): Promise<NasaImage[]> {
  try {
    const res = await fetch(
      `${BASE}/api/nasa/images?q=${encodeURIComponent(query)}&count=${count}`,
    )
    if (!res.ok) return []
    const data = await res.json()
    const items = data.collection?.items ?? []

    return items
      .filter((item: any) => item.links?.length > 0 && item.data?.length > 0)
      .map((item: any) => {
        const meta = item.data[0]
        const thumb = item.links.find((l: any) => l.rel === 'preview')
        const medium = item.links.find(
          (l: any) => l.rel === 'alternate' && l.width && l.width >= 640 && l.width <= 1280,
        )
        return {
          title: meta.title,
          description: meta.description ?? '',
          nasa_id: meta.nasa_id,
          date_created: meta.date_created,
          thumbUrl: thumb?.href ?? item.links[0].href,
          mediumUrl: medium?.href,
        }
      })
  } catch {
    return []
  }
}

/**
 * Returns a proxied image URL that goes through our API route,
 * avoiding COEP issues with external NASA image servers.
 */
export function proxyImageUrl(originalUrl: string): string {
  return `/api/nasa/image-proxy?url=${encodeURIComponent(originalUrl)}`
}
