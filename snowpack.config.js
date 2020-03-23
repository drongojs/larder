const css = require('rollup-plugin-postcss');

module.exports = {
  webDependencies: [
    '@vue/babel-helper-vue-jsx-merge-props',
    '@vue/composition-api',
    '@drongo/styles',
    'vue',
    'vue-component-router',
    'vue-material/dist/vue-material.min.css',
    'vue-material/dist/theme/default.css',
    'vue-material/dist/components/index.js',
  ],
  installOptions: {
    include: 'src/**/*.{ts,tsx}',
  },
  rollup: {
    plugins: [ css() ],
  },
  namedExports: {
    'vue-material/dist/components/index.js': [
      'MdButton',
      'MdIcon',
      'MdApp',
      'MdAppContent',
      'MdAppToolbar',
      'MdAppDrawer',
      'MdToolbar',
      'MdDrawer',
      'MdContent',
      'MdBottomBar',
      'MdTabs',
      'MdList',
      'MdSubheader',
      'MdDivider',
      'MdField',
      'MdInput',
      'MdCard',
      'MdAutocomplete',
      'MdMenu',
      // 'MdSelect',
      'MdDatepicker',
    ],
  },
};
