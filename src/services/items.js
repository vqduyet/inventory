import http from '../utils/http'
import conf from '../config'

export const API_ROOT = `${conf.API_URL}`

const itemsService = {
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

  findItems(data) {
    let param = ''
    if (data) {
      param = this.addUrlParameter('size', data.paging.size, param)
      param = this.addUrlParameter('page', data.paging.page, param)
    }
    return http.get(`${API_ROOT}/item${param}`)
  },
  getItem(id) {
    return http.get(`${API_ROOT}/item/${id}`)
  },
  createItem(data) {
    return http.post(`${API_ROOT}/item`, data)
  },
  updateItem(data) {
    return http.put(`${API_ROOT}/item/${data.id}`, data)
  },
  getItemsByStorage(storageId) {
    return http.get(`${API_ROOT}/item/all-by-storage/${storageId}`)
  },
  getItemWithStockInfo(id) {
    return http.get(`${API_ROOT}/item/${id}/stock-info`)
  },
  restockItem(data) {
    return http.post(`${API_ROOT}/item/restock`, data)
  },
  putToUse(data) {
    return http.post(`${API_ROOT}/item/put-to-use`, data)
  },
  disposeItem(id) {
    return http.post(`${API_ROOT}/item/${id}/disposal`)
  },
  getItemsByCategory(categoryId) {
    return http.get(`${API_ROOT}/item/all-by-category/${categoryId}`)
  }
}

export default itemsService
