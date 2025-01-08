// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
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
        "icon-park-twotone": ["degree-hat"],
        "fluent-emoji-high-contrast": ["fork-and-knife-with-plate"],
      },
    }),
    react(),
    tailwind({ applyBaseStyles: true }),
  ],
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  site: "https://kmhs.info",
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // TODO: wait for this PR: https://github.com/withastro/adapters/pull/436#issuecomment-2525190557
      alias:
        process.env.NODE_ENV === 'production'
          ? {
              'react-dom/server': 'react-dom/server.edge',
            }
          : undefined,
    },
  },
});
