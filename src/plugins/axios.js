import axios from 'axios'
import _ from 'lodash'
import { getAccessToken, getRefreshToken } from '../misc/auth'
import store from '../store'
import { AUTH_ACTIONS } from '../store/actions'
import { AUTH_MUTATIONS } from '../store/mutations'
import conf from '../config'
import toast from '../utils/showToast'

let fetchingTokenRequest

const fetchAccessToken = () => {
  if (!fetchingTokenRequest) {
    let refresh_token = getRefreshToken()
    if (refresh_token) {
      fetchingTokenRequest = store.dispatch(AUTH_ACTIONS.LOGIN, {
        client_id: conf.CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      })
    } else {
      throw new axios.Cancel('Operation canceled.')
    }
  }
  return fetchingTokenRequest
}

const setHeaderAuthorization = (reqConfig) => {
  let access_token = getAccessToken()
  if (access_token) {
    reqConfig.headers['Authorization'] = `Bearer ${access_token}`
  }
}

const isMeRequest = (config) => {
  return config.method === 'get' && config.url === `${conf.API_URL}/me`
}

//interceptors handler
axios.interceptors.request.use(
  async (reqConfig) => {
    let access_token = getAccessToken()
    if (!access_token) {
      if (reqConfig.requiredAuth) {
        const refresh_token = getRefreshToken()
        if (refresh_token) {
          await fetchAccessToken()
            .then((resp) => {
              fetchingTokenRequest = null
              if (resp && !resp.error) {
                setHeaderAuthorization(reqConfig)
              }
            })
            .catch((_error) => {
              fetchingTokenRequest = null
            })
        } else {
          store.dispatch(AUTH_ACTIONS.LOGOUT)
        }
        if (isMeRequest(reqConfig)) {
          return axios.Cancel()
        }
      }
    } else {
      setHeaderAuthorization(reqConfig)
    }
    return reqConfig
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (resp) => {
    if (!resp.data.ok) {
      toast.error('Error', resp.data.m)
    }
    return resp
  },
  (error) => {
    if (_.isObject(error.response)) {
      toast.error('Error', error.message)

      const {
        config,
        response: { status }
      } = error

      if (status === 429) {
        alert('Please try again later.')
        return new Promise(() => {})
      }

      if (status === 401) {
        return fetchAccessToken()
          .then((resp) => {
            fetchingTokenRequest = null
            if (resp && !resp.error) {
              setHeaderAuthorization(config)
              return axios(config)
            }
            store.commit(AUTH_MUTATIONS.AUTH_ERROR)
            throw new axios.Cancel('Unauthorized.')
          })
          .catch((_error) => {
            fetchingTokenRequest = null
            store.commit(AUTH_MUTATIONS.AUTH_ERROR)
            return Promise.reject(_error)
          })
      }
    }
    return Promise.reject(error)
  }
)
