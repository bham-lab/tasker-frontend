import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()  , tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rellupOptions: {
      output: {
        manualChunks: {
          vendor: ["react","react-dom", "react-router-dom"],
          ui: ['lucide-react'],
        }
      }
    }
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
