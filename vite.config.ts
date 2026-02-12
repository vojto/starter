import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"

export default defineConfig({
  ssr: {
    noExternal: true, // Prebuilds ssr.js, drops node_modules from container
  },
  plugins: [react(), tailwindcss(), RubyPlugin()],
})
