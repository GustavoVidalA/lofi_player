import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // 🔧 Esta línea es clave para Vercel
  plugins: [react()],
})

