import clear from 'rollup-plugin-clear'
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];
const babelConfig = {
  presets: ['@babel/env', '@babel/typescript'],
  plugins: ['@babel/transform-runtime', '@babel/proposal-class-properties'],
};

export default {
  input: 'sources/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  external: ['commander', 'path', 'fs', 'chalk', 'ora', 'mkdirp'],
  plugins: [
    clear({ targets: ['dist'], }),
    preserveShebangs(),
    json(),
    // Allows node_modules resolution
    resolve({ extensions }),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      ...babelConfig,
      runtimeHelpers: true,
      extensions,
      exclude: 'node_modules/**',
    }),
    // Minify generated es bundle
    terser(),
  ]
};