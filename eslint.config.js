const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    'ts/no-require-imports': 'off',
    'ts/no-use-before-define': 'off',
    'react-refresh/only-export-components': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})
