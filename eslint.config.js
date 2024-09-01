/*
 * Copyright (c) 2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['eslint.config.js']
  },
  {
    rules: {
      'no-console': 'error',
      'require-await': 'error',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-expect-error': false,
        'ts-nocheck': false
      }],
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/indent': ['error', 2, {
        ignoredNodes: ['IfStatement[alternate.type="IfStatement"]'],
        SwitchCase: 1
      }],
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
      '@stylistic/operator-linebreak': ['error', 'after'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'vue/comma-dangle': ['error', 'never'],
      'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
      'vue/operator-linebreak': ['error', 'after']
    }
  },
  {
    files: ['packages/*/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' }
  },
  {
    ignores: ['.idea']
  }
)
