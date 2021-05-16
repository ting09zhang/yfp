import request from '@/utils/request'

// 获取收货地址

export const getAdressList = data => {
  return request({
    url: '/address/lists',
    data,
    method: 'POST'
  })
}

// 新增收货地址 
export const addAdressList = data => {
  return request({
    url: '/address/add',
    data,
    method: 'POST'
  })
}

// 设置默认地址
export const defaultAdressList = data => {
  return request({
    url: '/address/setDefault',
    data,
    method: 'POST'
  })
}

// 编辑地址
export const editAdressList = data => {
  return request({
    url: '/address/edit',
    data,
    method: 'POST'
  })
}

// 删除地址
export const removeAdressList = data => {
  return request({
    url: '/address/delete',
    data,
    method: 'POST'
  })
}
