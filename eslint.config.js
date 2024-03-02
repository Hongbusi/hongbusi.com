const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    'ts/no-require-imports': 'off',
    'react-refresh/only-export-components': 'off',
  },
})
