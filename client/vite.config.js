import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'


// https://vite.dev/config/
export default defineConfig({
  base: './', 
  plugins: [react(),
    visualizer({
      filename: 'dist/stats.html',  // where to output the report
      open: true,                   // auto‑open in browser after build
    })
  ],
  
  build: {
    outDir: '../docs',     // ← this moves dist → docs
    emptyOutDir: true
  }
})
