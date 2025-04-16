import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0', // Allows access from any host
    proxy: {
      '/api': 'https://booksandbeyond-server.onrender.com', // Replace with your backend API URL
    },
    allowedHosts: ['booksandbeyond.onrender.com'],  // Allowed host for production
  },
  build: {
    outDir: 'build',  // Specifies the output directory for your production build
  },
});
