<template>
  <div class="detailss">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow>
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #title>
        <div class="wodetuadui">参团详情</div>
      </template>
      <template #right>
        <van-icon name="share" />
      </template>
    </van-nav-bar>
    <!-- 商品 -->
    <div @click="openItem">
      <van-card
        class="topmatja"
        :thumb="list.image"
        :title="list.goods_name"
        :origin-price="list.line_price"
      >
        <template #tags class="jsjwiwi">
          <van-tag plain type="danger" class="shirentuas"
            >{{ list.people }}人团</van-tag
          >
          <span class="yipinwu">已拼{{ list.goods_sales }}次</span>
        </template>
        <template #price>
          <div class="pingtuajian">
            <span>拼团价 </span>
            <span>¥ {{ list.score_subsidy }}</span>
          </div>
        </template>
      </van-card>
    </div>
    <!-- 参团参数 -->
    <van-cell class="jicel">
      <template #title>
        <div class="cell_left">
          <span class="fengdui">团长开团补贴奖</span>
          <span class="fengba">¥{{ list.regimental_subsidy }}</span>
        </div>
      </template>
      <template>
        <div>
          <span class="caitua">参团补贴奖</span>
          <span class="ffffeie">¥{{ list.join_subsidy }}</span>
        </div>
        <!-- <div class="qinshu">
          <span class="caitua">分值</span>
          <span class="ffffeie">¥{{ list.score_subsidy }}</span>
        </div> -->
      </template>
      <template #label>
        <span class="fengduiss">分值</span>
        <span class="fengbasdf">¥{{ list.score_subsidy }}</span>
      </template>
      <!-- <template #label>
        <span class="fengduiss">期团奖</span>
        <span class="fengbasdf">¥{{ list.qigroup_subsidy }}</span>
      </template> -->
    </van-cell>
    <!-- 用户照片区域 -->
    <div class="zhaobei">
      <div class="zhaopianqige">
        <span v-for="(item, index) in list.buy_user_img" :key="index">
          <van-image
            class="zhaopianweiji"
            round
            :src="item"
            :class="index == 0 ? 'boldBor' : ''"
        /></span>
      </div>
      <div class="zutuatiao">
        <span>还差～</span>
        <span class="yaner">{{ list.surplus_people }}</span>
        <span>人即可组团成功</span>
      </div>
      <div class="jueshi">
        <span>{{ list.end_time.text }}</span>
        <span>后结束</span>
      </div>
      <van-button
        type="primary"
        size="large"
        class="dahaoanniuye"
        @click="sharemyWx"
        >邀请好友来参团</van-button
      >
    </div>
    <div class="guizeyan">
      <span class="pinguize">拼团规则:</span>
      <span class="kaituat">{{ list.rule }}</span>
    </div>
    <van-tabs v-model="active">
      <van-tab title="拼团详情">
        <van-cell
          size="large"
          v-for="(item, index) in list.can_user"
          :key="index"
        >
          <template #icon>
            <van-image round width="1rem" height="1rem" :src="item.avatarUrl" />
          </template>
          <template #title>
            <div>
              <span class="ruajiyi">{{ item.nickName }}</span>
              <span class="yangchang" v-if="index == 0">团长</span>
            </div>
          </template>
          <template #right-icon>
            <div class="daifahou">
              <span>{{ item.time }} </span>
            </div>
          </template>
        </van-cell>
      </van-tab>
      <van-tab title="商品详情">
        <p v-html="list.content" class="content"></p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getTuxedodetails } from '@/api/my'
import { wxShare } from '@/api/home'

