/**
 * Pre-build script: fetches NASA API data and downloads images locally.
 * Run before `rari build` so server components can read static files
 * instead of making outbound HTTP requests (which rari's Rust V8 can't do).
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const API_KEY = 'DEMO_KEY'
const DATA_DIR = join(import.meta.dirname, '..', 'src', 'data', '.cache')
const PUBLIC_IMG_DIR = join(import.meta.dirname, '..', 'public', 'nasa')

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

async function downloadImage(url: string, filename: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    const ext = url.split('.').pop()?.split('?')[0] ?? 'jpg'
    const file = `${filename}.${ext}`
    const path = join(PUBLIC_IMG_DIR, file)
    writeFileSync(path, buffer)
    return `/nasa/${file}`
  } catch (e) {
    console.warn(`  Failed to download ${url}:`, (e as Error).message)
    return null
  }
}

async function fetchApod() {
  console.log('Fetching APOD...')
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    if (!res.ok) throw new Error(`Status ${res.status}`)
    const data = await res.json()

    if (data.media_type === 'image' && data.url) {
      const localPath = await downloadImage(data.url, 'apod')
      if (localPath) data._localImage = localPath
    }

    writeFileSync(join(DATA_DIR, 'apod.json'), JSON.stringify(data, null, 2))
    console.log(`  OK: "${data.title}"`)
  } catch (e) {
    console.warn('  APOD failed:', (e as Error).message)
    if (!existsSync(join(DATA_DIR, 'apod.json'))) {
      writeFileSync(join(DATA_DIR, 'apod.json'), 'null')
    } else {
      console.log('  Using existing cached data')
    }
  }
}

async function fetchNeo() {
  console.log('Fetching NEO feed...')
  try {
    const today = new Date().toISOString().split('T')[0]
    const res = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`,
    )
    if (!res.ok) throw new Error(`Status ${res.status}`)
    const data = await res.json()
    writeFileSync(join(DATA_DIR, 'neo.json'), JSON.stringify(data, null, 2))
    console.log(`  OK: ${data.element_count} objects`)
  } catch (e) {
    console.warn('  NEO failed:', (e as Error).message)
    if (!existsSync(join(DATA_DIR, 'neo.json'))) {
      writeFileSync(join(DATA_DIR, 'neo.json'), 'null')
    } else {
      console.log('  Using existing cached data')
    }
  }
}

async function fetchPlanetImages() {
  const queries: Record<string, string> = {
    mercury: 'MESSENGER Mercury planet surface',
    venus: 'Magellan Venus planet atmosphere',
    earth: 'Earth from space blue marble',
    mars: 'Mars red planet surface Perseverance',
    jupiter: 'Jupiter great red spot Juno',
    saturn: 'Saturn rings Cassini planet',
    uranus: 'Uranus planet Voyager ice giant',
    neptune: 'Neptune planet Voyager blue',
  }

  const allImages: Record<string, any[]> = {}

  for (const [planet, query] of Object.entries(queries)) {
    console.log(`Fetching images for ${planet}...`)
    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=6`,
      )
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      const items = data.collection?.items ?? []

      const images = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (!item.links?.length || !item.data?.length) continue
        const meta = item.data[0]
        const thumb = item.links.find((l: any) => l.rel === 'preview')
        const thumbUrl = thumb?.href ?? item.links[0].href

        const localPath = await downloadImage(thumbUrl, `${planet}-${i}`)

        images.push({
          title: meta.title,
          nasa_id: meta.nasa_id,
          date_created: meta.date_created,
          localImage: localPath,
        })
      }

      allImages[planet] = images
      console.log(`  OK: ${images.length} images`)
    } catch (e) {
      console.warn(`  ${planet} failed:`, (e as Error).message)
      allImages[planet] = []
    }
  }

  writeFileSync(join(DATA_DIR, 'planet-images.json'), JSON.stringify(allImages, null, 2))
}

async function main() {
  console.log('=== Fetching NASA data ===\n')
  ensureDir(DATA_DIR)
  ensureDir(PUBLIC_IMG_DIR)

  await fetchApod()
  await fetchNeo()
  await fetchPlanetImages()

  console.log('\nDone! Data cached in src/data/.cache/')
}

main().catch(console.error)
