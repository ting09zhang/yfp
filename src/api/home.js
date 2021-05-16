import request from '@/utils/request'

// 获取首页轮播图

export const getSwiperList = data => {
  return request({
    url: '/jmapp.index/lists',
    data,
    method: 'POST'
  })
}
// 获取首页配置
export const getHotSpellBanner = data => {
  return request({
    url: '/Setting/homePinSet',
    data,
    method: 'POST'
  })
}
// 获取热拼商品
export const getHotSpellGoods = data => {
  return request({
    url: '/interest.Goods/getList',
    data,
    method: 'POST'
  })
}
// 获取热拼商品
export const getPointGoods = data => {
  return request({
    url: '/Goods/lists',
    data,
    method: 'POST'
  })
}

export const wxShare = data => {
  return request({
    url: '/share/share_s',
    data,
    method: 'POST'
  })
}


