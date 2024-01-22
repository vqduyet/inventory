import { getToken } from '../misc/auth'

export default {
  status: '',
  user: '',
  isAuth: false,
  currentRoute: {},
  lastedRouteNotAuth: '',
  previousRoute: '/',
  authRoutes: ['/login'],
  meta: null,
  permissions: null,
  loading: false
}
