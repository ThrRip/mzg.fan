// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/admin/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh'
      },
      title: '管理面板 | 洺知-故犯',
      meta: [
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#89c1cf', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#89c1cf', media: '(prefers-color-scheme: dark)' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48 32x32 16x16' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  css: [
    '@/../../assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3001
  },

  postcss: {
    plugins: {
      'tailwindcss': {},
      'autoprefixer': {}
    }
  },

  runtimeConfig: {
    backendApiKey: ''
  }
})
