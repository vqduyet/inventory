import Vue from 'vue'

/* bootstrap, styles */
import '../assets/styles/app.scss'
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

/* validation */
import { ValidationObserver, ValidationProvider } from 'vee-validate'
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

/* vue-scroll */
import vuescroll from 'vuescroll'
Vue.use(vuescroll, {
  ops: {
    bar: { background: 'rgba(99, 99, 99, 0.2)' }
  }
})

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserAlt,
  faKey,
  faCoffee,
  faBars,
  faTachometerAlt,
  faLifeRing,
  faAddressBook,
  faQuestionCircle,
  faAngleRight,
  faTools,
  faBoxes,
  faSitemap,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEllipsisV,
  faEye,
  faEyeSlash,
  faAddressCard,
  faSignOutAlt,
  faBox,
  faShieldAlt,
  faMapMarkerAlt,
  faHome,
  faTrash,
  faExchangeAlt,
  faUserTag,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faUserAlt,
  faKey,
  faCoffee,
  faBars,
  faTachometerAlt,
  faLifeRing,
  faAddressBook,
  faQuestionCircle,
  faAngleRight,
  faTools,
  faBoxes,
  faSitemap,
  faPlus,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEllipsisV,
  faEye,
  faEyeSlash,
  faAddressCard,
  faSignOutAlt,
  faBox,
  faShieldAlt,
  faMapMarkerAlt,
  faHome,
  faTrash,
  faExchangeAlt,
  faUserTag,
  faLayerGroup
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
