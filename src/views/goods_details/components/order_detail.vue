<template>
  <div>
    <van-nav-bar title="确定订单" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell title="商品名称" :value="goods_name" />
      <van-cell title="订单金额" :value="interest_price" class="ddje" />
    </van-cell-group>
    <van-cell-group>
      <van-cell
        :title="item.title"
        clickable
        v-for="(item, index) in cellList"
        @click="handlePay(index)"
        :key="index"
        class="pay"
      >
        <template #icon>
          <van-icon :name="item.icon" :color="item.color" class="icons" />
        </template>
        <template #right-icon>
          <van-icon name="success" class="success" v-if="item.flag" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { payOther, payLevel, numberquery } from '@/api/pay.js'
import { mapGetters } from 'vuex'
import minxin from '@/minxin/minxin'
export default {
  name: '',
  mixins: [minxin],
  data() {
    return {
      cellList: [
        {
          title: '微信支付',
          icon: 'wechat',
          flag: false,
          color: '#14d71d'
        },
        {
          title: '余额支付',
          icon: 'gold-coin',
          flag: false,
          color: '#ffc752'
        }
        // { title: '支付宝支付', icon: 'alipay', flag: false, color: '#1296db' }
      ],
      goods_id: '',
      goods_sku_id: '',
      goods_name: '',
      interest_price: '',
      active_id: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onBridgeReady(params) {
      var that = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', params, function(res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          that.$toast.success('支付成功！')
          if (that.$route.query.type == 'level') {
            that.$router.push('/my')
          } else {
            if (that.active_id) {
              that.$router.push({
                path: '/detailss',
                query: {
                  id: that.active_id
                }
              })
            } else {
              that.$router.push('/Spell_group')
            }
          }
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          that.$toast.fail('支付失败！')
        }
      })
    },

    handlePay(index) {
      var _this = this
      this.cellList.forEach(item => {
        item.flag = false
      })
      this.cellList[index].flag = true
      // 团长开通
      if (_this.$route.query.type == 'level') {
        var payT = ''
        if (index == 1) {
          payT = 10
        } else {
          payT = 20
        }
        this.$dialog
          .confirm({
            title: '提示',
            message: '确定开通团长'
          })
          .then(() => {
            payLevel({
              token: _this.token,
              goods_id: _this.goods_id,
              pay_type: payT,
              goods_num: 1
            }).then(res => {
              if (res.code == 1) {
                if (payT == 10) {
                  _this.$toast.success('余额支付成功')
                  _this.getUserInfos()
                  _this.$router.push('/my')
                  done()
                } else {
                  const pay_params = {
                    appId: res.data.payment.appid,
                    timeStamp: res.data.payment.timeStamp,
                    nonceStr: res.data.payment.nonceStr,
                    package: 'prepay_id=' + res.data.payment.prepay_id,
                    signType: 'MD5', //微信签名方式：
                    paySign: res.data.payment.paySign
                  }

                  if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                      document.addEventListener(
                        'WeixinJSBridgeReady',
                        this.onBridgeReady,
                        false
                      )
                    } else if (document.attachEvent) {
                      document.attachEvent(
                        'WeixinJSBridgeReady',
                        this.onBridgeReady
                      )
                      document.attachEvent(
                        'onWeixinJSBridgeReady',
                        this.onBridgeReady
                      )
                    }
                  } else {
                    // this.$toast.fail(
                    //   '当前环境不支持微信支付,请前往微信浏览器下操作!'
                    // )
                    this.onBridgeReady(pay_params)
                  }
                }
              } else {
                _this.$toast.fail(res.msg)
                done()
              }
            })
          })
      } else {
        // 普通提交订单
        if (index == 1) {
          this.$dialog.confirm({
            title: '订单支付',
            message: '是否使用余额支付订单',
            beforeClose
          })
        } else {
          payOther({
            token: this.token,
            goods_id: this.goods_id,
            goods_sku_id: this.goods_sku_id,
            pay_type: '20',
            goods_num: this.goods_num,
            active_id: this.active_id
          })
            .then(res => {
              if (res.code == 1) {
                const pay_params = {
                  appId: res.data.payment.appid,
                  timeStamp: res.data.payment.timeStamp,
                  nonceStr: res.data.payment.nonceStr,
                  package: 'prepay_id=' + res.data.payment.prepay_id,
                  signType: 'MD5', //微信签名方式：
                  paySign: res.data.payment.paySign
                }

                if (typeof WeixinJSBridge === 'undefined') {
                  if (document.addEventListener) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      this.onBridgeReady,
                      false
                    )
                  } else if (document.attachEvent) {
                    document.attachEvent(
                      'WeixinJSBridgeReady',
                      this.onBridgeReady
                    )
                    document.attachEvent(
                      'onWeixinJSBridgeReady',
                      this.onBridgeReady
                    )
                  }
                } else {
                  // this.$toast.fail(
                  //   '当前环境不支持微信支付,请前往微信浏览器下操作!'
                  // )
                  this.onBridgeReady(pay_params)
                }
              } else {
                this.$toast.fail(res.msg)
              }
            })
            .catch(err => err)
        }

        function beforeClose(action, done) {
          if (action === 'confirm') {
            payOther({
              token: _this.token,
              goods_id: _this.goods_id,
              goods_sku_id: _this.goods_sku_id,
              pay_type: '10',
              goods_num: _this.goods_num,
              active_id: _this.active_id
            }).then(res => {
              if (res.code == 1) {
                _this.$toast.success('支付成功')

                if (_this.active_id) {
                  _this.$router.push({
                    path: '/detailss',
                    query: {
                      id: _this.active_id
                    }
                  })
                } else {
                  _this.$router.push('/Spell_group')
                }

                done()
                _this.getUserInfos()
              } else {
                _this.$toast.fail(res.msg)
                done()
              }
            })
          } else {
            done()
          }
        }
      }
    }
  },
  created() {
    this.goods_sku_id = this.$route.query.goods_sku_id
    this.goods_id = this.$route.query.goods_id
    this.goods_name = this.$route.query.goods_name
    this.goods_num = this.$route.query.goods_num
    this.active_id = this.$route.query.active_id

    if (this.$route.query.type == 'level') {
      this.interest_price = Number(this.$route.query.interest_price)
    } else {
      if (this.$route.query.spec_price) {
        this.interest_price =
          this.$route.query.interest_price * this.$route.query.goods_num
      } else {
        this.interest_price =
          this.$route.query.interest_price * this.$route.query.goods_num
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>
<style lang="less" scoped>
.ddje {
  .van-cell__value {
    color: #fe4343;
  }
}

.success {
  color: #ffa727;
}

.van-cell {
  align-items: center;
}

.icons {
  margin-right: 5px;
}
</style>
