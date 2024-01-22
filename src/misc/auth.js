import decode from 'jwt-decode'
import generic from '../misc/generic'
import store from '../store'

const USER_TOKEN_KEY = 'USER_TOKEN'

export function getAccessToken() {
  const token = getToken()
  if (token) {
    const access_token = token.access_token
    const decodedAccessToken = decodeJwt(access_token)
    if (!decodedAccessToken.exp) {
      return undefined
    }
    const expiryDate = new Date(0)
    expiryDate.setUTCSeconds(decodedAccessToken.exp)

    if (!!access_token && expiryDate > new Date()) {
      return access_token
    }
  }
  return undefined
}

export function getRefreshToken() {
  const token = getToken()
  if (token) {
    const refresh_token = token.refresh_token
    const decodedRefreshToken = decodeJwt(refresh_token)
    if (!decodedRefreshToken.exp) {
      return undefined
    }
    const expiryDate = new Date(0)
    expiryDate.setUTCSeconds(decodedRefreshToken.exp)

    if (!!refresh_token && expiryDate > new Date()) {
      return refresh_token
    }
  }
  return undefined
}

export function setToken(token) {
  generic.setJsonLocalStorage(USER_TOKEN_KEY, token)
}

export function getToken() {
  return generic.getJsonLocalStorage(USER_TOKEN_KEY)
}

export function removeToken() {
  generic.removeLocalStorage(USER_TOKEN_KEY)
}

function decodeJwt(encoded) {
  try {
    return decode(encoded)
  } catch (e) {
    return {}
  }
}

export function getPermissions() {
  const refresh_token = getRefreshToken()
  if (refresh_token) {
    const token = getToken()
    if (token) {
      const access_token = token.access_token
      const decodedAccessToken = decodeJwt(access_token)
      if (!decodedAccessToken.Permissions) {
        return undefined
      }
      const permissions = decodedAccessToken.Permissions
      if (!!access_token && permissions) {
        return permissions
      }
    }
  }
  return undefined
}

let userPermissions = () => getPermissions()

export function hasAnyPermission(permissions) {
  if (typeof permissions === 'string') {
    permissions = [permissions]
  }

  if (checkRoleAdmin()) {
    return true
  }

  let userPermissionArr = userPermissions()
  if (!userPermissionArr) {
    return false
  }
  if (typeof userPermissionArr === 'string') {
    userPermissionArr = [userPermissionArr]
  }
  for (let i = 0; i < permissions.length; i++) {
    if (userPermissionArr.includes(permissions[i])) {
      return true
    }
  }

  return false
}

export function getRoles() {
  const token = getToken()
  if (token) {
    const access_token = token.access_token
    if (access_token) {
      const decodedAccessToken = decodeJwt(access_token)
      let roles = decodedAccessToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      if (roles) {
        if (typeof roles === 'string') {
          roles = [roles]
        }
        return roles
      }
    }
  }
  return undefined
}

const userRoles = () => getRoles()

export function checkRoleAdmin() {
  let userRoleArr = userRoles()
  if (!userRoles()) {
    return false
  }
  if (typeof userRoleArr === 'string') {
    userRoleArr = [userRoleArr]
  }
  if (userRoles().includes('SystemAdmin')) {
    return true
  }
  return false
}
