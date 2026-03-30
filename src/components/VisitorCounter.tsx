'use client'

import { useState, useEffect } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate loading a visit count
    const stored = Number(localStorage.getItem('cosmic-visits') || '0') + 1
    localStorage.setItem('cosmic-visits', String(stored))
    setCount(stored)
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
      <span className="text-indigo-700 font-medium">
        Visit #{count}
      </span>
    </div>
  )
}
