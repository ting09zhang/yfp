import request from '@/utils/request'

// 获取积分商品详情

export const getPointGoodsDetails = data => {
  return request({
    url: '/Goods/detail',
    data,
    method: 'POST'
  })
}

// 获取首页限时热拼区分类下商品列表 顶部商品
  export const getHotSpellTop = data => {
    return request({
      url: '/interest.Goods/getList',
      data,
      method: 'POST'
    })
}
  
export const getCantuanGoodsDetails = data => {
  return request({
    url: 'interest.Goods/detail',
    data,
    method: 'POST'
  })
}