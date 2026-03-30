import { getApod } from '@/data/nasa'

export default function ApodCard() {
  const apod = getApod()

  if (!apod || apod.media_type !== 'image') {
    return (
      <div className="glass-panel rounded-xl p-6 text-center text-outline">
        No astronomy picture available. Run <code className="text-secondary">bun run fetch-nasa</code> to fetch data.
      </div>
    )
  }

  const imageSrc = apod._localImage ?? apod.url

  return (
    <div className="glass-panel rounded-xl overflow-hidden glow-primary">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={imageSrc}
          alt={apod.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-on-surface text-lg">{apod.title}</h3>
          <span className="text-xs text-outline whitespace-nowrap flex-shrink-0" style={{ fontFamily: 'var(--font-family-label)' }}>
            {apod.date}
          </span>
        </div>
        <p className="text-sm text-on-surface-variant line-clamp-3">{apod.explanation}</p>
        {apod.copyright && (
          <p className="text-xs text-outline mt-3">&copy; {apod.copyright}</p>
        )}
        <p className="text-xs text-primary mt-2" style={{ fontFamily: 'var(--font-family-label)' }}>
          NASA Astronomy Picture of the Day
        </p>
      </div>
    </div>
  )
}
