/*
 * Copyright (c) 2024-2025 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default defineNuxtConfig({
  // Extensions
  modules: [
    '@nuxt/eslint'
  ],

  // Feature flags
  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-19',

  // Tooling
  eslint: {
    config: {
      stylistic: true
    }
  }
})
