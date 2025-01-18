import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  build: {
    rollupOptions: {
      treeshake: true,
      input: {
        root: "./views/root/root.html",
        login: "./views/login/login.html",
      },
    },
    assetsDir: "assets",
    outDir: `dist/client`,
    minify: "esbuild",
  },
});
