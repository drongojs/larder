  
module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    'jsx-control-statements',
    '@typescript-eslint',
    'babel',
    'jest',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
  },
  'env': {
    'browser': true,
    'es6': true,
    'jsx-control-statements/jsx-control-statements': true,
    'jest/globals': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended'
  ],
  'rules': {
      'indent': [ 'error', 2 ],
      'linebreak-style': [ 'error', 'unix' ],
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'always' ],
      'arrow-parens': [ 'error', 'as-needed' ],
      'curly': [ 'error', 'all' ],
      'no-invalid-this': 'error',
      'array-bracket-spacing': [ 'error', 'always' ],
      'comma-dangle': [ 'error', 'always-multiline' ],
      'max-len': [ 'error', {
        'code': 120,
        'ignoreComments': true,
        'ignoreTemplateLiterals': true,
      } ],
      'no-unused-vars': [ 'off' ],
      '@typescript-eslint/no-unused-vars': 'error',
      'react/jsx-no-undef': [ 'error', { 'allowGlobals': true }]
  },
  'settings': {
    'import/resolver': {
      'babel-module': {},
      'node': {
        'extensions': [ '.ts', '.tsx', '.js' ],
      },
      'extensions': [ '.ts', '.tsx', '.js' ],
    },
    'react': {
      'version': 'detect',
    },
  },
};
