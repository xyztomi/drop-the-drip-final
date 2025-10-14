import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		allowedHosts: [
			"42f951a0352b.ngrok-free.app",
			".ngrok-free.app", // Allow all ngrok hosts
			".ngrok.io", // Support older ngrok domains
		],
	},
});
