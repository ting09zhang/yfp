import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('@/views/list')
      },
      {
        path: '/rule',
        name: 'rule',
        component: () => import('@/views/rule')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/my/components/setting.vue')
      },
      {
        path: '/personInfo',
        name: 'setting',
        component: () => import('@/views/my/components/personInfo.vue')
      },
      {
        path: '/credit_exchange',
        name: 'credit_exchange',
        component: () => import('@/views/credit_exchange')
      }
    ]
  },
  {
    path: '/goods_details',
    name: 'goods_details',
    component: () => import('@/views/goods_details')
  },
  {
    path: '/point-shop',
    name: 'point-shop',
    component: () => import('@/views/point-shop')
  },

  {
    path: '/rp-more',
    name: 'rp-more',
    component: () => import('@/views/rp-more')
  },
  {
    path: '/cantuan_details',
    name: 'cantuan_details',
    component: () => import('@/views/goods_details/components/cantuan_details')
  },
  {
    path: '/point_details',
    name: 'point_details',
    component: () => import('@/views/point_details')
  },
  {
    path: '/hot_spell_area',
    name: 'hot_spell_area',
    component: () => import('@/views/hot_spell_area')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/goods_details/components/order')
  },
  {
    path: '/setAdress',
    name: 'setAdress',
    component: () => import('@/views/adressList/setAdress')
  },
  {
    path: '/adressList',
    name: 'adressList',
    component: () => import('@/views/adressList')
  },
  {
    path: '/order_detail',
    name: '/order_detail',
    component: () => import('@/views/goods_details/components/order_detail')
  },
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login_views/login')
  },
  // 微信登录
  {
    path: '/wechat_login',
    name: 'wechat_login',
    component: () => import('@/views/login_views/wechat_login')
  },
  // 手机登录
  {
    path: '/mobile_login',
    name: 'mobile_login',
    component: () => import('@/views/login_views/mobile_login')
  },
  // 其他手机号登录
  {
    path: '/other',
    name: 'other',
    component: () => import('@/views/login_views/other')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login_views/register')
  },
  {
    path: '/Spell_group',
    name: 'Spell_group',
    component: () => import('@/views/my/components/Spell_group')
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: () => import('@/views/my/components/deposit')
  },
  {
    path: '/stockss',
    name: 'stockss',
    component: () => import('@/views/my/stockss')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/my/teams')
  },
  {
    path: '/balances',
    name: 'balances',
    component: () => import('@/views/my/balances')
  },
  {
    path: '/ToApplyFor',
    name: 'ToApplyFor',
    component: () => import('@/views/ToApplyFor')
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/views/my/qrcode')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/team')
  },
  {
    path: '/point-order',
    name: 'point-order',
    component: () => import('@/views/point_details/point-order')
  },
  {
    path: '/group',
    name: 'group',
    component: () => import('@/views/group')
  },
  {
    path: '/ToApplyFor',
    name: 'ToApplyFor',
    component: () => import('@/views/ToApplyFor')
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/my/agreement')
  },
  {
    path: '/particulars',
    name: 'particulars',
    component: () => import('@/views/my/particulars')
  },
  {
    path: '/pointslog',
    name: 'pointslog',
    component: () => import('@/views/my/pointslog')
  },
  {
    path: '/asset',
    name: 'asset',
    component: () => import('@/views/my/asset')
  },
  {
    path: '/exchangesss',
    name: 'exchangesss',
    component: () => import('@/views/my/exchangesss')
  },
  {
    path: '/transferss',
    name: 'transferss',
    component: () => import('@/views/my/balances/transferss')
  },
  {
    path: '/jumptransferss',
    name: 'jumptransferss',
    component: () => import('@/views/my/balances/transferss/jumptransferss')
  },
  {
    path: '/finelysser',
    name: 'finelysser',
    component: () => import('@/views/my/finelysser')
  },
  {
    path: '/detailss',
    name: 'detailss',
    component: () => import('@/views/my/detailss')
  }
]

const router = new VueRouter({
  routes
})

export default router
