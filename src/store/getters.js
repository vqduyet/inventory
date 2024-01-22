import { getPermissions, getRoles } from '../misc/auth'

export default {
  roles: () => getRoles(),
  permissions: () => getPermissions()
}
