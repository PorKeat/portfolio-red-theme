import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alex KGM | DevOps Engineer & Fullstack Developer',
    short_name: 'Alex KGM',
    description: 'Portfolio of Alex KGM, a DevOps Engineer & Fullstack Developer specializing in scalable, secure, and cloud-native systems.',
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
