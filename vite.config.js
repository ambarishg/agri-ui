import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000 // This is for development; it won't affect the production build.
  },
  build: {
    outDir: 'dist', // Specify output directory for the production build.
    // Additional build options can be configured here.
  }
});
