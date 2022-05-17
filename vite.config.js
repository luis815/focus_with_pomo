const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
	root: resolve(__dirname, "./src/"),
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
