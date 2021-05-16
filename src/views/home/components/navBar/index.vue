<template>
  <div class="cards">
    <div class="navs">
      <div
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
        @click="go(item.title)"
      >
        <img :src="item.url" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    navList: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    go(data) {
      if (!this.token) {
        this.$toast('请先登录!')
       window.open('http://shop.98chihuo.com/getcode.php')
      } else {
        switch (data) {
          case '积分商城':
            this.$router.push('/point-shop')
            break
          case '分值兑换':
            this.$router.push('/credit_exchange')
            break
          case '申请代理':
            this.$toast('敬请期待')
            break
          case '申请团长':
            this.$router.push('/ToApplyFor')
            break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cards {
  width: 704px;
  height: 194px;
  background: #ffffff;
  border-radius: 16px;
  margin: 15px auto;
  overflow: hidden;
}

// overflow-anchor: auto; // 解决安卓兼容性
.navs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: first baseline;
  align-items: center;
}

.nav-item {
  width: 175.5px;
  height: 134px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  img {
    width: 91px;
    height: 90px;
  }

  span {
    padding-top: 15px;
    color: #666;
    line-height: 28px;
    font-size: 24px;
  }
}
</style>
