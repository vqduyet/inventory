import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
//import modules from './modules'
import mutations from './mutations'
import getters from './getters'
import state from './state'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  state,
  actions,
  //modules,
  mutations,
  getters
})

export default store
