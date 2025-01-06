import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-social-media-embed'], 
  },
  base: '/', 
  server: {
    port: 5173, 
    open: true, 
  },
  build: {
    outDir: 'dist', 
  },
});