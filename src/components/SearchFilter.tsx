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
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div className="flex gap-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => {
              setActiveFilter(f.value)
              onFilterChange(f.value)
            }}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeFilter === f.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
