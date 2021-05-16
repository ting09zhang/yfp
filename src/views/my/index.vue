<template>
  <div class="content">
    <!-- 背景 -->
    <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div>
    <!-- 内容 -->
    <div class="box">
      <div class="profile">
        <img class="img" :src="userInfo.avatarUrl" />
        <div class="user" v-if="userInfo.nickName">
          <p>{{ userInfo.nickName }}</p>
          <div>
            <span v-if="userInfo.group_id == 0">非团长</span>
            <span v-if="userInfo.group_id == 4">一级团长</span>
            <span v-if="userInfo.group_id == 5">二级团长</span>
            <span v-if="userInfo.if_partner == '1'">代理</span>
          </div>
        </div>
        <div class="text-login-or-register" @click="toLogin" v-if="!userInfo.nickName">
          点击登录/注册
        </div>
      </div>
      <!-- 资产宫格 -->
      <van-grid class="asset" :column-num="5" :border="false">
        <van-grid-item @click="goBalance">
          <div class="asset-num">{{ !userInfo.balance?'0':userInfo.balance }}</div>
          <div class="asset-text">余额</div>
        </van-grid-item>
        <van-grid-item @click="goPoint">
          <div class="asset-num">{{ !userInfo.score?'0':userInfo.score }}</div>
          <div class="asset-text">分值</div>
        </van-grid-item>
        <van-grid-item @click="goQigroup">
          <div class="asset-num">{{ !userInfo.qigroup?'0':userInfo.qigroup }}</div>
          <div class="asset-text">期团值</div>
        </van-grid-item>
        <van-grid-item @click="goScore">
          <div class="asset-num">{{ !userInfo.points?'0':userInfo.points }}</div>
          <div class="asset-text">积分</div>
        </van-grid-item>
        <van-grid-item @click="asset">
          <div class="asset-num">{{ !userInfo.digitalasset?'0':userInfo.digitalasset }}</div>
          <div class="asset-text">数字资产</div>
        </van-grid-item>
      </van-grid>

      <!-- 拼团宫格 -->
      <van-grid class="group" :column-num="3" :border="false">
        <van-grid-item icon="gift-card" text="我的拼团" @click="goMycantuan" />
        <van-grid-item icon="point-gift" text="我的兑换" @click="goExchange" />
        <van-grid-item icon="friends" text="我的团队" @click="goMyteam" />
      </van-grid>

      <!-- 我的订单宫格 -->
      <div class="my-indent">
        <div class="indent-text">我的订单</div>
        <van-grid class="my-indent-grid" :column-num="5" :border="false">
          <van-grid-item icon="card" text="待付款" @click="goDfk" />
          <van-grid-item icon="send-gift" text="待发货" @click="goDfh" />
          <van-grid-item icon="gift" text="待收货" @click="goDsh" />
          <van-grid-item icon="bill" text="已完成" @click="goYwc" />
          <van-grid-item icon="column" text="全部订单" @click="goAll" />
        </van-grid>
      </div>

      <!-- 设置单元格 -->
      <div class="setting">
        <van-cell title="提现" icon="pending-payment" is-link @click="goDeposit" />
        <van-cell title="合伙人收益" icon="friends-o" is-link @click="goTeam" />
        <!-- <van-cell title="商家入驻" icon="wap-home-o" is-link /> -->
        <!-- <van-cell title="分值记录" icon="gold-coin-o" is-link @click="goFzjl" /> -->
        <van-cell title="期团明细" icon="gold-coin-o" is-link @click="goQtmx" />
        <van-cell title="推广码" icon="qr" is-link @click="goTgm" />
        <van-cell title="修改地址" icon="location-o" is-link @click="goXgdz" />
        <!-- <van-cell title="修改密码" icon="lock" is-link /> -->
        <!-- <van-cell title="客服中心" icon="service-o" is-link /> -->
        <van-cell title="协议说明" icon="description" is-link @click="$router.push('/agreement')" />
        <van-cell title="设置" icon="setting-o" is-link @click="goSetting" />
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import minxin from '@/minxin/minxin'
  export default {
    name: '',
    mixins: [minxin],
    components: {},
    props: {},
    data() {
      return {

      }
    },
    created() {
      this.getUserInfos()
      if (this.$route.query.yqcode) {
        window.localStorage.setItem('yqcode')
      }
    },

    mounted() {},
    computed: {},
    watch: {},
    methods: {
      toLogin() {
        // this.$router.push({ path: '/login'})
         window.open('http://shop.98chihuo.com/getcode.php')
      },
      goDeposit() {
        if (this.token) {
          this.$router.push({
            path: '/deposit',
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goTeam() {
        if (this.userInfo.if_partner == '0') {
          return this.$toast('请先升级为合伙人')
        } else {
          if (this.token) {
            this.$router.push('/team')
          } else {
            window.open('http://shop.98chihuo.com/getcode.php')
            this.$toast('请先登录!')
          }
        }
      },
      goBalance() {
        if (this.token) {
          this.$router.push({
            path: '/balances',
            query: {
              id: '1'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goPoint() {
        if (this.token) {
          this.$router.push({
            path: '/particulars',
            query: {
              id: '1'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goQigroup() {
        if (this.token) {
          this.$router.push({
            path: '/finelysser',
            query: {
              id: '2'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goScore() {
        if (this.token) {
          this.$router.push({
            path: '/pointslog',
            query: {
              id: '3'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      asset() {
        if (this.token) {
          this.$toast('敬请期待')
        } else {
          this.$toast('请先登录!')
        }
      },
      goMycantuan() {
        if (this.token) {
          this.$router.push('/Spell_group')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goExchange() {
        if (this.token) {
          this.$router.push('/exchangesss')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goMyteam() {
        if (this.token) {
          this.$router.push('/teams')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录')
        }
      },
      goDfk() {
        if (this.token) {
          this.$router.push({
            path: '/stockss',
            query: {
              id: '1'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goDfh() {
        if (this.token) {
          this.$router.push({
            path: '/stockss',
            query: {
              id: '2'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goDsh() {
        if (this.token) {
          this.$router.push({
            path: '/stockss',
            query: {
              id: '3'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goYwc() {
        if (this.token) {
          this.$router.push({
            path: '/stockss',
            query: {
              id: '4'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goAll() {
        if (this.token) {
          this.$router.push({
            path: '/stockss',
            query: {
              id: '5'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goSetting() {
        if (this.token) {
          this.$router.push('/setting')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goFzjl() {
        if (this.token) {
          this.$router.push({
            path: '/particulars',
            query: {
              id: '1'
            }
          })
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goQtmx() {
        this.$toast('未开放!')
        return;
        if (this.token) {
          this.$router.push('/finelysser')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goTgm() {
        if (this.token) {
          this.$router.push('/qrcode')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      },
      goXgdz() {
        if (this.token) {
          this.$router.push('/adressList')
        } else {
          window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    }
  }

</script>
<style scoped lang="less">
  .bgBox {
    width: 100%;
    height: 700px;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    z-index: 1;

    .bgTop {
      width: 100%;
      height: 325px;
      background: linear-gradient(180deg, #fea568 0%, #fd6117 100%);
    }

    .bgBom {
      width: 100%;
      height: 100px;
      background-color: #fd6117;
      border-radius: 0 0 50% 50%;
      border-top: none;
    }
  }

  .box {
    // position: fixed;
    // z-index: 2;
    // top: 0;
    // left: 0;
    width: 100vw;
    height: 100%;
    background-color: #F2F3F5;

    // 头像栏
    .profile {
      position: relative;
      margin-top: 70px;
      display: flex;
      align-items: center;
      z-index: 9;

      // 头像
      .img {
        width: 90px;
        height: 90px;
        margin-left: 24px;
        margin-right: 20px;
        border-radius: 50%;
      }

      // 点击登录/注册
      .text-login-or-register {
        font-size: 36px;
        font-weight: 700;
        color: #fff;
      }

      .user {
        p {
          margin-bottom: 5px;
          height: 44px;
          font-size: 36px;
          font-weight: 550;
          color: #ffffff;
          line-height: 44px;
        }

        span {
          margin-right: 10px;
          height: 44px;
          font-size: 24px;
          font-weight: 550;
          color: #ffffff;
          line-height: 44px;
        }
      }
    }

    // 资产
    .asset {
      position: relative;
      height: 132px;
      width: 720px;
      margin: 0 auto;
      margin-top: 80px;
      margin-bottom: 20px;
      border-radius: 20px;
      z-index: 9;
      overflow: hidden;

      .asset-num {
        font-size: 28px;
        font-weight: 700;
      }

      .asset-text {
        color: #999;
        font-size: 22px;
        font-weight: 700;
      }
    }

    // 拼团宫格
    .group {
      position: relative;
      width: 700px;
      height: 150px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      border-radius: 20px;
      overflow: hidden;
      z-index: 9;

      /deep/ .van-icon {
        color: #ffb82a;
      }
    }

    .my-indent {
      width: 700px;
      height: 220px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      border-radius: 20px;
      background-color: #fff;
      overflow: hidden;

      .indent-text {
        margin-top: 32px;
        margin-left: 24px;
        font-size: 32px;
        font-weight: 600;
      }

      /deep/ .van-icon {
        color: #ffb82a;
      }
    }

    .setting {
      width: 700px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      border-radius: 20px;
      background-color: #fff;
      overflow: hidden;

      /deep/ .van-icon {
        color: #ffb82a;
        margin-right: 16px;
      }
    }
  }

  .van-grid {
    flex-wrap: nowrap;
  }

</style>
