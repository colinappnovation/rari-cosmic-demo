import { planets, missions } from '@/data/space'
import { getNeoFeed } from '@/data/nasa'

export default function StatsBar() {
  const totalMoons = planets.reduce((sum, p) => sum + p.moons, 0)
  const activeMissions = missions.filter(m => m.status === 'active').length
  const neo = getNeoFeed()

  const stats = [
    { label: 'Planets', value: planets.length, icon: '🪐' },
    { label: 'Known Moons', value: totalMoons, icon: '🌙' },
    { label: 'Active Missions', value: activeMissions, icon: '🚀' },
    { label: 'Near-Earth Objects', value: neo?.element_count ?? 0, icon: '☄️' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
