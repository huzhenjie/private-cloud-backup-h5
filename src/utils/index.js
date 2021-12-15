import Router from '@/routers'

export function getCurrentRoute() {
  const history = Router.history || {}
  return history.current || {}
}

export function isImg(file_type) {
  const curr_file_type = file_type.toLowerCase()
  return curr_file_type === 'image/jpeg' || curr_file_type === 'image/png'
}

export function getFileInfo(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
    }
    const { lastModified, name, size, type } = file

    const res = {
      file_name: name,
      file_size: size,
      file_type: type,
      file_time: lastModified,
      width: 0,
      height: 0
    }
    if (!isImg(type)) {
      resolve(res)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      const image = new Image()
      image.src = e.target.result
      image.onload = () => {
        res.width = image.width
        res.height = image.height
        resolve(res)
      }
    }
  })
}
