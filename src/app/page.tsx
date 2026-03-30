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
          <div className="relative overflow-hidden rounded-sm bg-surface-container-low p-5 ghost-border hover:glow-primary transition-all">
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
          className="flex items-center gap-4 bg-surface-container-low rounded-sm p-4 ghost-border"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary font-bold text-sm flex-shrink-0">
            {mission.year.toString().slice(-2)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-on-surface text-sm">{mission.name}</h4>
            <p className="text-xs text-outline truncate">{mission.target}</p>
          </div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary-container/20 text-secondary ghost-border flex-shrink-0"
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
        <div key={i} className="bg-surface-container rounded-sm p-5 ghost-border text-center animate-pulse">
          <div className="h-8 w-8 bg-surface-container-high rounded mx-auto mb-2" />
          <div className="h-6 w-12 bg-surface-container-high rounded mx-auto mb-1" />
          <div className="h-4 w-20 bg-surface-container rounded mx-auto" />
        </div>
      ))}
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="bg-surface-container rounded-sm ghost-border overflow-hidden animate-pulse">
      <div className="aspect-video bg-surface-container-high" />
      <div className="p-6 space-y-3">
        <div className="h-5 w-3/4 bg-surface-container-high rounded" />
        <div className="h-4 w-full bg-surface-container rounded" />
        <div className="h-4 w-2/3 bg-surface-container rounded" />
      </div>
    </div>
  )
}

function ListSkeleton() {
  return (
    <div className="bg-surface-container rounded-sm ghost-border overflow-hidden animate-pulse">
      <div className="p-5 border-b border-outline-variant/15">
        <div className="h-5 w-48 bg-surface-container-high rounded" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-5 py-3 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-surface-container-high" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 w-32 bg-surface-container-high rounded" />
            <div className="h-3 w-20 bg-surface-container rounded" />
          </div>
          <div className="h-4 w-16 bg-surface-container rounded" />
        </div>
      ))}
    </div>
  )
}

export default function HomePage(_params: PageProps) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-on-surface mb-2">
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

      <section className="rounded-sm p-8 ghost-border" style={{ background: 'linear-gradient(135deg, rgba(190, 20, 238, 0.1), rgba(0, 195, 235, 0.1))' }}>
        <h2 className="text-xl font-semibold text-on-surface mb-2">How This Works</h2>
        <p className="text-on-surface-variant mb-4">
          This demo fetches <strong className="text-on-surface">live data from 3 NASA APIs</strong>, all rendered as async Server Components on rari's Rust runtime:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="glass rounded-sm p-4 ghost-border">
            <strong className="text-on-surface">APOD API</strong>
            <p className="text-on-surface-variant mt-1">Today's astronomy picture fetched server-side with async/await.</p>
          </div>
          <div className="glass rounded-sm p-4 ghost-border">
            <strong className="text-on-surface">NEO Feed API</strong>
            <p className="text-on-surface-variant mt-1">Real-time near-Earth asteroid data streamed via Suspense.</p>
          </div>
          <div className="glass rounded-sm p-4 ghost-border">
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
