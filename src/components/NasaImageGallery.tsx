import { fetchNasaImages } from '@/data/nasa'

interface Props {
  query: string
  title?: string
}

export default async function NasaImageGallery({ query, title }: Props) {
  const images = await fetchNasaImages(query, 6)

  if (images.length === 0) {
    return null
  }

  return (
    <div>
      {title && (
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map(img => (
          <div
            key={img.nasa_id}
            className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-square"
          >
            <img
              src={img.mediumUrl ?? img.thumbUrl}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {img.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Images from NASA Image and Video Library
      </p>
    </div>
  )
}
