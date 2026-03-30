import { fetchApod } from '@/data/nasa'
import { toDataUrl } from '@/data/image-proxy'

export default async function ApodCard() {
  const apod = await fetchApod()

  if (!apod || apod.media_type !== 'image') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center text-gray-400">
        Unable to load today's astronomy picture.
      </div>
    )
  }

  const imageSrc = await toDataUrl(apod.url) ?? apod.url

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-gray-900">
        <img
          src={imageSrc}
          alt={apod.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{apod.title}</h3>
          <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
            {apod.date}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{apod.explanation}</p>
        {apod.copyright && (
          <p className="text-xs text-gray-400 mt-3">&copy; {apod.copyright}</p>
        )}
        <p className="text-xs text-indigo-500 mt-2">
          NASA Astronomy Picture of the Day
        </p>
      </div>
    </div>
  )
}
