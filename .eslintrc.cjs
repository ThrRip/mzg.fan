/*
 * Copyright (c) 2023 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
