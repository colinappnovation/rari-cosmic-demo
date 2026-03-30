import { getNeoFeed } from '@/data/nasa'

export default function NeoTracker() {
  const feed = getNeoFeed()

  if (!feed) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center text-gray-400">
        No asteroid data available. Run <code>bun run fetch-nasa</code> to fetch data.
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Near-Earth Objects</h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">{feed.element_count} tracked</span>
            {hazardous > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-medium">
                {hazardous} hazardous
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Data from NASA NEO API</p>
      </div>

      <div className="divide-y divide-gray-50">
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
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {neo.is_potentially_hazardous_asteroid ? '!' : '*'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {neo.name}
                  </span>
                  {neo.is_potentially_hazardous_asteroid && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-600">
                      PHA
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {minDiam}-{maxDiam}m diameter
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm text-gray-700">
                  {(distKm / 1_000_000).toFixed(1)}M km
                </div>
                <div className="text-xs text-gray-400">
                  {distLunar} lunar &middot; {Math.round(speed).toLocaleString()} km/h
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-5 py-3 bg-gray-50 text-xs text-gray-400 text-center">
        Distances are closest approach to Earth &middot; PHA = Potentially Hazardous Asteroid
      </div>
    </div>
  )
}
