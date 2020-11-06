import esbuild from 'rollup-plugin-esbuild'
import ts from 'rollup-plugin-typescript2'

export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm-bundler.js',
        format: 'es',
      },
    ],
    plugins: [
      ts({
        tsconfigOverride: {
          exclude: ['tests', 'coverage'],
          compilerOptions: {
            rootDir: 'src',
          },
        },
      }),
      esbuild({
        // All options are optional
        include: /src\/\.[jt]s$/, // default, inferred from `loaders` option
        exclude: /node_modules|coverage|tests/, // default
        sourceMap: false, // default
        minify: process.env.NODE_ENV === 'production',
        target: 'esnext', // default, or 'es20XX', 'esnext'
        loaders: {
          '.ts': 'ts',
        },
      }),
    ],
  },
  {
    input: ['src/vue/index.ts'],
    output: [
      {
        file: 'dist/vue/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/vue/index.esm-bundler.js',
        format: 'es',
      },
    ],
    external: ['vue'],
    plugins: [
      ts({
        tsconfigOverride: {
          exclude: ['tests', 'coverage'],
          compilerOptions: {
            rootDir: 'src',
          },
        },
      }),
      esbuild({
        // All options are optional
        include: /src\/vue\/\.[jt]s$/, // default, inferred from `loaders` option
        exclude: /node_modules|coverage|tests/, // default
        sourceMap: false, // default
        minify: process.env.NODE_ENV === 'production',
        target: 'esnext', // default, or 'es20XX', 'esnext'
        loaders: {
          '.ts': 'ts',
        },
      }),
    ],
  },
]
