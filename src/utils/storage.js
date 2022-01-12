function getKeyPrefix(key) {
  return `PC:${key}`
}

export function setStorageStr(key, str) {
  if (window.localStorage) {
    const storageKey = getKeyPrefix(key)
    window.localStorage.setItem(storageKey, str)
  }
}

export function getStorageStr(key) {
  if (window.localStorage) {
    const storageKey = getKeyPrefix(key)
    return window.localStorage.getItem(storageKey)
  }
}

export function removeStorage(key) {
  if (window.localStorage) {
    const storageKey = getKeyPrefix(key)
    window.localStorage.removeItem(storageKey)
  }
}

export function setStorageObj(key, obj) {
  setStorageStr(key, JSON.stringify(obj))
}

export function getStorageObj(key, defaultValue = null) {
  const str = getStorageStr(key)
  if (!str) {
    return defaultValue
  }
  try {
    return JSON.parse(str)
  } catch (e) {
    return defaultValue
  }
}
