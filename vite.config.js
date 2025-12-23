import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use GITHUB_PAGES env to switch between platforms
  // Default to '/' for Vercel, use '/noel/' for GitHub Pages
  base: process.env.GITHUB_PAGES === 'true' ? '/noel/' : '/',
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
