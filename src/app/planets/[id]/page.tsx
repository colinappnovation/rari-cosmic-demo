import type { PageProps, Metadata } from 'rari'
import { getPlanet, planets } from '@/data/space'
import NasaImageGallery from '@/components/NasaImageGallery'

export default async function PlanetDetailPage({ params }: PageProps) {

  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const planet = getPlanet(id)

  if (!planet) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-outline mb-4">404</h1>
        <p className="text-on-surface-variant mb-6">Planet not found in our star charts.</p>
        <a
          href="/planets"
          className="text-primary hover:text-primary-container no-underline font-medium"
        >
          &larr; Back to planets
        </a>
      </div>
    )
  }

  const idx = planets.findIndex(p => p.id === planet.id)
  const prev = idx > 0 ? planets[idx - 1] : null
  const next = idx < planets.length - 1 ? planets[idx + 1] : null

  return (
    <div className="space-y-8">
      <a
        href="/planets"
        className="inline-flex items-center text-sm text-on-surface-variant hover:text-primary no-underline transition-colors"
      >
        &larr; All planets
      </a>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className={`h-32 bg-gradient-to-r ${planet.color} flex items-center justify-center`}>
          <span className="text-6xl drop-shadow-lg">{planet.emoji}</span>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-on-surface">{planet.name}</h1>
              <span className="text-sm font-medium px-2.5 py-1 rounded-full bg-white/5 text-on-surface-variant mt-2 inline-block"
                style={{ fontFamily: 'var(--font-family-label)' }}
              >
                {planet.type}
              </span>
            </div>
          </div>

          <p className="text-on-surface-variant text-lg mb-6">{planet.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-light rounded-xl p-4 text-center">
              <div className="text-sm text-outline mb-1" style={{ fontFamily: 'var(--font-family-label)' }}>Diameter</div>
              <div className="font-semibold text-on-surface">{planet.diameter}</div>
            </div>
            <div className="glass-light rounded-xl p-4 text-center">
              <div className="text-sm text-outline mb-1" style={{ fontFamily: 'var(--font-family-label)' }}>Distance from Sun</div>
              <div className="font-semibold text-on-surface">{planet.distance}</div>
            </div>
            <div className="glass-light rounded-xl p-4 text-center">
              <div className="text-sm text-outline mb-1" style={{ fontFamily: 'var(--font-family-label)' }}>Moons</div>
              <div className="font-semibold text-on-surface">{planet.moons}</div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-on-surface mb-3">Quick Facts</h2>
            <ul className="space-y-2">
              {planet.facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-on-surface-variant">
                  <span className="text-primary mt-1 flex-shrink-0">*</span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <NasaImageGallery
        planetId={planet.id}
        title={`NASA Images of ${planet.name}`}
      />

      <div className="flex justify-between">
        {prev ? (
          <a
            href={`/planets/${prev.id}`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary no-underline transition-colors"
          >
            &larr; {prev.name}
          </a>
        ) : <div />}
        {next ? (
          <a
            href={`/planets/${next.id}`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary no-underline transition-colors"
          >
            {next.name} &rarr;
          </a>
        ) : <div />}
      </div>

      <div className="glass-panel rounded-xl p-6 text-sm text-on-surface-variant">
        <strong className="text-on-surface">Server-rendered:</strong> This page was rendered on the server using rari's Rust runtime.
        Planet data and NASA images were fetched asynchronously via async Server Components with a dynamic route parameter.
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Planet Detail | Cosmic Explorer',
  description: 'Explore planet details',
}
