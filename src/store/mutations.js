import { setToken, removeToken, getPermissions } from '../misc/auth'

export const APP_MUTATIONS = {
  //AUTH_REQUEST: 'AUTH_REQUEST',
  CHANGED_ROUTER: 'CHANGED_ROUTER',
  LASTED_ROUTE_NOT_AUTH: 'LASTED_ROUTE_NOT_AUTH',
  SET_PREVIOUS_ROUTE: 'SET_PREVIOUS_ROUTE',
  LOADING_START: 'LOADING_START',
  LOADING_END: 'LOADING_END'
}

export const AUTH_MUTATIONS = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  AUTH_ERROR: 'AUTH_ERROR'
}

const appMutations = {
  //[APP_MUTATIONS.AUTH_REQUEST]: () => {},

  [APP_MUTATIONS.CHANGED_ROUTER]: (state, current) => {
    state.currentRoute = current
  },

  [APP_MUTATIONS.LASTED_ROUTE_NOT_AUTH]: (state, currentRoute) => {
    state.lastedRouteNotAuth = currentRoute
  },
  [APP_MUTATIONS.SET_PREVIOUS_ROUTE]: (state, path) => {
    state.previousRoute = path
  },
  [APP_MUTATIONS.LOADING_START]: (state) => {
    state.loading = true
  },
  [APP_MUTATIONS.LOADING_END]: (state) => {
    state.loading = false
  }
}

const authMutations = {
  [AUTH_MUTATIONS.AUTH_SUCCESS]: (state, authRes) => {
    // setToken(token)
    // state.token = token
    state.isAuth = true
    state.user = authRes.user
    state.permissions = authRes.permissions
  },
  // [AUTH_MUTATIONS.UPDATE_USER_PROFILE](state, user) {
  //   state.user = user
  //   state.isAuth = true
  // },
  [AUTH_MUTATIONS.AUTH_ERROR]: (state) => {
    removeToken()
    state.user = ''
    state.isAuth = false
    state.token = null
    state.permissions = null
  }
}

export default {
  ...appMutations,
  ...authMutations
}
