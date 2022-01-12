import req from '@/apis/req'

export function register(data) {
  return req.post('/api/v1/h5/account', data)
}

export function login(data) {
  return req.post('/api/v1/h5/login', data)
}
