import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  site: 'https://tweet-pro-quo.tylergannon.com',
  vite: {
    resolve: {
      // alias: {
      //     '$lib': './src/lib'
      // }
    }
  }
});