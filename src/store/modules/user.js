import { login } from '@/api/login'
import { getItem, setItem, removeItem } from '@/utils/storage'

export default {
    namespaced: true,
    state: {
        // 用户登录token
        TokenKey: getItem('token') || '',
        // 用户基本资料
        userInfo: getItem('userInfo') || {}
    },
    mutations: {
        // 登录存储token
        userToken(state, token) {
            setItem('token', token)

            state.TokenKey = token
        },
        // 退出登录清除token
        logoutToken(state) {
            removeItem('token')
            state.TokenKey = null
        },
        // 获取用户信息
        getUserInfo(state, info) {
            state.userInfo = info
            setItem('userInfo', info)
        },
        // 清除用户信息
        removeUserInfo(state) {
            state.userInfo = {}
            removeItem('userInfo')
        }
    },
    actions: {
        // 登录
        async _login({ commit }, data) {
            await login(data).then(res => {
                if (res.code == 1) {
                    commit('userToken', res.data.token)
                    commit('getUserInfo', res.data.res)
                    return true
                } else {
                    return false
                }
            })
        },
        // 退出
        logout({ commit }) {
            // 清除用户token
            commit('logoutToken')
                // 清除用户信息
            commit('removeUserInfo')

            return true
        }
    }
}