import { mapGetters } from 'vuex'
import wx from 'weixin-js-sdk'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      list: {
        end_time: {},
        score_subsidy: 0
      },
      timer: null,
      title: '',
      url: '',
      pic: ''
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  created() {
    this.lonActive()
  },
  mounted() {},
  methods: {
    async lonActive() {
      const { data } = await getTuxedodetails({
        active_id: this.$route.query.id,
        token: this.token
      })
      this.list = data
      this.list.regimental_subsidy = this.list.regimental_subsidy.toFixed(2)
      var timeShow = ''
      var time1 = this.list.end_time.value
      this.timer = setInterval(() => {
        timeShow = this.getTimeLeft(time1)
        this.list.end_time.text = timeShow
        if (timeShow == '0天-0时-0分-0秒') {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    openItem() {
      this.$router.push('/goods_details?id=' + this.list.goods_id)
    },
    //取倒计时（天时分秒）
    getTimeLeft(time1) {
      // 计算目标与现在时间差（毫秒）
      // let time1 = new Date().getTime()+(45*1000*60);
      let time2 = new Date()
        .getTime()
        .toString()
        .substr(0, 10)
      let mss = Number(time1) - Number(time2)
      // 将时间差（毫秒）格式为：天时分秒
      let days = parseInt(mss / (60 * 60 * 24))
      let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
      let minutes = parseInt((mss % (60 * 60)) / 60)
      let seconds = parseInt(mss % 60)
      return days + '天-' + hours + '时-' + minutes + '分-' + seconds + '秒'
    },
    sharemyWx() {
      this.$notify({ type: 'primary', message: '点击右上角分享' })
      this.getShareInfo(this.title, window.location.href)
    },
    getShareInfo(tit, fxUrl) {
      //如果分享的内容会根据情况变化，那么这里可以传入分享标题及url
      var data = {
        //请求参数
        url: fxUrl,
        token: this.token,
        code: this.code
      }
      var _this = this
      wxShare(data) //这里我写了一个公用的接口请求js，这里正常axios请求就可以，只要拿到数据都可以
        .then(res => {
          localStorage.setItem('jsapi_ticket', res.jsapi_ticket)
          //拿到后端给的这些数据
          let appId = res.data.appId
          let timestamp = res.data.timestamp
          let nonceStr = res.data.noncestr
          let signature = res.data.signature
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx56a464621c6314a', // 必填，公众号的唯一标识，填自己的！
            timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
          })
          wx.ready(function() {
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: tit, // 分享时的标题
              link: fxUrl, // 分享时的链接
              // imgUrl: _this.pic, // 分享时的图标
              success: function() {
                console.log('分享成功')
              },
              cancel: function() {
                console.log('取消分享')
              }
            })
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: tit,
              desc: '来参加拼团吧，每件只需' + _this.list.score_subsidy + '元',
              link: fxUrl,
              // imgUrl: _this.pic,
              type: '',
              dataUrl: '',
              success: function() {
                console.log('分享成功')
              },
              cancel: function() {
                console.log('取消分享')
              }
            })
          })
        })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer) // 清除
  }
}
</script>
<style lang="less">
.detailss {
  .boldBor {
    border: 1px solid orangered;
    box-sizing: border-box;
    border-radius: 100px;
    background-color: #fff;
    img {
      border-radius: 100px;
    }
  }
  .wodetuadui {
    color: #000;
    margin-left: 20px;
    margin-right: 20px;
  }

  .van-icon-arrow-left {
    font-size: 48px;
    color: #666666;
  }
  // .van-multi-ellipsis--l2{
  //   -webkit-line-clamp: 1;
  // }

  height: 88px;

  .van-card {
    margin-top: 0;
  }

  .van-cell__value {
    color: red;
    font-size: 28px;
    font-weight: 500;
    margin-top: 12px;
  }

  .shirentuas {
    margin-top: 15px;
  }

  .shirentuas {
    font-weight: 500;
    color: #f0657e;
    font-size: 24px;
    line-height: 33px;
  }

  .mingchengbao {
    font-size: 32px;
    font-weight: 600;
    margin-left: 5px;
  }

  .van-card__num {
    margin-right: 350px;
  }

  .van-button--default {
    margin-top: 40px;
  }

  .hejijiage {
    margin-top: 30px;
  }

  .hejiss {
    font-size: 24px;
    color: #999999;
    margin-right: 5px;
  }

  .jiagesdf {
    font-size: 22px;
    font-weight: 500;
    color: #000000;
  }

  .quzhifu {
    font-size: 28px;
    color: #ffffff;
    border-radius: 8px;
    font-weight: 500;
    background-color: red;
    margin-left: 20px;
  }

  .qiuxiaodingdas {
    color: #666666;
    border-radius: 8px;
    font-size: 28px;
    border: 1px solid #999999;
  }

  .topmatja {
    width: 95%;
    margin: 15px auto;
    background-color: #fff;
    border-radius: 8px;
  }

  .van-card__price {
    margin-left: 8px;
  }

  .pingtuajian {
    display: inline-block;
    color: #323233;
    font-weight: 500;
    font-size: 0.42667rem;
    font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
    color: #fd1b1b;

    :first-child {
      font-size: 0.32667rem;
    }
  }

  .yipinwu {
    margin-top: 15px;
    margin-left: 10px;
    font-size: 24px;
    font-weight: 600;
    color: #666666;
  }

  .jicel {
    width: 95%;
    margin: 0 auto;
  }
  .cell_left {
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
    box-sizing: border-box;
  }
  .van-cell__label {
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
    box-sizing: border-box;
  }

  .fengba {
    font-size: 28px;
    font-weight: bold;
    color: #000000;
  }

  .fengbasdf {
    font-size: 28px;
    font-weight: bold;
    color: #000000;
  }

  .fengdui {
    font-size: 24px;
    font-weight: 500;
    color: #666666;
  }

  .fengduiss {
    font-size: 24px;
    font-weight: 500;
    color: #666666;
  }

  .caitua {
    position: absolute;
    left: 0;
    font-size: 24px;
    font-weight: 600;
    color: #666666;
  }

  .ffffeie {
    font-size: 28px;
    font-weight: bold;
    color: #000000;
  }

  .van-image--round {
    width: 72px;
    height: 72px;
    background: #d8d8d8;
  }

  .zhaobei {
    position: relative;
    background-color: #ffffff;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 15px;
    border-radius: 7px;
  }

  .zhaopianqige {
    width: 95%;
    margin: 15px auto;
    border-radius: 7px;
  }

  .zhaopianweiji {
    padding: 8px;
    margin-right: 24px;
    margin-top: 20px;
    box-sizing: border-box;
  }

  .zutuatiao {
    display: flex;
    justify-content: center;
    padding: 15px;
    font-size: 28px;
    font-weight: 600;
    color: #666666;
  }

  .yaner {
    color: red;
  }

  .jueshi {
    padding: 15px;
    font-size: 20px;
    color: #999;
    text-align: center;
  }

  .dahaoanniuye {
    width: 80%;
    display: block;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 15px;
    background: #ffbb40;
    border-radius: 42px;
    height: 70px;
    border: transparent;
    font-size: 28px;
    font-weight: 600;
    color: #ffffff;
  }

  .guizeyan {
    margin-top: 20px;
    height: 84px;
    line-height: 84px;
    background-color: #ffffff;
    margin-left: 20px;
    margin-right: 20px;
  }

  .pinguize {
    font-size: 24px;
    margin-left: 10px;
    font-weight: 600;
    color: #666666;
  }

  .kaituat {
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    margin-left: 10px;
  }

  .van-cell__title {
    margin-top: 10px;
    font-size: 24px;
    font-weight: 600;
    color: #999999;
    margin-left: 20px;
  }

  .daifahou {
    margin-top: 10px;
    font-size: 22px;
    font-weight: 600;
    color: #999999;
  }

  .yangchang {
    color: #ffa727;
    margin-left: 10px;
  }

  .dinghu {
    margin-right: 10px;
  }

  .van-tabs {
    width: 95%;
    margin: 0 auto;
  }
  .content {
    margin-top: 15px;
    font-size: 24px;
    img {
      width: 100%;
    }
    p {
      word-wrap: break-word;
    }
  }
}
</style>
