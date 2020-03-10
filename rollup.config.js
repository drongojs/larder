import fs from 'fs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
// import vue from 'rollup-plugin-vue';

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const deps = Object.keys(pkg.dependencies);
const custom = [];
const external = [
  ...deps,
  ...custom,
];
const extensions = [ '.js', '.ts', '.tsx' ];

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'es',
    // sourcemap: true,
  },
  plugins: [
    // vue(),
    resolve({ extensions }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
  external,
};
