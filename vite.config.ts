import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteEjsPlugin } from "vite-plugin-ejs";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [
      vue(),
      ViteEjsPlugin((viteConfig) => {
        // viteConfig is the current viteResolved config.
        return {
          root: viteConfig.root,
          domain: "example.com",
          title: env.VITE_APPNAME,
          api_key: env.VITE_GOOGLE_MAP_API,
        };
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
