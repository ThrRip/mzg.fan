module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  rules: {
    'indent': ['error', 2, { ignoredNodes: ['IfStatement > :matches([alternate])'] }],
    'operator-linebreak': ['error', 'after'],
    'quote-props': ['error', 'consistent']
  }
}
