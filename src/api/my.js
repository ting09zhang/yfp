// 获取我的
import request from '@/utils/request'
// 兑换记录
export const getrecords = data => {
        return request({
            url: '/user.order/exchangerecord',
            method: 'post',
            data
        })
    }
    // 互转搜索
export const getbetween = data => {
        return request({
            url: '/User.Wallet/transferuser',
            method: 'post',
            data
        })
    }
    //期团明细
export const getFinelysser = data => {
        return request({
            url: '/user/grouplog',
            method: 'post',
            data
        })
    }
    //积分明细
export const getPointlog = data => {
        return request({
            url: '/user/pointslog',
            method: 'post',
            data
        })
    }
    //分值明细
export const getScorelog = data => {
    return request({
        url: '/user/scorelog',
        method: 'post',
        data
    })
}

//数字资产明细
export const getAsset = data => {
        return request({
            url: '/interest.Goods/goodsgroup',
            method: 'post',
            data
        })
    }
    // 我的拼团拼团订单列表
export const getbooking = data => {
        return request({
            url: '/interest.Order/lists',
            method: 'post',
            data
        })
    }
    //直属，非直属，今日新增会员列表
export const getmembers = data => {
    return request({
        url: '/user/teamList',
        method: 'post',
        data
    })
}
export const getnumbertab = data => {
        return request({
            url: '/user/teamcount',
            method: 'post',
            data
        })
    }
    // 参团详情

export const getTuxedodetails = data => {
    return request({
        url: '/interest.Active/detail',
        method: 'post',
        data
    })
}