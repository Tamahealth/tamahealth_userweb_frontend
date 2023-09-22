import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TailwindCSS from "vite-plugin-tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TailwindCSS()],
});
