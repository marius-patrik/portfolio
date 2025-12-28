import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
	lib: [
		{
			format: 'esm',
			output: {
				distPath: {
					root: './dist/esm',
				},
			},
			dts: true,
		},
		{
			format: 'cjs',
			output: {
				distPath: {
					root: './dist/cjs',
				},
			},
		},
	],
	source: {
		entry: {
			index: './src/index.ts',
		},
	},
	output: {
		target: 'web',
	},
	plugins: [pluginReact()],
});
