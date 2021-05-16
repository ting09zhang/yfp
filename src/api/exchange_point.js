import request from '@/utils/request'

// 积分兑换

export const exchangePoint = data => {
  return request({
    url: '/user/score_exchange',
    data,
    method: 'POST'
  })
}

export const exchangeEdit = data => {
  return request({
    url: 'Setting/score',
    data,
    method: 'POST'
  })
}
