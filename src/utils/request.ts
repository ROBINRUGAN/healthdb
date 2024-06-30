import router from '@/router'
import axios from 'axios'
import { ro } from 'element-plus/es/locales.mjs'
import { showFailToast } from 'vant'

// 创建axios实例
export const service = axios.create({
  baseURL: `http://47.113.97.12:9001/`,
  timeout: 20000, // 超时时间
  withCredentials: false // 是否允许带cookie
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['Access-Control-Allow-Origin'] = '*'
    const authString = window.localStorage.getItem('auth')
    let token = ''
    if (authString) {
      const auth = JSON.parse(authString)
      token = auth.token
    }
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      // 登录过期
      showFailToast('登录过期，请重新登录')
      window.localStorage.removeItem('auth')
      router.push('/login')
      return Promise.reject(response.data)
    }
  },
  (error) => Promise.reject(error)
)

export default service
