import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This repo is a user/org page (Ashique-7.github.io), which GitHub Pages
  // always serves from the domain root — so base stays '/'. A project-page
  // repo (e.g. my-project) would need base: '/my-project/' instead.
  
})
