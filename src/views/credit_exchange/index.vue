<template>
  <div class="container">
    <van-nav-bar title="分值兑换区" left-arrow @click-left="onClickLeft" />
    <div class="item">
      <div class="item-lf">
        <van-icon name="points" class="icon" size="24" />
        <div>分值兑换积分</div>
      </div>
      <div class="duihuan" @click="jifenduihuan">去兑换</div>
    </div>

    <div class="item">
      <div class="item-lf">
        <van-icon name="balance-o" size="24" />
        <div>分值兑换期团值</div>
      </div>
      <div class="duihuan" @click="qituanduihuan">去兑换</div>
    </div>

    <div class="item">
      <div class="item-lf">
        <van-icon name="pending-payment" size="24" />
        <div>分值兑换数字资产</div>
      </div>
      <div class="duihuan" @click="shuziduihuan">去兑换</div>
    </div>

    <van-popup v-model="show" closeable round close-icon="close" position="bottom" :style="{ height: '350px' }"
      @closed="close">
      <div class="pop-title">分值兑换{{ qtjf }}</div>
      <div class="tips">
        <div class="tips-lf">兑换比例为1:{{ratio}} 达{{asset}}可兑</div>
        <div class="tips-rg">可兑换{{ qtjf }}{{ sum }}</div>
      </div>
      <van-field v-model="value" type="digit" class="inp" placeholder="请输入兑换数额">
      </van-field>
      <p class="allBtn" @click="all_exchange">全部兑换</p>
      <div class="tip">说明：{{intro}}</div>
      <div class="submitBtn" @click="duihuan">立即兑换</div>
    </van-popup>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    exchangePoint,
    exchangeEdit
  } from '@/api/exchange_point'
  import minxin from '@/minxin/minxin'
  export default {
    name: '',
    mixins: [minxin],
    data() {
      return {
        show: false,
        // 文本框数据
        value: '',
        qtjf: '',
        sum: '',
        asset: '',
        intro: '',
        ratio: ''

      }
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      jifenduihuan() {
        this.show = true
        this.qtjf = '积分'
        this.sum = this.userInfo.points
        exchangeEdit().then(res => {
          this.asset = res.data.asset_exchange
          this.ratio = res.data.integral_ratio
          this.intro = res.data.integral_intro
        })
      },
      qituanduihuan() {
        this.show = true
        this.qtjf = '期团值'
        this.sum = this.userInfo.qigroup
        exchangeEdit().then(res => {
          this.asset = res.data.group_exchange
          this.ratio = res.data.group_ratio
          this.intro = res.data.group_intro
        })
      },
      shuziduihuan() {
        this.show = true
        this.qtjf = '数字资产'
        this.sum = this.userInfo.digitalasset
        exchangeEdit().then(res => {
          this.asset = res.data.integral_exchange
          this.ratio = res.data.asset_ratio
          this.intro = res.data.asset_intro
        })
      },
      duihuan() {
        if (this.value <= 0) {
          return false
        }
        console.log(this.userInfo);
        console.log(this.value);
        console.log(this.sum);

        console.log(this.ratio);
        var ty
        if (this.qtjf == '积分') {
          if (Number(this.userInfo.points) * Number(this.ratio) < Number(this.value) && Number(this.userInfo.points) *
            Number(this.ratio) > Number(this.asset)) {
            return this.$toast('积分不足')
          }
          ty = '1'
        } else if (this.qtjf == '期团值') {
          console.log(Number(this.userInfo.points) * Number(this.ratio));
          if (Number(this.userInfo.points) * Number(this.ratio) < Number(this.value) && Number(this.userInfo.points) *
            Number(this.ratio) > Number(this.asset)) {
            return this.$toast('期团值不足')
          }
          ty = '2'
        } else {
          if (Number(this.userInfo.points) * Number(this.ratio) < Number(this.value) && Number(this.userInfo.points) *
            Number(this.ratio) > Number(this.asset)) {
            return this.$toast('数字资产不足')
          }
          ty = '3'
        }
        let params = {
          token: this.token,
          ty,
          num: this.value
        }
        exchangePoint(params).then(res => {
          if (res.code == 1) {
            this.$dialog.alert({
              message: '恭喜你,兑换成功!'
            }).then(() => {
              this.show = false
              this.getUserInfos()
            })
          } else {
            this.$toast(res.msg)
          }
        })
      },
      close() {
        this.value = ''
      },
      all_exchange() {
        this.value = this.userInfo.score
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'token'])
    }
  }

</script>
<style lang="less" scoped>
  .container {
    background: #f5f5f5;
  }

  .item {
    width: 702px;
    height: 128px;
    background: #ffffff;
    border-radius: 12px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // padding: 0 20px;
    .item-lf {
      width: 320px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 20px;

      .icon {}

      div {
        width: 250px;
        height: 40px;
        font-size: 28px;
        font-weight: 600;
        color: #000000;
        line-height: 40px;
        margin-left: 5px;
      }
    }

    .duihuan {
      margin-right: 20px;
      width: 160px;
      height: 56px;
      background: #ffbb40;
      border-radius: 28px;
      color: #fff;
      text-align: center;
      line-height: 56px;
      font-size: 28px;
    }
  }

  .pop-title {
    width: 280px;
    height: 45px;
    margin: 30px auto;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    color: #3f3f3f;
    line-height: 45px;
  }

  .tips {
    width: 95%;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    // padding: 0 15px;
    .tips-lf {
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }

    .tips-rg {
      font-size: 26px;
      font-weight: 500;
      color: #666666;
      line-height: 40px;
    }
  }

  .inp {
    width: 95%;
    margin: 20px auto;
    border-radius: 10px;
    border: 2px solid #ffa727;
    font-size: 26px;
  }

  .allBtn {
    width: 150px;
    height: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #000000;
    line-height: 40px;
    margin-left: 20px;
  }

  .tip {
    width: 400px;
    height: 30px;
    font-size: 22px;
    font-weight: 500;
    color: #999999;
    line-height: 30px;
    margin-left: 20px;
    margin-top: 25px;
  }

  .van-cell {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .submitBtn {
    width: 702px;
    height: 80px;
    line-height: 80px;
    background: #ffbb40;
    border-radius: 40px;
    color: #ffffff;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%);
  }

</style>
