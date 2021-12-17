import req from '@/apis/req'

export default {
  applyUpload(file_list) {
    return req.post('/api/v1/file/h5/upload/apply', file_list)
  },
  upload(url, file) {
    const form_data = new FormData()
    form_data.append('file', file)
    return req.post(url, form_data, {
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + Date.now()
      }
    })
  },
  uploadCombine(id) {
    return req.post(`/api/v1/file/h5/upload/${id}/combine`)
  },
  getImgList(last_id, last_file_time) {
    return req.get('/api/v1/file/h5/img', {
      params: {
        last_id,
        last_file_time
      }
    })
  }
}
