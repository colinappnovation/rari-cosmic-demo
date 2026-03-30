import type { Mission } from '@/data/space'

const statusStyles = {
  active: 'bg-secondary-container/20 text-secondary ghost-border',
  completed: 'bg-surface-container-high text-on-surface-variant ghost-border',
  planned: 'bg-primary-dim/20 text-primary ghost-border',
}

const statusDot = {
  active: 'bg-secondary',
  completed: 'bg-outline',
  planned: 'bg-primary-dim',
}

export default function MissionTimeline({ missions }: { missions: Mission[] }) {
  const sorted = [...missions].sort((a, b) => b.year - a.year)

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-outline-variant/30" />
      <div className="space-y-6">
        {sorted.map(mission => (
          <div key={mission.id} className="relative flex gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full border-4 border-surface shadow-sm flex items-center justify-center text-xs font-bold text-white ${statusDot[mission.status]}`}
              >
                {mission.year.toString().slice(-2)}
              </div>
            </div>
            <div className="flex-1 bg-surface-container rounded-sm p-5 ghost-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-on-surface">{mission.name}</h3>
                  <p className="text-sm text-outline">{mission.year} &middot; {mission.target}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[mission.status]}`}
                  style={{ fontFamily: 'var(--font-family-label)' }}
                >
                  {mission.status}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">{mission.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
