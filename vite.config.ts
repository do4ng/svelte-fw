import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: '/public/',
  plugins: [svelte({ preprocess: sveltePreprocess() })],
  resolve: {
    alias: {
      $components: path.resolve(__dirname, './components'),
      $lib: path.resolve(__dirname, './lib'),
    },
  },
});
