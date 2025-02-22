// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    imageService: 'cloudflare',
  }),

  integrations: [react(), icon({
    include: {
      mdi: [
        "home",
        "snowflake",
        "about-circle-outline",
        "chevron-up",
        "link",
        "ios-share",
        "arrow-down-box",
        "instagram",
        "link-box-variant-outline",
        "youtube",
        "cloud-upload-outline",
        "menu",
        "tools",
        "toolbox-outline",
        "timetable",
      ],
      "icon-park-twotone": [
        "degree-hat"
      ],
      "fluent-emoji-high-contrast": [
        "fork-and-knife-with-plate"
      ],
    }
  })],

  site: "https://kmhs.info",

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias:
        process.env.NODE_ENV === 'production'
          ? {
              'react-dom/server': 'react-dom/server.edge',
            }
          : undefined,
    },
  }
});
