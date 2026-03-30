import { getNeoFeed } from '@/data/nasa'

export default function NeoTracker() {
  const feed = getNeoFeed()

  if (!feed) {
    return (
      <div className="bg-surface-container rounded-sm p-6 ghost-border text-center text-outline">
        No asteroid data available. Run <code className="text-secondary">bun run fetch-nasa</code> to fetch data.
      </div>
    )
  }

  const allNeos = Object.values(feed.near_earth_objects).flat()
  const sorted = [...allNeos].sort((a, b) => {
    const distA = Number(a.close_approach_data[0]?.miss_distance.kilometers ?? Infinity)
    const distB = Number(b.close_approach_data[0]?.miss_distance.kilometers ?? Infinity)
    return distA - distB
  })
  const display = sorted.slice(0, 5)
  const hazardous = allNeos.filter(n => n.is_potentially_hazardous_asteroid).length

  return (
    <div className="bg-surface-container rounded-sm ghost-border overflow-hidden glow-primary">
      <div className="p-5 border-b border-outline-variant/15">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-on-surface">Near-Earth Objects</h3>
          <div className="flex items-center gap-3 text-sm" style={{ fontFamily: 'var(--font-family-label)' }}>
            <span className="text-on-surface-variant">{feed.element_count} tracked</span>
            {hazardous > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-error-container/30 text-error ghost-border text-xs font-medium">
                {hazardous} hazardous
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-outline mt-1" style={{ fontFamily: 'var(--font-family-label)' }}>Data from NASA NEO API</p>
      </div>

      <div className="divide-y divide-outline-variant/10">
        {display.map(neo => {
          const approach = neo.close_approach_data[0]
          const minDiam = Math.round(neo.estimated_diameter.meters.estimated_diameter_min)
          const maxDiam = Math.round(neo.estimated_diameter.meters.estimated_diameter_max)
          const distKm = Number(approach?.miss_distance.kilometers ?? 0)
          const distLunar = Number(approach?.miss_distance.lunar ?? 0).toFixed(1)
          const speed = Number(approach?.relative_velocity.kilometers_per_hour ?? 0)

          return (
            <div key={neo.id} className="px-5 py-3 flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  neo.is_potentially_hazardous_asteroid
                    ? 'bg-error-container/30 text-error'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {neo.is_potentially_hazardous_asteroid ? '!' : '*'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-on-surface truncate">
                    {neo.name}
                  </span>
                  {neo.is_potentially_hazardous_asteroid && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-error-container/30 text-error">
                      PHA
                    </span>
                  )}
                </div>
                <div className="text-xs text-outline mt-0.5" style={{ fontFamily: 'var(--font-family-label)' }}>
                  {minDiam}-{maxDiam}m diameter
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm text-on-surface-variant">
                  {(distKm / 1_000_000).toFixed(1)}M km
                </div>
                <div className="text-xs text-outline" style={{ fontFamily: 'var(--font-family-label)' }}>
                  {distLunar} lunar &middot; {Math.round(speed).toLocaleString()} km/h
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-5 py-3 bg-surface-container-low text-xs text-outline text-center" style={{ fontFamily: 'var(--font-family-label)' }}>
        Distances are closest approach to Earth &middot; PHA = Potentially Hazardous Asteroid
      </div>
    </div>
  )
}
