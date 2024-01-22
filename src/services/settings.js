import http from '../utils/http'
import conf from '../config'

export const API_ROOT = `${conf.API_URL}`

const settingsService = {
  addUrlParameter(paramName, data, existingParam = '') {
    if (data !== undefined) {
      if (existingParam === '') {
        existingParam = `${existingParam}?${paramName}=${data}`
      } else {
        existingParam = `${existingParam}&${paramName}=${data}`
      }
    }
    return existingParam
  },

  findStorages(data) {
    let param = ''
    if (data) {
      param = this.addUrlParameter('size', data.paging.size, param)
      param = this.addUrlParameter('page', data.paging.page, param)
    }
    return http.get(`${API_ROOT}/storage${param}`)
  },
  getAllStorages() {
    return http.get(`${API_ROOT}/storage/all`)
  },
  getAllStoragesByAuthUser() {
    return http.get(`${API_ROOT}/storage/all-by-auth-user`)
  },
  getStorage(id) {
    return http.get(`${API_ROOT}/storage/${id}`)
  },
  createStorage(data) {
    return http.post(`${API_ROOT}/storage`, data)
  },
  updateStorage(data) {
    return http.put(`${API_ROOT}/storage/${data.id}`, data)
  },
  assignStorageToUsers(data) {
    return http.post(`${API_ROOT}/storage/${data.id}/assign-users`, data)
  },

  findCategories(data) {
    let param = ''
    if (data) {
      param = this.addUrlParameter('size', data.paging.size, param)
      param = this.addUrlParameter('page', data.paging.page, param)
    }
    return http.get(`${API_ROOT}/category${param}`)
  },
  getCategory(id) {
    return http.get(`${API_ROOT}/category/${id}`)
  },
  createCategory(data) {
    return http.post(`${API_ROOT}/category`, data)
  },
  updateCategory(data) {
    return http.put(`${API_ROOT}/category/${data.id}`, data)
  },
  getAllCategories() {
    return http.get(`${API_ROOT}/category/all`)
  },
  findCategoriesByStorage(storageId) {
    return http.get(`${API_ROOT}/category/all-by-storage/${storageId}`)
  },
  findRoles(data) {
    let param = ''
    if (data) {
      param = this.addUrlParameter('size', data.paging.size, param)
      param = this.addUrlParameter('page', data.paging.page, param)
    }
    return http.get(`${API_ROOT}/roles${param}`)
  },
  getAllRolesMeta() {
    return http.get(`${API_ROOT}/roles/meta`)
  },
  getRole(id) {
    return http.get(`${API_ROOT}/roles/${id}`)
  },
  createRole(data) {
    return http.post(`${API_ROOT}/roles`, data)
  },
  updateRole(data) {
    return http.put(`${API_ROOT}/roles/${data.id}`, data)
  },
  getAllPermissionsMeta() {
    return http.get(`${API_ROOT}/permissions/meta`)
  },
  findUsers(data) {
    let param = ''
    if (data) {
      param = this.addUrlParameter('size', data.paging.size, param)
      param = this.addUrlParameter('page', data.paging.page, param)
    }
    return http.get(`${API_ROOT}/users${param}`)
  },
  getUsersMeta() {
    return http.get(`${API_ROOT}/users/meta`)
  },
  getUser(id) {
    return http.get(`${API_ROOT}/users/${id}`)
  },
  createUser(data) {
    return http.post(`${API_ROOT}/users`, data)
  },
  updateUser(data) {
    return http.put(`${API_ROOT}/users/${data.user_id}`, data)
  },
  resetPassword(data) {
    return http.put(`${API_ROOT}/users/${data.user_id}/reset-pwd`, data)
  }
}

export default settingsService
