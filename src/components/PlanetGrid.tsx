'use client'

import { useState } from 'react'
import type { Planet } from '@/data/space'
import SearchFilter from './SearchFilter'

const typeFilters = [
  { label: 'All', value: 'all' },
  { label: 'Terrestrial', value: 'terrestrial' },
  { label: 'Gas Giant', value: 'gas-giant' },
  { label: 'Ice Giant', value: 'ice-giant' },
]

export default function PlanetGrid({ planets }: { planets: Planet[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = planets.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'all' || p.type === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="space-y-6">
      <SearchFilter
        onSearch={setQuery}
        onFilterChange={setFilter}
        filters={typeFilters}
        placeholder="Search planets..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(planet => (
          <a
            key={planet.id}
            href={`/planets/${planet.id}`}
            className="group block no-underline"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${planet.color} flex items-center justify-center text-white text-xl`}
                >
                  {planet.emoji}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {planet.type}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {planet.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {planet.description}
              </p>
              <div className="flex gap-4 mt-4 text-xs text-gray-400">
                <span>{planet.diameter}</span>
                <span>{planet.moons} moon{planet.moons !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No planets match your search.
        </div>
      )}
    </div>
  )
}
