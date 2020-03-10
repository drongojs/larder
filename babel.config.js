const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    "@vue/babel-preset-jsx",
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: false, //isTest ? 'usage' : false,

      },
    ],
  ],
  plugins: [
    [
      "snowpack/assets/babel-plugin.js",
      {
        optionalExtensions: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      { loose: true },
    ],
    '@babel/plugin-transform-classes',
  ],
  sourceMaps: isTest ? 'inline' : true,
};
