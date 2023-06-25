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
    'operator-linebreak': ['error', 'after'],
    'quote-props': ['error', 'consistent']
  }
}
