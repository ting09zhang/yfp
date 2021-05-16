<!--
 * @Descripttion:
 * @version:
 * @Author: 陈韦
 * @Date: 2021-04-21 17:36:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-22 02:27:02
-->
<template>
  <div class="nav">
    <router-view></router-view>
    <!-- 底部标签区域 -->
    <van-tabbar route v-model="active" :z-index="99" style="width:100vw">
    
      <van-tabbar-item
        :to="item.path"
        v-for="item in tabBarList"
        :key="item.path"
      >
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img :src="props.active ? item.iconactive : item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Loading from '@/components/loading'
import {mapGetters} from 'vuex'
export default {
  components:{
    Loading
  },
  computed:{
    ...mapGetters(['loading'])
  },
  data () {
    return {
      active: 0,
      tabBarList: [
        {
          icon: require('@/static/tab/home.png'),
          iconactive: require('@/static/tab/home-active.png'),
          text: '首页',
          path: '/home'
        },
        {
          icon: require('@/static/tab/fenlei.png'),
          iconactive: require('@/static/tab/fenlei-active.png'),
          text: '分类',
          path: '/list'
        },
        {
          icon: require('@/static/tab/guize.png'),
          iconactive: require('@/static/tab/guize-active.png'),
          text: '规则',
          path: '/rule'
        },
        {
          icon: require('@/static/tab/my.png'),
          iconactive: require('@/static/tab/my-active.png'),
          text: '我的',
          path: '/my'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.text {
  font-size: 24px;
}
.nav {
  padding-bottom: 100px;
}
</style>
