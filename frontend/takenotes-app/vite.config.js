import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    }
  };
});
