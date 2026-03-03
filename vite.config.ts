import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base doit correspondre au nom de votre dépôt GitHub (ex: /mon-depot/)
  // Si vous utilisez un domaine personnalisé, mettez '/'
  base: './', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
