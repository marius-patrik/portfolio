import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
	plugins: [pluginReact()],
	source: {
		entry: {
			index: './src/client/index.tsx',
		},
	},
	html: {
		title: 'TradeBot - CFD Trading Dashboard',
		template: './src/client/index.html',
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
		},
	},
	output: {
		assetPrefix: '/',
		distPath: {
			root: 'dist/client',
		},
	},
});
