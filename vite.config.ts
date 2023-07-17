import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: true,
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'logger',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  test: {
    globals: true,
    include: ['tests/unit/*.{test,spec}.ts', 'src/**/*.spec.ts'],
    environment: 'happy-dom',
    coverage: {
      exclude: ['__mocks__/*', 'tests/*', '**/*.spec.ts'],
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary'],
    },
  },
})
