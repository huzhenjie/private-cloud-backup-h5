import req from '@/apis/req'

export default {
  applyUpload(file_list) {
    return req.post('/api/v1/h5/upload/apply', file_list)
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
  delFile(file_id) {
    return req.delete(`/api/v1/h5/file/${file_id}`)
  },
  uploadCombine(id) {
    return req.post(`/api/v1/h5/upload/${id}/combine`)
  },
  getImgList(last_id, last_file_time) {
    return req.get('/api/v1/h5/img', {
      params: {
        last_id,
        last_file_time
      }
    })
  }
}
