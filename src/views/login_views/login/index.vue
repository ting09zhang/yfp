<!--
 * @Author: your name
 * @Date: 2021-04-24 09:28:13
 * @LastEditTime: 2021-04-24 13:27:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\views\login_views\login\index.vue
-->
<template>
  <div class="content">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false" />
    <div class="welcome">欢迎来到越富拼</div>
    <!-- <van-button
      class="wechat-login"
      color="#f6bd59"
      icon="wechat"
      icon-prefix="iconfont"
      block
      round
      to="wechat_login"
      >微信登录</van-button
    > -->
    <van-button
      color="#f6bd59"
      icon="mobile"
      icon-prefix="iconfont"
      block
      round
      @click="handler"
      >手机登录</van-button
    >
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},

  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    handler(){
      // this.$router.push({ path: '/mobile_login' })
       window.open('http://shop.98chihuo.com/getcode.php')
    }
  }
}
</script>
<style scoped lang="less">
.content {
  height: 100vh;
  background-color: #fff;
  .van-nav-bar {
    margin-bottom: 310px;
    /deep/ .van-icon-arrow-left {
      color: #7a7a7a;
    }
  }
  .welcome{
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 46px;
    font-weight: 700;
  }
  .wechat-login {
    margin-bottom: 70px;
  }
  .van-button {
    width: 500px;
    height: 88px;
    margin-left: auto;
    margin-right: auto;
    .iconfont {
      font-size: 48px;
      margin-right: 12px;
    }
  }
}




















</style>
