import apodData from './generated/apod'
import neoData from './generated/neo'
import planetImagesData from './generated/planet-images'

export interface ApodData {
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: string
  date: string
  copyright?: string
  _localImage?: string
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

export interface CachedImage {
  title: string
  nasa_id: string
  date_created: string
  localImage: string | null
}

export function getApod(): ApodData | null {
  return apodData as any
}

export function getNeoFeed(): NeoFeedResponse | null {
  return neoData as any
}

export function getPlanetImages(planetId: string): CachedImage[] {
  if (!planetImagesData) return []
  return (planetImagesData as any)[planetId] ?? []
}
