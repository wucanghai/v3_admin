import axios, { AxiosRequestConfig, type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

function createService() {
  const instance: AxiosInstance = axios.create({
    timeout: 6000,
    baseURL: import.meta.env.VITE_BASE_API,
    data: {}
  })

  instance.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  )

  // 请求拦截
  instance.interceptors.response.use(
    (response) => {
      const data = response.data.data
      if (data.code === undefined) {
        ElMessage.error('非本系统接口！')
        return Promise.reject('非本系统接口！')
      }

      if (data.code === 200) {
        return data
      } else {
        ElMessage.error(data.message || '接口错误')
        return Promise.reject(data)
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

function createRequestFunction(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const configDefault = {
      // headers: {
      //   // 携带 Token
      //   Authorization: "Bearer " + getToken(),
      //   "Content-Type": get(config, "headers.Content-Type", "application/json")
      // },
      // timeout: 5000,
      // baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

export const service = createService()

export const request = createRequestFunction(service)
