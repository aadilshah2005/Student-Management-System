import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
 server: {
  proxy: {
    '/api': {
      target: 'https://student-management-system-backend.onrender.com', // backend ka Render URL
      changeOrigin: true,
      secure: false,
    },
  },
}
})
