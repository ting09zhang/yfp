import request from '@/utils/request'
// 获取订单列表数据数据
export const getOrderList = data => {
    return request({
        url: 'user.order/lists',
        method: 'post',
        data
    })
}

// 取消订单
export const cancelOrderList = data => {
    return request({
        url: 'user.order/cancel',
        method: 'post',
        data
    })
}

// 完成订单

export const successOrderList = data => {
    return request({
        url: 'user.order/receipt',
        method: 'post',
        data
    })
}

// 获取明细
export const getPointDetails = data => {
    return request({
        url: 'user/grouplog',
        method: 'post',
        data
    })
}