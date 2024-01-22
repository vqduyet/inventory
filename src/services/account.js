import { http } from '../utils/http'
import conf from '../config'

export const API_ROOT = `${conf.API_URL}`

const accountServices = {
  verifyAccount(payload) {
    return http
      .post(`${API_ROOT}/account/verify-account`, payload, {
        requiredAuth: false
      })
      .then((resp) => {
        return resp
      })
  },
  forgotPassword(payload) {
    return http
      .post(`${API_ROOT}/account/forgot-password`, payload, {
        requiredAuth: false
      })
      .then((resp) => {
        return resp
      })
  },
  resetPassword(payload) {
    return http
      .post(`${API_ROOT}/account/reset-password`, payload, {
        requiredAuth: false
      })
      .then((resp) => {
        return resp
      })
  }
}

export default accountServices
