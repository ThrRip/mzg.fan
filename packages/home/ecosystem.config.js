/*
 * Copyright (c) 2023 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

module.exports = {
  apps: [
    {
      name: 'mzg.fan-home',
      script: './.output/server/index.mjs',
      interpreter: 'bun',
      port: 12320,
      max_memory_restart: '200M',
      env: {
        'NITRO_PORT': 12320
      }
    }
  ]
}
