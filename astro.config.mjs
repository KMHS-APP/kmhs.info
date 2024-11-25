// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [icon({
    include: {
      mdi: ['home', 'snowflake', 'about-circle-outline', 'chevron-up', 'link', 'ios-share', 'arrow-down-box', 'instagram', 'link-box-variant-outline', 'youtube', 'cloud-upload-outline', 'menu'],
      'icon-park-twotone': ['degree-hat'],
      'fluent-emoji-high-contrast': ['fork-and-knife-with-plate']
    }
  }), react(), tailwind({applyBaseStyles: true,})],
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
  site: 'https://kmhs.info',
  vite: {
    define: {
      "process.env": process.env
    },
    ssr: {
      external: ['comcigan.ts', 'ultralight-s3'],
      target: 'webworker'
    },
  },
});