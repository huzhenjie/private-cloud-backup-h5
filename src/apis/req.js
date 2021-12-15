import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = authorization
    return config
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (!response.headers['content-type'].includes('json')) {
      return response
    }
    const { code, msg } = response.data
    switch (code) {
      case 444:
        return Promise.reject(new Error(msg || 'Login expired'))
      case 200:
      case 222: // hard coded
        break
      default:
        return Promise.reject(new Error(msg || `Server error：${code}`))
    }
    return response.data
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
