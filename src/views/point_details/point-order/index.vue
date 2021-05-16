<template>
  <div>
    <navbarF :title="'积分订单'"></navbarF>
    <van-cell class="adress" @click="$router.push('/adressList')">
      <template #title>
        <div class="left-flex">
          <van-icon name="location-o" color="#ffa727" size="24" />
          <div class="flex-right">
            <div>
              {{ adressList.name }} <span> {{ adressList.phone }}</span>
            </div>
            <p>{{ adressList.address }}</p>
          </div>
        </div>
      </template>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="arrow" class="search-icon" size="24" />
      </template>
    </van-cell>
    <van-card class="good" :price="detailList.goods_price" :title="detailList.goods_name"
      :thumb="detailList.goods_image">
      <template #footer>
        <van-button size="mini" @click="sub">-</van-button>
        <van-button>{{ num }}</van-button>
        <van-button size="mini" @click="add">+</van-button>
      </template>
    </van-card>

    <div class="card-order">
      <div class="card-flex">
        <div>商品总额</div>
        <p>
          ￥{{ detailList.goods_price }}+{{ detailList.selling_integral }}积分
        </p>
      </div>
      <div class="card-flex">
        <div>邮费</div>
        <p>包邮</p>
      </div>
    </div>
    <van-popup safe-area-inset-bottom v-model="popShow" round @closed="pay" position="bottom"
      :style="{ height: '150px' }">
      <div class="pop-title">确定要兑换吗?</div>
      <div class="pop-btn">
        <button class="cancel" @click="popShow = false">取消</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </van-popup>

    <van-popup safe-area-inset-bottom v-model="payShowPop" round position="bottom" :style="{ height: '30%' }">
      <div class="pay_target">
        选择支付方式
      </div>
      <div class="wx" @click="payWx">微信支付</div>
      <div class="ye" @click="payYe">余额支付</div>
    </van-popup>

    <div class="footer">
      <div class="priceTotal">
        <p class="pl">合计</p>
        <div class="div">
          ￥{{ detailList.goods_price*num }}+{{ detailList.selling_integral*num }}积分
        </div>
      </div>
      <div class="btn-qd" @click="submitOrder">确定兑换</div>
    </div>
  </div>
</template>

<script>
  import navbarF from '@/components/navbar_f'
  import {
    getAdressList
  } from '@/api/address.js'
  import {
    mapGetters
  } from 'vuex'
  import {
    payPoint
  } from '@/api/pay.js'
  export default {
    name: '',
    components: {
      navbarF
    },
    data() {
      return {
        adressList: {},
        detailList: {},
        num: 1,
        popShow: false,
        success: false,
        payShowPop: false
      }
    },
    methods: {
      sub() {
        if (this.num < 1) {
          return
        } else {
          this.num--
        }
      },
      add() {
        if (this.num > this.detailList.stock) {
          this.$toast('商品库存有限喔')
          return
        } else {
          this.num++
        }
      },
      onClickLeft() {
        this.$router.back()
      },
      submitOrder() {
        if (!this.adress) {
          this.$toast('请选择收货地址!')
          return
        }
        this.popShow = true
      },
      getAdressLists() {
        getAdressList({
          token: this.token
        }).then(res => {
          res.data.list.forEach(item => {
            item.addressDetail = item.detail
            item.tel = item.phone
            item.address =
              item.region.province + item.region.city + item.region.region
            item.id = item.address_id
            if (item.address_id == this.chosenAddressId) {
              item.isDefault = true
            }
          })
          this.adress = res.data.list
          this.defaultId = res.data.default_id
          this.adress.forEach(item => {
            if (this.defaultId == item.address_id) {
              this.adressList = item
            }
          })
        })
      },
      confirm() {
        this.popShow = false
        this.success = true
      },
      pay() {
        if (this.success) {
          this.payShowPop = true
        }
      },
      payYe() {
        this.payShowPop = false
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '支付中'
        })
        console.log(this.num)
        payPoint({
          token: this.token,
          goods_id: this.detailList.goods_id,
          goods_num: this.num.toString(),
          goods_sku_id: this.detailList.goods_sku,
          pay_type: '10'
        }).then(res => {
          if (res.code == 1) {
            this.$toast.clear()
            this.$toast.success('支付成功!')
            this.$router.push('/stockss?id=5')
          } else {
            this.$toast.fail(res.msg)
          }
        })
      },
      payWx() {
        this.payShowPop = false
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '支付中'
        })
        payPoint({
          token: this.token,
          goods_id: this.detailList.goods_id,
          goods_num: this.num.toString(),
          goods_sku_id: this.detailList.goods_sku,
          pay_type: '20'
        }).then(res => {
          console.log(res);
          if (res.code == 1) {
            this.$toast.clear()
            const pay_params = {
              "appId": res.data.payment.appid,
              "timeStamp": res.data.payment.timeStamp,
              "nonceStr": res.data.payment.nonceStr,
              "package": 'prepay_id=' + res.data.payment.prepay_id,
              "signType": "MD5", //微信签名方式： 
              "paySign": res.data.payment.paySign,
            }
  console.log(JSON.stringify(pay_params));
            if (typeof WeixinJSBridge === 'undefined') {
               this.$toast.fail('当前环境不支持微信支付,请前往微信浏览器下操作!')
              if (document.addEventListener) {
                document.addEventListener(
                  'WeixinJSBridgeReady',
                  this.onBridgeReady,
                  false
                )
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
              }
            } else {
              
              // console.log(JSON.stringify(wx))
              this.onBridgeReady(pay_params)
            }
          } else {
            this.$toast.fail(res.msg)
          }
        })
      },
      onBridgeReady(params) {
           
        var that = this
        WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            that.$toast.success('支付成功！')
            // that.$router.push({ path: '/order' })
          } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
            that.$toast.fail('支付失败！') 
          }
        })
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    created() {
      this.detailList = this.$route.query
      console.log(this.detailList);
      this.getAdressLists()
    }
  }

