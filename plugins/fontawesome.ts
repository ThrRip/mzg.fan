import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPodcast,
  faVideo,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons'
import {
  faBilibili
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faPodcast,
  faVideo,
  faArrowUpRightFromSquare,
  faBilibili
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
