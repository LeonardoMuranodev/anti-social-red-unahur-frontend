import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // <--- ESTO ES LO QUE FALTA
    },
    host: '0.0.0.0', // Asegura que escuche conexiones externas
    port: 5173
  }
})