/*
 * @Description:
 * @Author: 振顺
 * @Date: 2023-11-13 17:38:30
 * @LastEditTime: 2023-12-11 15:03:33
 * @LastEditors: 振顺
 */
import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
import { ElMessage } from 'element-plus'

// 设置接口超时时间
axios.defaults.timeout = 60000

// @ts-ignore
// axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data)
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!')
    }
  },
)

/**
 *
 * @param opt.url (必填)请求地址
 * @param opt.method (必填)请求方式
 * @param opt.data query形式传参
 * @param opt.params param形式传参
 * @param opt.responseType 返回值类型(默认json)
 * @param opt.baseURL 请求前缀(默认/crmapi/crm)
 * @param opt.use_defaultCatch 请求失败默认处理方式
 */

const baseURL = '/crmapi/crm' //_dev

function request(opt) {
  if (opt.method == 'jsonp') {
    return requestJSONP(opt)
  } else {
    const userStore = useUserStore()
    return new Promise((resolve, reject) => {
      const nullObj = Object.create(null)
      opt.use_defaultCatch = opt.use_defaultCatch !== false
      axios({
        baseURL: opt.baseURL !== undefined ? opt.baseURL : baseURL,
        url: opt.url,
        method: opt.method,
        params: opt.params || nullObj,
        data: opt.data || nullObj,
        responseType: opt.responseType || 'json',
      })
        .then((res) => {
          if (res.data.code == 401) {
            ElMessage.error(res.data.msg)
            return userStore.actions.logOut(true)
          }
          if (opt.use_dataSource) resolve(res)
          else resolve(res.data)
        })
        .catch((err) => {
          if (opt.use_defaultCatch) {
            ElMessage.error(err)
          }
          reject(err)
        })
    })
  }
}

function requestJSONP(opt) {
  if (!opt.url) throw new Error('url is necessary')
  const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
  const JSONP = document.createElement('script')
  JSONP.setAttribute('type', 'application/javascript')

  const headEle = document.getElementsByTagName('head')[0]

  let ret = ''
  if (opt.data) {
    if (typeof opt.data === 'string') ret = '&' + opt.data
    else if (typeof opt.data === 'object') {
      for (let key in opt.data)
        ret += '&' + key + '=' + encodeURIComponent(opt.data[key])
    }
    ret += '&_time=' + Date.now()
  }
  JSONP.src = `${opt.url}?callback=${callback}${ret}`
  return new Promise((resolve /* reject */) => {
    window[callback] = (r) => {
      resolve(r)
      headEle.removeChild(JSONP)
      delete window[callback]
    }
    headEle.appendChild(JSONP)
  })
}

request.baseURL = baseURL
export default request
