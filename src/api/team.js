import request from '@/utils/request'

// 获取本周收益
export const getWeek = data => {
  return request({
    url: '/user/partner_week',
    method: 'post',
    data
  })
}

export const getMonth = data => {
  return request({
    url: '/user/partner_month',
    method: 'post',
    data
  })
}
  // 根据年获取月收入
export const getMonthByYear = data => {
  return request({
    url: '/user/partner_yeartj',
    method: 'post',
    data
  })
}

  // 根据根据月获取周收入
export const getWeekByMonth = data => {
  return request({
    url: '/user/partner_month_week',
    method: 'post',
    data
  })
}