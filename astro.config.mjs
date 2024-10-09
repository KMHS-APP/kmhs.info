// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react(), tailwind()],
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  site: 'https://kmhs.info',
});
