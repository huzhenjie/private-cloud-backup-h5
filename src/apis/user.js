import req from '@/apis/req'

export function register(data) {
  return req.post('/api/v1/h5/account', data)
}
