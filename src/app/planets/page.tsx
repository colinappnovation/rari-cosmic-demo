import type { PageProps, Metadata } from 'rari'
import { planets } from '@/data/space'
import PlanetGrid from '@/components/PlanetGrid'

export default function PlanetsPage(_params: PageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Planets</h1>
        <p className="text-gray-500">
          All eight planets of our solar system. Search or filter by type.
        </p>
      </div>
      <PlanetGrid planets={planets} />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Planets | Cosmic Explorer',
  description: 'Browse all planets in the solar system',
}
