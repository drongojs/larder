const { resolve } = require('path');
const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: false, //isTest ? 'usage' : false,

      },
    ],
    'linaria/babel',
  ],
  plugins: [
    [ 'babel-plugin-module-resolver', {
      root: [ resolve('./src') ],
      extensions: [ '.ts', '.tsx' ],
    } ],
    'jpex/babel-plugin',
  ],
  sourceMaps: isTest ? 'inline' : true,
};
