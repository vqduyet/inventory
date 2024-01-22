import route from '../misc/route'
import { PERMISSIONS } from '../commons/constants'

const META_AUTH_REQUIRED = {
  auth: true
}

const Login = () => import('../views/auth/login')
const ForgotPassword = () => import('../views/auth/forgot-password')
const AccountVerification = () => import('../views/auth/account-verification')
const ResetPassword = () => import('../views/auth/reset-password')
const NotFound = () => import('../views/404')
const Forbidden = () => import('../views/404')
const Home = () => import('../views/home')
const Storage = () => import('../views/settings/storage')
const Category = () => import('../views/settings/category')
const Item = () => import('../views/settings/item')
const Operation = () => import('../views/operation')
const Role = () => import('../views/settings/role')
const User = () => import('../views/settings/user')
const Profile = () => import('../views/profile')

export const paths = {
  accountVerification: route.register('/verify-email', 'AccountVerification', AccountVerification, { auth: false, layout: 'layout-simple' }),
  resetPassword: route.register('/reset-password', 'ResetPassword', ResetPassword, { auth: false, layout: 'layout-simple' }),
  login: route.register('/login', 'Login', Login, {
    auth: false,
    layout: 'layout-simple'
  }),
  forgotPassword: route.register('/forgot-password', 'ForgotPassword', ForgotPassword, { auth: false, layout: 'layout-simple' }),

  notFound: route.register('/not-found', 'NotFound', NotFound, {
    ...META_AUTH_REQUIRED,
    breadCrumb: '404'
  }),
  forbidden: route.register('/forbidden', 'Forbidden', Forbidden, {
    ...META_AUTH_REQUIRED,
    breadCrumb: '404'
  }),
  home: route.register('/home', 'Home', Home, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Home'
  }),
  storage: route.register('/storage', 'Storage', Storage, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Storage',
    permissions: [PERMISSIONS.storage.read]
  }),
  category: route.register('/category', 'Category', Category, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Category',
    permissions: [PERMISSIONS.category.read]
  }),
  item: route.register('/item', 'Item', Item, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Item',
    permissions: [PERMISSIONS.item.read]
  }),
  role: route.register('/role', 'Role', Role, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Role',
    permissions: [PERMISSIONS.role.read]
  }),
  user: route.register('/user', 'User', User, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'User',
    permissions: [PERMISSIONS.user.read]
  }),
  operaton: route.register('/operation', 'Operation', Operation, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Operation',
    permissions: [PERMISSIONS.menu.operation]
  }),
  profile: route.register('/profile', 'Profile', Profile, {
    ...META_AUTH_REQUIRED,
    breadCrumb: 'Profile'
  })
}

export default paths
