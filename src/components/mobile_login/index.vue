<!--
 * @Author: your name
 * @Date: 2021-04-24 14:26:20
 * @LastEditTime: 2021-04-24 15:19:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\components\mobile_login\index.vue
-->
<template>
  <div class="from">
    <van-form>
      <van-field v-model="username" name="用户名" :placeholder="placeholderOne"
        :rules="[{ required: true, message: '请填手机号' }]" />
      <van-field v-model="password" type="password" name="密码" :placeholder="placeholderTwo"
        :rules="[{ required: true, message: '请填写验证码' }]" />

      <van-button class="yzm" plain native-type="button" @click.prevent="sendYzm"><span v-if="!isCount">获取验证码</span>
        <van-count-down :time="60 * 1000" format="ss" v-if="isCount" @finish="isCount = false" />
      </van-button>

      <div class="sub">
        <van-button round block type="info" native-type="submit" color="#f6bd59" @click.prevent="login_sub">
          {{ buttext }}</van-button>
      </div>
      <div class="rule">
        登录即代表同意<span @click="toRule">《悦富拼账号服务与协议》</span>
      </div>
    </van-form>
  </div>
</template>
<script>
  import {
    getYzm
  } from '@/api/login'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    components: {},
    props: {
      placeholderOne: {
        type: String,
        default: '请输入手机号码'
      },
      placeholderTwo: {
        type: String,
        default: '请输入短信验证码'
      },
      buttext: {
        type: String,
        default: '登录'
      }
    },
    data() {
      return {
        username: '',
        password: '',
        isCount: false
      }
    },
    created() {
      console.log(window.location.href.indexOf("yqcode"));
    },
    mounted() {},
    computed: {
      ...mapGetters(['token'])
    },
    watch: {},
    methods: {
      onSubmit(values) {
        console.log('submit', values)
      },
      toRule() {
        this.$router.push('rule')
      },
      sendYzm() {
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!reg.test(this.username)) {
          this.$toast('手机号输入错误')
          this.username = ''
          return
        } else {
          this.isCount = true
          getYzm({
              phone: this.username
            })
            .then(res => {})
            .catch(err => {
              this.$toast(res.msg)
              this.isCount = false
            })
        }
      },
      login_sub() {

        if (this.username.length !== 11 && this.password.length !== 4) {
          this.$toast('请输入完整信息')
          return
        }
        let yqcode
        var url = window.location.href
        var i = url.lastIndexOf("=");
        if (url.substring((i - 6), i) == "yqcode") {
          yqcode = url.substring(i + 1)
        }
        let code = getQueryVariable("code");
        console.log(yqcode);
        console.log(code);

        var _this = this;
        
        this.$store.dispatch('user/_login', {
            phone: this.username,
            smscode: this.password,
            yqcode,
            code
          })
          .then(res => {
            console.log(res);
            this.$router.push('/home')
          }).catch((error) => {
            console.log(error);
          });
      },

    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    console.log(query);
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      console.log(pair[0]);
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (123);
  }

</script>
<style scoped lang="less">
  .from {
    margin-top: 100px;
    position: relative;

    .van-cell {
      width: 610px;
      height: 128px;
      margin-left: auto;
      margin-right: auto;
      line-height: 130px;
    }

    .yzm {
      width: 240px;
      height: 66px;
      border-radius: 15px;
      overflow: hidden;
      position: absolute;
      top: 160px;
      right: 100px;
    }

    .sub {
      margin-top: 88px;
      margin-bottom: 50px;
      width: 610px;
      height: 80px;
      margin-left: auto;
      margin-right: auto;
    }

    .rule {
      // position: fixed;
      width: 480px;
      bottom: 120px;
      margin-right: auto;
      margin-left: auto;
      // left: 50%;
      // transform: translateX(-50%);
      color: #999;
      font-size: 22px;

      span {
        color: #ffd484;
      }
    }
  }

</style>
