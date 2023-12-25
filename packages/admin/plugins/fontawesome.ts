import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
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

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
