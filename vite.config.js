const { resolve } = require("path");
const { defineConfig } = require("vite");
import react from "@vitejs/plugin-react";

module.exports = defineConfig({
	root: resolve(__dirname, "./src/"),
	plugins: [react()],
	publicDir: resolve(__dirname, "./public/"),
	server: {
		host: "0.0.0.0",
	},
	build: {
		outDir: resolve(__dirname, "./dist/"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				root: resolve(__dirname, "./src/index.html"),
			},
		},
	},
});
