import request from '@/utils/request'

// 获取支付宝银行卡信息
export const getDepositDetails = data => {
  return request({
    url: 'User.Wallet/userpayinfo',
    data,
    method: 'POST'
  })
}

// 更新支付宝信息
export const updateZfbInfo = data => {
  return request({
    url: 'User.Wallet/operationuserzfb',
    data,
    method: 'POST'
  })
}


// 更新银行卡信息
export const updateBankInfo = data => {
  return request({
    url: 'User.Wallet/operationuserbank',
    data,
    method: 'POST'
  })
}

// 余额提现
export const submitDeposit = data => {
  return request({
    url: '/User.Wallet/userbwithdraw',
    data,
    method: 'POST'
  })
}