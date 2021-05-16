import request from '@/utils/request'

// 获取验证码

export const getYzm = data => {
    return request({
        url: '/user/sendsms',
        data,
        method: 'post'
    })
}

// 登录
export const login = data => {
    return request({
        url: '/user/loginpwd',
        data,
        method: 'POST'
    })
}

// 获取用户信息
export const getUserInfo = data => {
    return request({
        url: '/User/detail',
        data,
        method: 'POST'
    })
}

// 获取用户信息2
export const getUserInfo2 = data => {
    return request({
        url: '/User/detail',
        data,
        method: 'POST'
    })
}