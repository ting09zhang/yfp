import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入rem适配工具
import 'amfe-flexible'
// 引入公共样式
import './styles/babel.less'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import navbarss from './components/ddlist'
// 全局注册vant组件库
Vue.use(Vant)
Vue.component('navbarss', navbarss)
// 全局注册vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
