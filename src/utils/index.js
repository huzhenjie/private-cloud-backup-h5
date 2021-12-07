export function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
    }
    const { lastModified, name, size, type } = file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      const image = new Image()
      image.src = e.target.result
      image.onload = () => {
        const width = image.width
        const height = image.height
        resolve({
          width,
          height,
          name,
          size,
          imgType: type,
          imgTime: lastModified
        })
      }
    }
  })
}
