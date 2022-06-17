import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: ["es2021"],
    minify: !process.env.TAURI_DEBUG && "esbuild",
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  plugins: [react()],
})
