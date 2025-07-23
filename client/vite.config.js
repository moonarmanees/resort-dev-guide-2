import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  // Use your repo name as the base in prod, root in dev
  base: process.env.NODE_ENV === 'production' 
    ? '/resort-dev-guide-2/' 
    : '/',

  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ],
  build: {
    outDir: '../docs',
    emptyOutDir: true
  }
})
