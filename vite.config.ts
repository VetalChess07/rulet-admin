import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
   server: {
      host: '0.0.0.0',
      port: 5173,
      watch: {
         usePolling: true,
      },
   },
   plugins: [
      react(),
      svgr()
   ],
   resolve: {
      alias: {
        '@': '/src',
        '@app': '/src/app',
        '@pages': '/src/pages', 
        '@shared': '/src/shared', 
        '@features': '/src/features',
        '@entities': '/src/entities',
      },
   },

   build: {
      outDir: 'dist',
   },
});
