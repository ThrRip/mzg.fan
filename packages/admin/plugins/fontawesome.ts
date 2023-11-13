import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faHouse,
  faPenToSquare,
  faChartColumn,
  faAngleRight,
  faCaretUp,
  faSquareMinus,
  faSquareCheck,
  faCommentDollar,
  faPlus,
  faMinus,
  faRotateLeft,
  faCloudArrowUp
} from '@fortawesome/free-solid-svg-icons'
import {
  faSquare
} from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

library.add(
  faHouse,
  faPenToSquare,
  faChartColumn,
  faAngleRight,
  faCaretUp,
  faSquare,
  faSquareMinus,
  faSquareCheck,
  faCommentDollar,
  faPlus,
  faMinus,
  faRotateLeft,
  faCloudArrowUp
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
