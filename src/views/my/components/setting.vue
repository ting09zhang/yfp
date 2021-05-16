<template>
  <div>
    <navbar-f :title="'设置'"></navbar-f>
    <van-cell is-link class="cell" @click="$router.push('/personInfo')">
      <template #title>
        <div class="flex">
          <img :src="userInfo.avatarUrl" alt="" />
          <div class="info">
            <div>{{ userInfo.nickName }}</div>
            <p>{{ userInfo.phone }}</p>
          </div>
        </div>
      </template>
    </van-cell>

    <van-cell class="cell">
      <template #title>
        <div class="center">
          切换账户
        </div>
      </template>
    </van-cell>

    <van-cell class="cell" @click="logout">
      <template #title>
        <div class="center">
          退出登录
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import navbarF from '@/components/navbar_f'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    navbarF
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '是否确定退出登录'
        })
        .then(() => {
          const flag = this.$store.dispatch('user/logout')
      if (flag) {
        this.$router.push('/my')
          this.$toast('退出成功')

      }
        })
        .catch(() => {
          this.$toast('取消退出')
        })
     
    }
  }
}
</script>
<style lang="less" scoped>
.cell {
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.center {
  text-align: center;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 550;
  color: #000000;
  line-height: 40px;
}
.flex {
  height: 100px;
  display: flex;
  align-items: space-between;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
      font-size: 32px;
      font-weight: 500;
      color: #000000;
      line-height: 28px;
    }
    p {
      font-size: 28px;
      font-weight: 500;
      color: #ccc;
      line-height: 28px;
    }
  }
}
</style>
