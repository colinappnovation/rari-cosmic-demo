const API_KEY = 'DEMO_KEY'

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
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
    )
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchNeoFeed(): Promise<NeoFeedResponse | null> {
  try {
    const today = new Date().toISOString().split('T')[0]
    const res = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`,
    )
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
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${count}`,
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
