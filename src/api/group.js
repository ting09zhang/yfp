import request from '@/utils/request'

// 获取期团详情

export const getGroupDetails = data => {
  return request({
    url: '/interest.Goods/detail',
    data,
    method: 'POST'
  })
}

// 获取期团详情本期参与

export const getGroupDetailsNow = data => {
  return request({
    url: '/interest.Goods/currentapply',
    data,
    method: 'POST'
  })
}

// 期团支付

export const payGroup = data => {
  return request({
    url: '/interest.Goods/buy_group',
    data,
    method: 'POST'
  })
}


// 查询升级团长配置信息
export const detailGroup = data => {
  return request({
    url: '/user/upgradegroup',
    data,
    method: 'POST'
  })
}

// 根据团长id获取商品信息

export const detailGoodsByGroupId = data => {
  return request({
    url: '/Goods/lists',
    data,
    method: 'POST'
  })
}