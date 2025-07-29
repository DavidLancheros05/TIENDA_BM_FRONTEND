  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

 // vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // 👈 proxy /api a tu backend
    },
  },
});