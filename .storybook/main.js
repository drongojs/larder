let type = 'stories';
switch (process.env.STORY_MODE) {
case 'STORYBOOK':
  break;
case 'INT':
  type = 'integration';
  break;
case 'BACKSTOP':
  // type = 'backstop';
  break;
default:
  throw new Error('Unspecified STORY_MODE');
}

module.exports = {
  'stories': [
    `../src/**/__${type}__/**/*.stories.@(js|jsx|ts|tsx)`
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
    return config;
  },
}
