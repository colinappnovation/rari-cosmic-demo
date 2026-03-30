import type { PageProps, Metadata } from 'rari'
import { missions } from '@/data/space'
import MissionTimeline from '@/components/MissionTimeline'

export default function MissionsPage(_params: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Space Missions</h1>
        <p className="text-gray-500">
          A timeline of humanity's most ambitious ventures beyond Earth.
        </p>
      </div>

      <div className="flex gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-gray-500">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
          <span className="text-gray-500">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-gray-500">Planned</span>
        </div>
      </div>

      <MissionTimeline missions={missions} />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Missions | Cosmic Explorer',
  description: 'Timeline of space exploration missions',
}
