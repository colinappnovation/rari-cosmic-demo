import type { PageProps, Metadata } from 'rari'
import { missions } from '@/data/space'
import MissionTimeline from '@/components/MissionTimeline'

export default function MissionsPage(_params: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">Space Missions</h1>
        <p className="text-on-surface-variant">
          A timeline of humanity's most ambitious ventures beyond Earth.
        </p>
      </div>

      <div className="flex gap-3 text-sm" style={{ fontFamily: 'var(--font-family-label)' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <span className="text-on-surface-variant">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-outline" />
          <span className="text-on-surface-variant">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-dim" />
          <span className="text-on-surface-variant">Planned</span>
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
