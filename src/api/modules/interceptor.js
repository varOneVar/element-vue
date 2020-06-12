import axios from 'axios'
import { Message } from 'element-ui'
import { getMessage } from './error'
import settings from '@/settings'
// import store from '@/store'
import CancelRepeatRequest from './requestCancel'

export function CreateAxiosInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000,
    withCredentials: false
  })
}
const service = CreateAxiosInstance()
function getParams(config) {
  const obj = {
    post: 'data',
    get: 'params'
  }
  const key = obj[config.method]
  return config[key]
}

// 取消重复请求
const cancelRequest = new CancelRepeatRequest()

service.interceptors.request.use(
  (config) => {
    const params = getParams(config)
    // if (store.getters.token) {
    // }

    // 取消重复请求
    if (params.noCancel) {
      delete params.noCancel
    } else {
      cancelRequest.remove(config, params)
      cancelRequest.add(config, params)
    }
    return config
  },
  (error) => {
    Message({
      message: '请求异常 ' + error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { config, data, data: { flag } } = response
    // 取消重复请求
    cancelRequest.remove(config)

    // 如果是blob二进制数据直接将整个response返回
    if (config.responseType === 'blob') {
      return response
    }
    if (flag !== settings.flag) {
      // 只是弹个提示，数据还是返回出去了，页面还是要判断code是否等于0
      Message.error(getMessage(flag, (data.message || data.result)))
    }
    return data
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      Message.error('网络开小差(' + error.response.status + ')')
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
      Message.error('请求无响应，网络较差或已断开！')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      if (axios.isCancel(error)) {
        console.log('Request canceled（取消重复请求）', error.message)
      } else {
        Message.error(`请求失败：（${error.message}）！`)
      }
    }
    console.log(error.config)
    return Promise.reject(error)
  }
)

export const __get = (url, args = {}, config = {}) => service.get(url, { params: args, ...config })
export const __post = (url, args = {}, config = {}) => service.post(url, args, config)

export default service
