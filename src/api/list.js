import request from '@/utils/request'

// 分类列表
export const getclassify = data => {
  return request({
    url: '/category/list',
    method: 'post',
    data
  })
}
// 分类内容
export const getListthecontent = data => {
  return request({
    url: '/goods/lists',
    method: 'post',
    data
  })
}
