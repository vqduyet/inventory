import _ from 'lodash'
import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'
import appStore from '../store'
import route from '../misc/route'
import { APP_MUTATIONS, AUTH_MUTATIONS } from '../store/mutations'
import { APP_ACTIONS, AUTH_ACTIONS } from '../store/actions'
import { getAccessToken, getRefreshToken, hasAnyPermission, removeToken } from '../misc/auth'
import { paths } from './paths'

Vue.use(Router)
Vue.use(VueMeta)

const LOGIN_PATH = paths.login.path
const DEFAULT_ROUTE_PATH = paths.home.path
const NOTFOUND_PATH = paths.notFound.path
const FORBIDDEN_PATH = paths.forbidden.path

export function getDefaultRoute() {
  return DEFAULT_ROUTE_PATH
}

const arrRouterAuth = []
for (let item in paths) {
  if (paths[item].meta && paths[item].meta.auth) {
    arrRouterAuth.push(paths[item].path)
  }
}

let vueRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: DEFAULT_ROUTE_PATH
    },
    ...route.buildConfig(paths),
    {
      path: '**',
      redirect: NOTFOUND_PATH
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

const checkPermission = (to, next) => {
  if (appStore.state.token) {
    if (arrRouterAuth.some((p) => p === to.path)) {
      if (to.meta && to.meta.permissions && to.meta.permissions.length > 0) {
        if (!hasAnyPermission(to.meta.permissions)) {
          next({
            path: FORBIDDEN_PATH
          })
        } else {
          next()
        }
      } else {
        next()
      }
    } else if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'auth')) {
      if (to.meta.auth === false) {
        next({
          path: appStore.store && appStore.store.lastedRouteNotAuth ? appStore.store.lastedRouteNotAuth.path : DEFAULT_ROUTE_PATH
        })
      }
    } else {
      next({
        path: NOTFOUND_PATH,
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    let redirect = appStore.lastedRouteNotAuth || vueRouter.currentRoute
    if (to.meta.auth && to.path !== LOGIN_PATH) {
      if (['Home'].includes(to.name)) {
        vueRouter.push({
          path: LOGIN_PATH
        })
      } else {
        vueRouter.push({
          path: LOGIN_PATH,
          query: {
            redirect: redirect.fullPath || redirect.path
          }
        })
      }
    } else {
      next()
    }
  }
}

vueRouter.beforeEach((to, from, next) => {
  appStore.commit(APP_MUTATIONS.LOADING_START)

  if (!getAccessToken() && !getRefreshToken()) {
    removeToken()
    if (to.meta.auth) {
      vueRouter.push({
        path: LOGIN_PATH
      })
    } else {
      if (to.matched.length) {
        next()
      } else {
        vueRouter.push({
          path: LOGIN_PATH
        })
      }
    }
  } else {
    if (!to.matched.length && to.meta.auth) {
      next(getDefaultRoute())
    } else {
      checkPermission(to, next)
    }
  }
})

vueRouter.afterEach((to, from) => {
  appStore.commit(APP_MUTATIONS.LOADING_END)
  appStore.commit(APP_MUTATIONS.CHANGED_ROUTER, to)
  appStore.dispatch(APP_ACTIONS.SET_PREVIOUS_ROUTE, from)
})

vueRouter.onReady(() => {
  appStore.subscribe((mutations, store) => {
    switch (mutations.type) {
      case AUTH_MUTATIONS.AUTH_SUCCESS: {
        let redirect = store.lastedRouteNotAuth || vueRouter.currentRoute //usually, this is login path
        if (!redirect.meta.auth) {
          let redirectTo = ''
          if (!_.isEmpty(redirect.query)) {
            if (redirect.query.redirect) {
              if (redirect.query.redirect === '/') {
                redirectTo = DEFAULT_ROUTE_PATH
              } else {
                redirectTo = redirect.query.redirect
              }
            } else {
              redirectTo = DEFAULT_ROUTE_PATH
            }
          } else {
            redirectTo = DEFAULT_ROUTE_PATH
          }
          vueRouter.push(redirectTo).catch((err) => {})
        }
        break
      }
      case AUTH_MUTATIONS.AUTH_ERROR: {
        let redirect = store.lastedRouteNotAuth || vueRouter.currentRoute
        if (redirect.meta.auth && redirect.path !== LOGIN_PATH) {
          if (['NotFound'].includes(redirect.name))
            vueRouter.push({
              path: LOGIN_PATH
            })
          else
            vueRouter.push({
              path: LOGIN_PATH,
              query: {
                redirect: redirect.fullPath || redirect.path
              }
            })
        } else if (vueRouter.currentRoute.path !== LOGIN_PATH) {
          vueRouter.push({
            path: LOGIN_PATH
          })
        }
        break
      }
    }
  })
  appStore.dispatch(AUTH_ACTIONS.GET_USER_PROFILE).then(() => {
    vueRouter.beforeEach((to, from, next) => {
      next()
    })
  })
})

export default vueRouter
