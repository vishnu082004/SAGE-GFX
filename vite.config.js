import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import careersHandler from './api/careers.js'
import contactHandler from './api/contact.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'careers-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method !== 'POST') return next()
        contactHandler(req, res)
      })
      server.middlewares.use('/api/careers', (req, res, next) => {
        if (req.method !== 'POST') return next()
        careersHandler(req, res)
      })
    },
  }],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
        },
      },
    },
  },
})
