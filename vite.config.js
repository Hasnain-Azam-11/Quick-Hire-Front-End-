/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The browser talks to /backend on the Vite server, which forwards to Django.
// That keeps requests same-origin in development, so the backend needs no CORS setup.
// Set BACKEND_URL to point the proxy somewhere else (e.g. a test copy of the backend).
const backendProxy = {
  '/backend': {
    target: process.env.BACKEND_URL || 'http://127.0.0.1:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/backend/, ''),
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: backendProxy },
  preview: { proxy: backendProxy },
})
