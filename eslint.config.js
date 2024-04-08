const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  astro: true,
  rules: {
    'ts/no-require-imports': 'off',
    'ts/no-use-before-define': 'off',
    'node/prefer-global/process': 'off',
  },
})
