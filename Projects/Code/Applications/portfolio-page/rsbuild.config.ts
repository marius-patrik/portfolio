import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Portfolio",
    favicon: "./public/favicon.svg",
  },
  output: {
    distPath: {
      root: "../../dist/apps/portfolio-page",
    },
  },
});

