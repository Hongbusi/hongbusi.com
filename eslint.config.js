const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    'node/prefer-global/process': 'off',
    'react-refresh/only-export-components': 'off',
  },
})
