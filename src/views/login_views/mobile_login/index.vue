<!--
 * @Author: your name
 * @Date: 2021-04-24 10:18:37
 * @LastEditTime: 2021-04-24 15:42:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\views\login_views\mobile_login\index.vue
-->
<template>
  <div class="content">
    <nav-bar-f title="登录"></nav-bar-f>
    <van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    <div class="mobile_num">1776*****888</div>
    <van-button
      color="#f6bd59"
      block
      round
      to="mobile_login_other"
      @click="login"
      >本机号码一键登录</van-button
    >
    <div class="mobile_num_other" @click="toOther">其他号码登录</div>
    <div class="rule">
      登录即代表同意<span @click="toRule">《悦富拼账号服务与协议》</span>
    </div>
  </div>
</template>
<script>
import navBarF from '@/components/navbar_f'
export default {
  name: '',
  components: { navBarF },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    toRule() {
      this.$router.push('rule')
    },
    toOther() {
      this.$router.push('other')
    },
    login() {
      // var that = this
      // try {
      //   wx.login({
      //     success(res) {
      //       alert(res)
      //       console.log(res)
      //       var code = res.code 
      //       wx.request({
      //         url: 'http://localhost/index/users/code2seesion',
      //         method: 'post',
      //         data: {
      //           code,
      //         },
      //         success: function (res) {
      //           console.log(res.data.openid)
      //           that.setData(res.data)
      //         },
      //       })
      //     },
      //   })
      // } catch (error) {
      //   alert(error)
      // }
    },
  },
}
</script>
<style scoped lang="less">
.content {
  background-color: #fff;
  height: 100vh;
  .van-nav-bar {
    margin-bottom: 114px;
    /deep/ .van-nav-bar__title {
      line-height: 46px;
      font-size: 40px;
      font-weight: 700;
    }
    /deep/ .van-icon-arrow-left {
      color: #7a7a7a;
    }
  }
  .van-image {
    display: block;
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  .mobile_num {
    width: 208px;
    height: 28px;
    font-size: 32px;
    font-weight: 700;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 124px;
  }
  .van-button {
    width: 610px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
  }
  .mobile_num_other {
    color: #ffa727;
    font-size: 26px;
    margin-left: 524px;
    margin-bottom: 580px;
    height: 38px;
    line-height: 38px;
  }
  .rule {
    position: fixed;
    width: 480px;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    color: #999;
    font-size: 22px;
    span {
      color: #ffd484;
    }
  }
}
</style>
