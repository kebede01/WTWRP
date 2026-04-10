import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration for Monolithic Deployment on Google Cloud
 * * base: '/' ensures absolute paths for scripts in index.html.
 * outDir: 'dist' must match the folder Express is serving.
 */
export default defineConfig(() => {
  return {
    plugins: [react()],
    // CRITICAL: Ensures assets are linked with absolute paths (prevents blank screen)
    base: '/', 
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      // Ensures the output is compatible with modern Node/Cloud environments
      target: 'esnext', 
    },
    server: {
      port: 3000,
      proxy: {
        // Local development proxy to backend
        '/api': {
          target: 'http://localhost:3001', 
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});