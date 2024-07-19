/*
 * Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'zh' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '洺知-故犯',
      meta: [
        { name: 'description', content: '洺知-故犯的主页 & 直播点唱歌单 | 哔哩哔哩 UID：32159860 直播间号：1267105' },
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

  compatibilityDate: '2024-07-19',

  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },

  devServer: {
    host: '0.0.0.0'
  },

  devtools: {
    enabled: false
  },

  nitro: {
    preset: 'bun'
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
