import _ from 'lodash'
import authService from '../services/auth'
import { APP_MUTATIONS, AUTH_MUTATIONS, LANG_MUTATIONS } from './mutations'
import conf from '../config'

export const APP_ACTIONS = {
  SET_PREVIOUS_ROUTE: 'SET_PREVIOUS_ROUTE'
}

export const AUTH_ACTIONS = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  GET_USER_PROFILE: 'GET_USER_PROFILE'
}

const appActions = {
  [APP_ACTIONS.SET_PREVIOUS_ROUTE]: (context, data) => {
    if (data) {
      if (!context.state.authRoutes.includes(data.path) && !data.meta.auth) {
        context.commit(APP_MUTATIONS.SET_PREVIOUS_ROUTE, data)
      }
    }
  }
}

const authActions = {
  [AUTH_ACTIONS.LOGIN]: (context, payload = {}) => {
    const { grant_type, email, password, refresh_token } = _.isObject(payload) ? payload : {}
    return authService
      .login(conf.CLIENT_ID, grant_type, email, password, refresh_token)
      .then((resp) => {
        context.commit(AUTH_MUTATIONS.AUTH_SUCCESS, resp)
        return resp
      })
      .catch(() => {
        context.commit(AUTH_MUTATIONS.AUTH_ERROR)
      })
  },
  [AUTH_ACTIONS.GET_USER_PROFILE]: (context) => {
    if (context.state.token) {
      return authService.getUserProfile().then((resp) => {
        if (!resp.error) {
          context.commit(AUTH_MUTATIONS.UPDATE_USER_PROFILE, resp.data.d)
        }
        return resp
      })
    }
  },
  [AUTH_ACTIONS.LOGOUT]: (context, currentRoute) => {
    if (currentRoute && currentRoute.meta && currentRoute.meta.auth) {
      context.commit(APP_MUTATIONS.LASTED_ROUTE_NOT_AUTH, currentRoute)
    }
    context.commit(AUTH_MUTATIONS.AUTH_ERROR)
    context.state.isAuth = false
  }
}

export default {
  ...appActions,
  ...authActions
}
