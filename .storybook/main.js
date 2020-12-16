const webpack = require('webpack');

let type = 'stories';
switch (process.env.STORY_MODE) {
case 'E2E':
  type = 'e2e';
  break;
case 'BACKSTOP':
  type = 'backstop';
  break;
case 'STORYBOOK':
default:
  break;
}

module.exports = {
  'stories': [
    `../src/**/*.${type}.@(js|jsx|ts|tsx)`
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async(config) => {
    config.module.rules.push({
      test: /\.tsx?/,
      use: [ 'babel-loader', 'linaria/loader' ],
    });
    config.plugins.push(new webpack.DefinePlugin({
      SKIP_ANIMATIONS: `${process.env.STORY_MODE === 'BACKSTOP'}`,
    }))
    return config;
  },
}
