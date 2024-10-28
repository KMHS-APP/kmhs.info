// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
      noExternal: ['safer-buffer']
        }
        });
        