import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://shop.98chihuo.com/api'

})


// 配置请求头信息
request.interceptors.request.use(config => {
  store.commit('showLoading')
  return config
}, err => {
  store.commit('hideLoading')
  return Promise.reject(err)
})

// axios设置响应拦截器
request.interceptors.response.use(response => {
  store.commit('hideLoading')
  return response.data // 拦截处理响应结果，直接返回需要的数据
})

export default request
