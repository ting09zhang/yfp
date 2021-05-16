import request from '@/utils/request'
// 互转
export const balancetransfer = data => {
  return request({
    url: '/user.Wallet/balancetransfer',
    data,
    method: 'POST'
  })
}

// 余额明细

export const balancetInfo = data => {
  return request({
    url: '/User.Wallet/getrecord',
    data,
    method: 'POST'
  })
}

// 提现明细
export const getWithDetails = data => {
  return request({
    url: 'User.Wallet/uwithdrawrecord',
    method: 'post',
    data
  })
}
