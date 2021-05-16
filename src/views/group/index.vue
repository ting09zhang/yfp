<template>
  <div>
    <navbarF :title="' '"></navbarF>

    <van-swipe :indicator-dots="true" :interval="3000" :duration="1000" :circular="true" class="swiper">
      <!-- 循环渲染轮播图的 item 项 -->
      <van-swipe-item v-for="(item, i) in swipperList" :key="i">
        <!-- 动态绑定图片的 src 属性 -->
        <img :src="item.file_path" style="width: 100%;" @click="prediv(i)" />
      </van-swipe-item>
    </van-swipe>

    <div class="card">
      <p class="title">
        {{ detailList.goods_name }}
      </p>
      <div class="person">已有{{ detailList.grand_buynum }}人参与</div>
      <div class="flex">
        <div class="box-m">
          <div class="divs">
            单次参与需 <span class="spans">{{ detailList.group_price }}</span>
            <p class="ps">期团值</p>
          </div>
        </div>
        <div class="sum">数量 : 1</div>
      </div>
    </div>

    <div class="person-buy">
      <div class="left">
        <img :src="detailList.user_img" alt="">
        <div class="left-box">
          <div class="box-pr">
            {{ detailList.grand_buynum }}人已购买/本周{{
              detailList.weekbuynum
            }}人已购买
          </div>
          <p class="box-dr">已兑{{ detailList.exchange_group }}点期团值</p>
        </div>
      </div>
      <van-progress :pivot-text="detailList.percentage.toFixed(2)+'%'" style="" track-color="#fff" color="#ff0000" :percentage="100" />
    </div>

    <div class="boxs" v-if="detailList.buy_num">
      <div>已购 ×{{ detailList.buy_num }}份</div>
      <img :src="item.avatarUrl" alt="" />
    </div>

    <div class="tab">
      <van-tabs @click="onClick" color="#1989fa" line-width="10px" title-active-color="#666">
        <van-tab title="规则">
          <div class="rule">
            1.所有参与用户可选择自己喜欢的商品,支付所需的期团值参与猜奖,获取猜奖资格,参与后期团值不予退还.
          </div>
        </van-tab>
        <van-tab title="本期参与">
          <ul>
            <li v-for="(item, index) in nowGroupList" :key="index">
              <div>
                <img :src="item.avatarUrl" alt="" />
                <p>{{ item.nickName }}</p>
                <span>×{{ item.num }}份</span>
              </div>
              <div>{{ item.create_time }}</div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="showPop" round closeable position="bottom" :style="{ height: '45%' }">
      <div class="canyuSum">参与数量</div>
      <div class="tips">期团值买1份，单个宝贝一天最多可买1000份</div>
      <div>
        <van-field name="stepper" class="inp">
          <template #input>
            <van-stepper v-model="stepper" />
          </template>
        </van-field>
      </div>
      <div class="tip">
        您有{{ userInfo.qigroup }}期团值，买的越多，概率越大
      </div>

      <div class="submit" @click="submit">确定</div>
    </van-popup>
    <div class="buy" @click="goBuy" v-if="flag">继续买期团</div>
    <div class="buy" @click="goBuy" v-else>买期团</div>
  </div>
</template>

<script>
  import navbarF from '@/components/navbar_f'
  import {
    ImagePreview
  } from 'vant'
  import {
    getGroupDetails,
    getGroupDetailsNow,
    payGroup
  } from '@/api/group.js'
  import {
    mapGetters
  } from 'vuex'
  import dayjs from 'dayjs'
  import minxin from '@/minxin/minxin'
  export default {
    mixins: [minxin],
    name: '',
    components: {
      navbarF
    },
    data() {
      return {
        swipperList: [],
        showPop: false,
        stepper: 1,
        detailList: {},
        nowGroupList: [],
        flag: false,
        pro: "100%"
      }
    },
    methods: {
      onClick(data) {
        // if (data == 1) {
        //   this.getGroupCurrent({
        //     goods_id: this.$route.query.goods_id,
        //     page: '1',
        //     limit: '10'
        //   })
        // }
      },
      goBuy() {
        this.showPop = true
      },
      getGroupDetail(param) {
        getGroupDetails(param).then(res => {
          this.detailList = res.data.detail
          this.swipperList = res.data.detail.image
        })
      },
      getGroupCurrent(param) {
        getGroupDetailsNow(param).then(res => {
          this.nowGroupList = res.data
          this.nowGroupList.forEach(item => {
            if (item.nickName == this.userInfo.nickName) {
              this.flag = true
            }
          })
        })
      },
      prediv(index) {
        const arr = this.swipperList.map(item => item.file_path)
        ImagePreview({
          startPosition: index, // 当前显示图片的http链接
          images: arr // 需要预览的图片http链接列表
        })
      },
      submit() {
        if (this.stepper * this.detailList.group_price > this.userInfo.qigroup) {
          console.log(321);
          this.$dialog
            .alert({
              title: '您的期团值不够',
              message: '快去分值兑换中心兑换期团值吧～兑换完了再来参加'
            })
            .then(() => {
              this.showPop = false
              this.stepper = 1
            })
        } else {
          console.log(123);
          payGroup({
            token: this.token,
            goods_id: this.$route.query.goods_id,
            num: this.stepper
          }).then(res => {
            if (res.code == 1) {
              this.$dialog
                .alert({
                  title: '兑换成功!',
                  message: '恭喜您兑换期团成功!'
                })
                .then(() => {
                  this.getUserInfos()
                  this.getGroupDetail({
                    token: this.token,
                    goods_id: this.$route.query.goods_id,
                    group: '1'
                  })
                  this.stepper = 1
                  this.showPop = false
                })
            } else {
              this.$toast(res.msg)
              this.stepper = 1
              this.showPop = false
            }
          })
        }
      }
    },
    created() {
      this.getGroupDetail({
        token: this.token,
        goods_id: this.$route.query.goods_id,
        group: '1'
      })

      this.getGroupCurrent({
        goods_id: this.$route.query.goods_id,
        page: '1',
        limit: '10'
      })
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    }
  }

