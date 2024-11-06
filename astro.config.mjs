// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [icon({
    include: {
      mdi: ['home', 'snowflake', 'about-circle-outline', 'chevron-up', 'link', 'ios-share', 'arrow-down-box'],
      'icon-park-twotone': ['degree-hat'],
      'fluent-emoji-high-contrast': ['fork-and-knife-with-plate']
    }
  }), react(), tailwind({applyBaseStyles: true,})],
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  site: 'https://kmhs.info',
  vite: {
    define: {
      "process.env": process.env
    },
    ssr: {
      external: ['comcigan.ts'],
    },
  },
});
