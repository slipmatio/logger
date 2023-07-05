import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'logger',
      fileName: 'logger',
      formats: ['es', 'cjs'],
    },
  },
  test: {
    globals: true,
    include: ['tests/**/*.{test,spec}.ts', 'src/**/*.spec.ts'],
    environment: 'happy-dom',
    coverage: {
      exclude: ['__mocks__/*', 'tests/*', '**/*.spec.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary'],
    },
  },
})
