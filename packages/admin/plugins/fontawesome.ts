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
  faCircleNotch,
  faCheck,
  faCircleExclamation,
  faHouse,
  faPenToSquare,
  faRightFromBracket,
  faAngleRight,
  faCaretUp,
  faSquareMinus,
  faSquareCheck,
  faExclamation,
  faCommentDollar,
  faPlus,
  faMinus,
  faRotateLeft,
  faBroom,
  faCloudArrowUp
} from '@fortawesome/free-solid-svg-icons'
import {
  faSquare
} from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

library.add(
  faCircleNotch,
  faCheck,
  faCircleExclamation,
  faHouse,
  faPenToSquare,
  faRightFromBracket,
  faAngleRight,
  faCaretUp,
  faSquare,
  faSquareMinus,
  faSquareCheck,
  faExclamation,
  faCommentDollar,
  faPlus,
  faMinus,
  faRotateLeft,
  faBroom,
  faCloudArrowUp
)

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