</script>
<style lang="less" scoped>
  .pay_target {
    width: 750px;
    height: 105px;
    background: #dcdcdc;
    border-radius: 20px 20px 0px 0px;
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #3f3f3f;
    text-align: center;
    line-height: 105px;
  }

  .wx {
    border-bottom: 1px solid #979797;
  }

  .wx,
  .ye {
    width: 750px;
    height: 105px;
    line-height: 105px;
    text-align: center;
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #3f3f3f;
  }

  .pop-title {
    width: 750px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-weight: 550;
    font-size: 32px;
  }

  .pop-btn {
    width: 750px;
    height: 98px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
      width: 336px;
      height: 80px;
      border-radius: 40px;
      font-size: 32px;
      font-weight: 600;
    }

    .confirm {
      background: #ffbb40;
      border: none;
      color: #fff;
    }

    .cancel {
      opacity: 0.65;
      border: 1px solid #ffa727;
      color: #ffa727;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 98px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn-qd {
      width: 300px;
      height: 60px;
      background: #ffbb40;
      border-radius: 40px;
      line-height: 60px;
      text-align: center;
      color: #fff;
      font-size: 28px;
      margin-right: 20px;
    }

    .priceTotal {
      margin-right: 20px;

      .pl {
        color: #ff0000;
        text-align: right;
      }

      .pl,
      .div {
        font-size: 22px;
        line-height: 28px;
      }
    }
  }

  .van-button {
    width: 40px;
    height: 35px;
  }

  /deep/ .van-button--mini {
    width: 40px;
    height: 35px;
  }

  .adress {
    width: 702px;
    display: flex;
    border-radius: 12px;
    align-items: center;
    margin: 20px auto;
  }

  .left-flex {
    display: flex;
    align-items: center;

    .flex-right {
      margin-left: 12px;

      div {
        font-size: 32px;
        font-weight: 500;
        color: #000000;

        span {
          font-size: 28px;
          font-weight: 500;
          color: #999999;
          line-height: 28px;
        }
      }

      p {
        font-size: 24px;
        font-weight: 500;
        color: #666666;
      }
    }
  }

  .good {
    width: 702px;
    border-radius: 12px;
    background: #fff;
    margin: 0 auto;

    .van-card__title {
      height: 28px;
      font-size: 30px;
      font-weight: 600;
      color: #2d2f33;
      line-height: 28px;
    }

    .van-card__desc {
      color: #999;
    }

    .van-card__price,
    .van-card__price-integer {
      height: 36px;
      font-size: 36px;
      font-weight: 500;
      color: #fe4343;
      line-height: 36px;
    }
  }

  .card-order {
    width: 702px;
    height: 180px;
    background: #ffffff;
    border-radius: 12px;
    margin: 20px auto;
    padding: 30px 0;

    .card-flex {
      width: 662px;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 35px 20px;

      &:nth-child(1) {
        margin-top: 10px;
      }

      div {
        font-size: 24px;
        font-weight: 500;
        color: #999999;
      }

      p {
        font-size: 24px;
        font-weight: 500;
        color: #000000;
      }
    }
  }

</style>
