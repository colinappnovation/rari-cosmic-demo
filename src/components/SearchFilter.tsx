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
        className="flex-1 px-4 py-2 rounded-sm bg-surface-container-lowest text-on-surface placeholder-outline focus:outline-none focus:border-secondary border-b-2 border-outline-variant/15 transition-colors"
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
            className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
              activeFilter === f.value
                ? 'gradient-primary text-on-primary-fixed'
                : 'bg-surface-bright text-on-surface-variant hover:bg-surface-container-highest'
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
