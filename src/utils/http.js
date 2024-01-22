import _ from 'lodash'
import axios from 'axios'
import appStore from '../store'
import { APP_MUTATIONS } from '../store/mutations'

export class HttpResponse {
  static error(error, method, url, errorMsg) {
    // console.warn(`Error [${method}] to ${url}`, error)
    this.errorObj = _.isObject(error) ? error : {}
    let res = new HttpResponse(this.errorObj, this.errorObj)
    return res
  }
  static success(data) {
    return new HttpResponse(data)
  }
  constructor(data, error, errorObj, msg) {
    this.error = (data.error ? data.error : error) || false
    this.errorObj = _.isObject(errorObj) ? errorObj : {}
    this.msg = msg
    this.data = data
  }
  get isEmpty() {
    return _.isEmpty(this.data)
  }
  get errorMsg() {
    return this.errorObj.message ? this.errorObj.message : this.msg ? this.msg : 'Unknown error'
  }
}

const HTTP_METHOD = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put'
}

const processHttp = (method, url, data, config) => {
  appStore.commit(APP_MUTATIONS.LOADING_START)
  return axios({
    method: method,
    url: `${url}`,
    data: data,
    requiredAuth: true,
    ...config
  })
    .then((response) => {
      if (process.env.NODE_ENV === 'development') {
        // console.warn(`[${method}]`, url, data || '')
      }
      if (response.status === 401) {
        return HttpResponse.error(response, method, url)
      }
      if (_.isObject(response) && _.isObject(response.data)) {
        let message = ''
        if (!_.isUndefined(response.data.m)) {
          message = response.data.m
        }
        return new HttpResponse(response.data, !response.data.ok, response.data.error, message)
      } else if (response.headers['content-disposition']) {
        let arr = response.headers['content-disposition'].split(';')
        let param = _.find(arr, (item) => item.trim().startsWith('filename='))
        return new HttpResponse(response.data, false, undefined, param.split('=')[1])
      } else {
        return HttpResponse.error(response, method, url)
      }
    })
    .catch((error) => {
      return Promise.resolve(HttpResponse.error(error, method, url, error.message))
    })
    .finally(() => {
      appStore.commit(APP_MUTATIONS.LOADING_END)
    })
}

export const http = {
  get: (url, config) => processHttp(HTTP_METHOD.get, url, '', config),
  post: (url, data, config) => processHttp(HTTP_METHOD.post, url, data, config),
  put: (url, data, config) => processHttp(HTTP_METHOD.put, url, data, config),
  delete: (url, config) => processHttp(HTTP_METHOD.delete, url, config),
  success: HttpResponse.success,
  error: HttpResponse.error,
  buildParams(object) {
    let res = []
    if (_.isObject(object)) {
      for (let k in object) {
        let val = object[k]
        if (val === undefined || val === null) {
          val = ''
        }
        if (_.isArray(val)) {
          val = val.join(',')
        }
        res.push(`${k}=${val}`)
      }
    }
    return res.length > 0 ? `${res.join('&')}` : ''
  }
}

export default http

export function param(array) {
  var str = ''
  array.forEach((el, i) => {
    el.val = el.val === null || el.val === undefined ? '' : el.val
    if (!(el.query == 'pageSize' && el.val == '')) {
      i == 0 ? (str += '?' + el.query + '=' + el.val) : (str += '&' + el.query + '=' + el.val)
    }
  })
  return str
}
