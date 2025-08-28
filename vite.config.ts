import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: If your repo name is different, change base to `/<YourRepoName>/`
export default defineConfig({
  base: '/mitral-sim/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true
  },
  server: {
    port: 5173
  }
});
