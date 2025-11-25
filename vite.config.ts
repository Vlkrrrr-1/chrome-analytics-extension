import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      react(),
      isBuild &&
        viteStaticCopy({
          targets: [
            {
              src: "src/popup/popup.html",
              dest: ".",
              transform: (content) =>
                content
                  .toString()
                  .replace(
                    /<script type="module" src=".*"><\/script>/,
                    '<script type="module" src="./popup.js"></script>'
                  ),
            },
          ],
        }),
    ],
    build: {
      rollupOptions: {
        input: {
          popup: resolve(__dirname, "src/popup/index.tsx"),
          background: resolve(__dirname, "src/background/index.ts"),
          content: resolve(__dirname, "src/content/index.ts"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
