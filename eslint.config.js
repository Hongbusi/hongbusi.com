const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    'react-refresh/only-export-components': 'off',
  },
})
