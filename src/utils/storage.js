// 将数据从本地存储取出来
export const getItem = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch {
    return window.localStorage.getItem(key)
  }
}

// 将数据存入本地存储
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
