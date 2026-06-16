import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PorKeat - Full Stack Developer',
    short_name: 'PorKeat',
    description: 'Interactive cybernetic portfolio of PorKeat, Full Stack Developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617', // slate-950 to match the dark theme
    theme_color: '#ef4444',      // red-500 to match the hacker theme
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
