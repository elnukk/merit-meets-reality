import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: '/merit-meets-reality',
  define: {
    global: 'globalThis'
  }
})