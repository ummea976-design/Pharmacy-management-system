import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//Blocked request. This host ("isiah-raiseable-elijah.ngrok-free.dev") is not allowed.
// To allow this host, add "isiah-raiseable-elijah.ngrok-free.dev" to `server.allowedHosts` in vite.config.js.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['isiah-raiseable-elijah.ngrok-free.dev']
  }
})
