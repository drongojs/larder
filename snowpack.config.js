const css = require('rollup-plugin-postcss');

module.exports = {
  webDependencies: [
    '@vue/babel-helper-vue-jsx-merge-props',
    '@vue/composition-api',
    '@drongo/styles',
    '@drongo/ux/theme/index.js',
    '@drongo/ux/grid/index.js',
    '@drongo/ux/icon/index.js',
    '@drongo/ux/breakpoints/index.js',
    '@drongo/ux/button/index.js',
    'vue',
    'vue-component-router',
  ],
  installOptions: {
    include: 'src/**/*.{ts,tsx}',
  },
  rollup: {
    plugins: [ css() ],
  },
};