</script>
<style lang="less" scoped>
  .swiper {
    width: 100%;
    // min-height: 460px;
  }

  .card {

    width: 750px;
    height: 198px;
    background: #ffffff;
    border-radius: 0px 0px 12px 12px;

    .title {
      width: 95%;
      line-height: 60px;
      font-size: 32px;
      font-weight: 600;
      color: #2d2f33;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin: 0 auto;
    }

    .person {
      width: 689px;
      height: 30px;
      font-size: 22px;
      font-weight: 600;
      color: #999999;
      line-height: 30px;
      text-align: right;
    }

    .flex {
      width: 95%;
      margin: 0 auto;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sum {
      width: 120px;
      text-align: left;
      height: 33px;
      font-size: 24px;
      font-weight: 600;
      color: #666666;
      line-height: 33px;
    }

    .box-m {
      width: 410px;
      text-align: right;

      .divs {
        text-align: left;
        font-size: 24px;
        font-weight: 600;
        color: #999999;
        line-height: 24px;
      }

      .spans {
        font-size: 32px;
        font-weight: bold;
        color: #fe2727;
        line-height: 32px;
        margin-left: 20px;
      }

      .ps {
        display: inline-block;
        color: #000;
        margin-left: 5px;
      }
    }
  }

  .van-tab--active {
    color: #FFBB40;
  }

  .person-buy {
    width: 100%;
    padding: 5px 15px;
    height: 104px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    // padding: 0 20px;
    .left {
      width: 450px;
      height: 80px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        margin-right: 20px;
      }

      .box-pr,
      .box-dr {
        font-size: 24px;
      }
    }

    .right {
      width: 114px;
      height: 29px;
      background: #dcdcdc;
      border-radius: 15px;
      position: relative;

      &::after {
        content: '50%';
        width: 86px;
        height: 29px;
        background: #ff0000;
        border-radius: 15px;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 29px;
      }
    }
  }

  .tab {
    width: 750px;
    height: 536px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;

    .rule {
      width: 689px;
      height: 66px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 550;
      color: #666;
      line-height: 33px;
      margin: 20px auto;
    }

    li>div:last-child {
      font-size: 20px;
      color: #999;
    }
  }

  ul {
    li {
      width: 720px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
      }

      p {
        display: inline-block;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #999999;
        line-height: 33px;
        margin-right: 12px;
      }

      span {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffa727;
        line-height: 33px;
      }
    }
  }

  .buy {
    width: 702px;
    height: 80px;
    background: #ffbb40;
    border-radius: 40px;
    position: fixed;
    left: 50%;
    bottom: 5px;
    transform: translate(-50%);
    color: #fff;
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }

  .boxs {
    width: 750px;
    height: 80px;
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .canyuSum {
    width: 750px;
    height: 105px;
    line-height: 105px;
    text-align: center;
    color: #000;
    font-weight: 550;
    font-size: 28px;
  }

  .tips {
    width: 577px;
    height: 40px;
    font-size: 28px;
    font-family: DIN-Medium, DIN;
    font-weight: 500;
    color: #3f3f3f;
    line-height: 34px;
    text-align: center;
    margin: 0 auto;
  }

  /deep/ .van-field__control--custom {
    height: 90px;
    justify-content: center;
  }

  .tip {
    width: 420px;
    height: 47px;
    background: #ffeedc;
    border-radius: 12px;
    margin: 0 auto;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffa727;
    line-height: 47px;
    text-align: center;
  }

  .submit {
    width: 380px;
    height: 80px;
    background: #ffbb40;
    border-radius: 40px;
    color: #fff;
    line-height: 80px;
    font-size: 30px;
    text-align: center;
    margin: 40px auto;
  }

</style>
