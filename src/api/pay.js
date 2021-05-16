import request from '@/utils/request'

export const payOther = data => {
  return request({
    url: 'Interest.Order/checkout',
    method: 'post',
    data
  })
}

export const payPoint = data => {
  return request({
    url: 'order/buyNow',
    method: 'post',
    data
  })
}

export const payLevel = data => {
  return request({
    url: 'order/buygroup',
    method: 'post',
    data
  })
}
export const numberquery = data => {
  return request({
    url: 'interest.Order/acddefiiintv',
    method: 'post',
    data
  })
}
