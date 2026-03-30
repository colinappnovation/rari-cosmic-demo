import type { Mission } from '@/data/space'

const statusStyles = {
  active: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
  planned: 'bg-blue-100 text-blue-700 border-blue-200',
}

const statusDot = {
  active: 'bg-green-500',
  completed: 'bg-gray-400',
  planned: 'bg-blue-500',
}

export default function MissionTimeline({ missions }: { missions: Mission[] }) {
  const sorted = [...missions].sort((a, b) => b.year - a.year)

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />
      <div className="space-y-6">
        {sorted.map(mission => (
          <div key={mission.id} className="relative flex gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-xs font-bold text-white ${statusDot[mission.status]}`}
              >
                {mission.year.toString().slice(-2)}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{mission.name}</h3>
                  <p className="text-sm text-gray-400">{mission.year} &middot; {mission.target}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyles[mission.status]}`}
                >
                  {mission.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{mission.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
