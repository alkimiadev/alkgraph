import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'alkgraph',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {},
			},
		},
		sourcemap: true,
		minify: 'esbuild',
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
	test: {
		globals: true,
		environment: 'node',
	},
});