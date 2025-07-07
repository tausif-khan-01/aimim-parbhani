import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AIMIM Parbhani - All India Majlis-e-Ittehadul Muslimeen',
    short_name: 'AIMIM Parbhani',
    description: 'Official website of AIMIM Parbhani. Join our movement for justice, equality, and progress.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#16a34a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['political', 'social', 'community'],
    lang: 'en',
    dir: 'ltr',
  }
}
