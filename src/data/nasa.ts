import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const CACHE_DIR = join(dirname(fileURLToPath(import.meta.url)), '.cache')

function readCache<T>(filename: string): T | null {
  try {
    const raw = readFileSync(join(CACHE_DIR, filename), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

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
  return readCache<ApodData>('apod.json')
}

export function getNeoFeed(): NeoFeedResponse | null {
  return readCache<NeoFeedResponse>('neo.json')
}

export function getPlanetImages(planetId: string): CachedImage[] {
  const all = readCache<Record<string, CachedImage[]>>('planet-images.json')
  return all?.[planetId] ?? []
}
