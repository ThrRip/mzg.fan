module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'indent': ['error', 2, { ignoredNodes: ['IfStatement[alternate.type="IfStatement"]'], SwitchCase: 1 }],
    'operator-linebreak': ['error', 'after'],
    'quote-props': ['error', 'consistent']
  }
}
