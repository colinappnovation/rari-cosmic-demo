import type { PageProps, Metadata } from 'rari'
import { Suspense } from 'react'
import { planets, missions } from '@/data/space'
import StatsBar from '@/components/StatsBar'
import ApodCard from '@/components/ApodCard'
import NeoTracker from '@/components/NeoTracker'

function FeaturedPlanets() {
  const featured = planets.filter(p => ['earth', 'mars', 'jupiter', 'saturn'].includes(p.id))

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {featured.map(planet => (
        <a
          key={planet.id}
          href={`/planets/${planet.id}`}
          className="group block no-underline"
        >
          <div className="glass-panel rounded-xl p-5 hover-glow transition-all">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${planet.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}
            >
              {planet.emoji}
            </div>
            <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors">
              {planet.name}
            </h3>
            <p className="text-xs text-outline mt-1">{planet.distance} from Sun</p>
          </div>
        </a>
      ))}
    </div>
  )
}

function LatestMissions() {
  const latest = missions.filter(m => m.status === 'active').slice(0, 3)

  return (
    <div className="space-y-3">
      {latest.map(mission => (
        <div
          key={mission.id}
          className="flex items-center gap-4 glass-light rounded-xl p-4"
        >
          <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
            {mission.year.toString().slice(-2)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-on-surface text-sm">{mission.name}</h4>
            <p className="text-xs text-outline truncate">{mission.target}</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary"
            style={{ fontFamily: 'var(--font-family-label)' }}
          >
            active
          </span>
        </div>
      ))}
      <a
        href="/missions"
        className="block text-center text-sm text-primary hover:text-primary-container no-underline font-medium py-2"
      >
        View all missions &rarr;
      </a>
    </div>
  )
}

function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass-panel rounded-xl p-5 text-center animate-pulse">
          <div className="h-8 w-8 bg-white/10 rounded mx-auto mb-2" />
          <div className="h-6 w-12 bg-white/10 rounded mx-auto mb-1" />
          <div className="h-4 w-20 bg-white/5 rounded mx-auto" />
        </div>
      ))}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="glass-panel rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/5" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-3/4 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="glass-panel rounded-xl overflow-hidden animate-pulse">
      <div className="p-5 border-b border-white/5">
        <div className="h-5 w-48 bg-white/10 rounded" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-5 py-3 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-3 w-20 bg-white/5 rounded" />
          </div>
          <div className="h-4 w-16 bg-white/5 rounded" />
        </div>
      ))}
    </div>
  )
}

export default function HomePage(_params: PageProps) {
  return (
    <div className="space-y-10">
      <div className="text-center pt-4">
        <h1 className="text-5xl font-bold text-on-surface mb-3">
          Cosmic Explorer
        </h1>
        <p className="text-lg text-on-surface-variant">
          Live space data from NASA APIs &mdash; rendered with React Server Components on Rust.
        </p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <StatsBar />
      </Suspense>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-on-surface">Featured Planets</h2>
          <a href="/planets" className="text-sm text-primary hover:text-primary-container no-underline font-medium">
            View all &rarr;
          </a>
        </div>
        <FeaturedPlanets />
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">
            Astronomy Picture of the Day
          </h2>
          <Suspense fallback={<CardSkeleton />}>
            <ApodCard />
          </Suspense>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-on-surface mb-4">
            Asteroid Tracker
          </h2>
          <Suspense fallback={<ListSkeleton />}>
            <NeoTracker />
          </Suspense>
        </section>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-on-surface">Active Missions</h2>
          <a href="/missions" className="text-sm text-primary hover:text-primary-container no-underline font-medium">
            View all &rarr;
          </a>
        </div>
        <LatestMissions />
      </section>

      <section className="glass-panel rounded-xl p-8">
        <h2 className="text-xl font-semibold text-on-surface mb-2">How This Works</h2>
        <p className="text-on-surface-variant mb-4">
          This demo fetches <strong className="text-on-surface">live data from 3 NASA APIs</strong>, all rendered as async Server Components on rari's Rust runtime:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="glass-light rounded-lg p-4">
            <strong className="text-on-surface">APOD API</strong>
            <p className="text-on-surface-variant mt-1">Today's astronomy picture fetched server-side with async/await.</p>
          </div>
          <div className="glass-light rounded-lg p-4">
            <strong className="text-on-surface">NEO Feed API</strong>
            <p className="text-on-surface-variant mt-1">Real-time near-Earth asteroid data streamed via Suspense.</p>
          </div>
          <div className="glass-light rounded-lg p-4">
            <strong className="text-on-surface">Image Library API</strong>
            <p className="text-on-surface-variant mt-1">NASA photos on each planet detail page, fetched per request.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Dashboard | Cosmic Explorer',
  description: 'Explore the solar system with live NASA data, powered by React Server Components on Rust',
}
