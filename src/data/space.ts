export interface Planet {
  id: string
  name: string
  type: 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf'
  diameter: string
  distance: string
  moons: number
  description: string
  color: string
  emoji: string
  facts: string[]
  nasaQuery: string
}

export interface Mission {
  id: string
  name: string
  year: number
  status: 'active' | 'completed' | 'planned'
  target: string
  description: string
}

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'terrestrial',
    diameter: '4,879 km',
    distance: '57.9M km',
    moons: 0,
    description: 'The smallest planet and closest to the Sun. Its surface is covered in craters and it has virtually no atmosphere.',
    color: 'from-gray-400 to-amber-600',
    emoji: '☿',
    facts: [
      'A day on Mercury lasts 59 Earth days',
      'Temperatures range from -180°C to 430°C',
      'Mercury has no atmosphere to retain heat',
    ],
    nasaQuery: 'MESSENGER Mercury planet surface',
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'terrestrial',
    diameter: '12,104 km',
    distance: '108.2M km',
    moons: 0,
    description: 'Often called Earth\'s twin due to similar size. Its thick atmosphere creates a runaway greenhouse effect.',
    color: 'from-yellow-400 to-orange-500',
    emoji: '♀',
    facts: [
      'Venus rotates backwards compared to most planets',
      'Surface temperature is hot enough to melt lead (465°C)',
      'A day on Venus is longer than its year',
    ],
    nasaQuery: 'Magellan Venus planet atmosphere',
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'terrestrial',
    diameter: '12,742 km',
    distance: '149.6M km',
    moons: 1,
    description: 'Our home planet and the only known world to harbour life. Its surface is 71% water.',
    color: 'from-blue-400 to-green-500',
    emoji: '🌍',
    facts: [
      'Earth is the densest planet in the solar system',
      'The magnetic field protects us from solar radiation',
      'Earth\'s atmosphere is 78% nitrogen and 21% oxygen',
    ],
    nasaQuery: 'Earth from space blue marble',
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'terrestrial',
    diameter: '6,779 km',
    distance: '227.9M km',
    moons: 2,
    description: 'The Red Planet, named for its iron-oxide surface. Home to the tallest volcano in the solar system.',
    color: 'from-red-400 to-red-700',
    emoji: '♂',
    facts: [
      'Olympus Mons is 21 km tall — nearly 3x Everest',
      'Mars has seasons similar to Earth due to axial tilt',
      'Evidence suggests liquid water once flowed on Mars',
    ],
    nasaQuery: 'Mars red planet surface Perseverance',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'gas-giant',
    diameter: '139,820 km',
    distance: '778.5M km',
    moons: 95,
    description: 'The largest planet in our solar system. Its Great Red Spot is a storm larger than Earth.',
    color: 'from-orange-300 to-amber-700',
    emoji: '♃',
    facts: [
      'Jupiter has the shortest day of any planet (10 hours)',
      'The Great Red Spot has raged for over 350 years',
      'Jupiter\'s magnetic field is 20,000x stronger than Earth\'s',
    ],
    nasaQuery: 'Jupiter great red spot Juno',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'gas-giant',
    diameter: '116,460 km',
    distance: '1.43B km',
    moons: 146,
    description: 'Famous for its spectacular ring system made of ice and rock. It is the least dense planet.',
    color: 'from-yellow-300 to-amber-500',
    emoji: '♄',
    facts: [
      'Saturn could float in water — its density is less than 1',
      'Its rings span up to 282,000 km but are only 10m thick',
      'Winds on Saturn can reach 1,800 km/h',
    ],
    nasaQuery: 'Saturn rings Cassini planet',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'ice-giant',
    diameter: '50,724 km',
    distance: '2.87B km',
    moons: 28,
    description: 'An ice giant that rotates on its side. It has faint rings and a blue-green colour from methane.',
    color: 'from-cyan-300 to-teal-500',
    emoji: '⛢',
    facts: [
      'Uranus rotates at a 98° tilt — essentially on its side',
      'It was the first planet discovered with a telescope (1781)',
      'Temperatures drop to -224°C, the coldest planetary atmosphere',
    ],
    nasaQuery: 'Uranus planet Voyager ice giant',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'ice-giant',
    diameter: '49,244 km',
    distance: '4.5B km',
    moons: 16,
    description: 'The most distant planet, known for supersonic winds and a vivid blue colour from methane ice.',
    color: 'from-blue-500 to-indigo-700',
    emoji: '♆',
    facts: [
      'Neptune has the strongest winds — up to 2,100 km/h',
      'It takes 165 years to orbit the Sun',
      'Neptune was predicted mathematically before being observed',
    ],
    nasaQuery: 'Neptune planet Voyager blue',
  },
]

export const missions: Mission[] = [
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    year: 1977,
    status: 'active',
    target: 'Interstellar Space',
    description: 'The most distant human-made object, now exploring interstellar space beyond our solar system.',
  },
  {
    id: 'perseverance',
    name: 'Perseverance Rover',
    year: 2020,
    status: 'active',
    target: 'Mars',
    description: 'Searching for signs of ancient microbial life and collecting rock samples for future return to Earth.',
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    year: 2021,
    status: 'active',
    target: 'Deep Space',
    description: 'The most powerful space telescope ever built, peering back to the earliest galaxies in the universe.',
  },
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    year: 1997,
    status: 'completed',
    target: 'Saturn',
    description: 'Spent 13 years studying Saturn, its rings, and moons before its Grand Finale plunge in 2017.',
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    year: 2006,
    status: 'active',
    target: 'Kuiper Belt',
    description: 'Provided the first close-up images of Pluto and is now exploring the Kuiper Belt.',
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    year: 2024,
    status: 'active',
    target: 'Jupiter (Europa)',
    description: 'Investigating whether Jupiter\'s moon Europa has conditions suitable for life beneath its icy surface.',
  },
  {
    id: 'dragonfly',
    name: 'Dragonfly',
    year: 2028,
    status: 'planned',
    target: 'Titan (Saturn)',
    description: 'A rotorcraft lander that will explore Saturn\'s largest moon, sampling its organic-rich surface.',
  },
]

export function getPlanet(id: string): Planet | undefined {
  return planets.find(p => p.id === id)
}
