import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src/layouts/views'),
      '@cpt': path.resolve(__dirname, 'src/layouts/components'),
      '@icons': path.resolve(__dirname, 'src/layouts/components/icons'),
      '@ctx': path.resolve(__dirname, 'src/Context'),
    },
  },
});
