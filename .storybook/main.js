let type = 'stories';
switch (process.env.STORY_MODE) {
case 'INT':
  type = 'integration';
  break;
case 'BACKSTOP':
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
