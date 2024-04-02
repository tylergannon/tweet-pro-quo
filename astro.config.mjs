import { defineConfig } from "astro/config";
import icon from "astro-icon";

import react from "@astrojs/react";
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  site: "https://tweet-pro-quo.tylergannon.com",
  vite: {
    resolve: {
      alias: {
        $lib: resolve(projectRootDir, "src/lib"),
      },
    },
  },
});
