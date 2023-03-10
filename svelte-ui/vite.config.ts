import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/svelte-ui/',
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],    
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/socket.io': 'http://localhost:3000',
    },
  },
})
