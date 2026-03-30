'use client'

import { useState } from 'react'

interface SearchFilterProps {
  onSearch: (query: string) => void
  onFilterChange: (filter: string) => void
  filters: { label: string; value: string }[]
  placeholder?: string
}

export default function SearchFilter({
  onSearch,
  onFilterChange,
  filters,
  placeholder = 'Search...',
}: SearchFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder={placeholder}
        onChange={e => onSearch(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl glass-panel text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-secondary/40 transition-all"
        style={{ fontFamily: 'var(--font-family-body)' }}
      />
      <div className="flex gap-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => {
              setActiveFilter(f.value)
              onFilterChange(f.value)
            }}
            className={`px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
              activeFilter === f.value
                ? 'gradient-primary text-on-primary-fixed'
                : 'glass-light text-on-surface-variant hover:text-on-surface'
            }`}
            style={{ fontFamily: 'var(--font-family-label)' }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
