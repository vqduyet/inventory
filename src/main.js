/* import orders may be mattered */
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import './gb-usage'
import './rules'
import './components'
import './plugins'
import vSelect from 'vue-select'

Vue.config.productionTip = false

Vue.component('v-select', vSelect)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
