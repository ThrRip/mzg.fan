import { library, config } from '@fortawesome/fontawesome-svg-core'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
} from '@fortawesome/free-solid-svg-icons'
import {
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
