/*
 * Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPodcast,
  faList,
  faArrowUpRightFromSquare,
  faArrowDown,
  faMusic,
  faCaretUp,
  faClipboardQuestion,
  faClipboardCheck,
  faCommentDollar,
  faDice
} from '@fortawesome/free-solid-svg-icons'
import {
  faBilibili
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faPodcast,
  faList,
  faArrowUpRightFromSquare,
  faArrowDown,
  faBilibili,
  faMusic,
  faCaretUp,
  faClipboardQuestion,
  faClipboardCheck,
  faCommentDollar,
  faDice
)

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
