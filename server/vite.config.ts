// vite.config.ts
import { defineConfig } from 'vite';
import { builtinModules } from 'node:module'

const builtin = new Set([
	...builtinModules,
	...builtinModules.map(m => `node:${m}`),
]);

export default defineConfig({
	build: {
		outDir: 'dist',
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: 'index.js'
		},
		rollupOptions: {
			external: (id) => builtin.has(id),
			output: {
				entryFileNames: 'index.js',
				chunkFileNames: 'chunk.[name].js'
			}
		},
		sourcemap: false,
		minify: true,
		target: 'node20'
	}
});
