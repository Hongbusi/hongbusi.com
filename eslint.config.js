const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  rules: {
    'node/prefer-global/process': 'off',
    'react/prop-types': 'off',
    'react/no-unknown-property': 'off',
    'react-refresh/only-export-components': 'off',
    'no-use-before-define': 'off',
    'ts/no-use-before-define': 'off',
  },
})
