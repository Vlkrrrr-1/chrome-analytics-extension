import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, "src/content/index.ts"),
      output: {
        entryFileNames: "content.js",
        format: "iife",
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
