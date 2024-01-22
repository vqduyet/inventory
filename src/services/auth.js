import http from '../utils/http'
import conf from '../config'

export const API_ROOT = `${conf.API_URL}`

const authService = {
  login(client_id, grant_type, email, password, refresh_token) {
    return `{'user': email, 'permissions': ['Users_Read']}`
  },
  getUserProfile() {
    return `{'user': 'abc'}`
  },
  updateProfile(payload) {
    return http.put(`${API_ROOT}/me`, payload).then((resp) => {
      return resp
    })
  },
  changePassword(payload) {
    return http.put(`${API_ROOT}/me/change-password`, payload).then((resp) => {
      return resp
    })
  }
}

export default authService
