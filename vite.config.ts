import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'alkgraph',
			fileName: (format) => `index.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['path', 'fs', 'os', 'util', 'events', 'stream', 'crypto'],
			output: {
				// Remove globals as they're not needed for Node
				exports: 'named',
			},
		},
		sourcemap: true,
		minify: 'esbuild',
		target: 'node16', // Target Node.js environment
		outDir: 'dist',
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
});