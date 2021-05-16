<template>
  <div class="good_details">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>

    <van-swipe
      :indicator-dots="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
      class="swiper"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <van-swipe-item v-for="(item, i) in swipperList" :key="i">
        <!-- 动态绑定图片的 src 属性 -->
        <img :src="item.file_path" style="width: 100%" @click="prediv(i)" />
      </van-swipe-item>
    </van-swipe>
    <!-- list -->
    <div class="commodityprices">
      <div class="leftimage">
        <div class="lefttop">
          <span>拼团价</span>
        </div>
        <div class="leftbottom">
          <div class="leftbottomleft">
            <div class="ptj">￥{{ infoList.interest_price }}</div>
          </div>
          <div class="leftbottomright">
            <s>原价 ￥{{ infoList.line_price }}</s>
          </div>
        </div>
      </div>
      <div class="rightimage">
        <span>已拼{{ infoList.goods_sales }}件</span>
      </div>
    </div>

    <!--文字  -->
    <div class="textbox">
      <div class="titleBox">
        <span>{{ infoList.people }}人团</span>
        <b> {{ infoList.goods_name }}</b>
      </div>
      <div class="boxBottom">参拼就有补贴</div>
    </div>

    <div class="tuanzhang">
      <div class="tuan-left">
        <div>
          <div class="butie-left">团长开团补贴奖</div>
          <div class="butie-left">分值</div>
        </div>
        <div>
          <div class="butie-right">￥{{ infoList.regimental_subsidy }}</div>
          <div class="butie-right">￥{{ infoList.score_subsidy }}</div>
          <!-- <div class="butie-right">￥{{ infoList.qigroup_subsidy }}</div> -->
        </div>
      </div>
      <div class="tuan-line"></div>
      <div class="tuan-right">
        <div class="">
          <div class="butie-left">参团补贴奖</div>
          <div class="butie-left" style="opacity: 0;">1231456</div>
        </div>
        <div>
          <div class="butie-right">￥{{ infoList.join_subsidy }}</div>
          <div class="butie-right" style="opacity: 0;">123456</div>
        </div>
      </div>
    </div>

    <div class="cantuan-now">
      <div class="cantuan-title" v-if="allList.length !== 0">
        <div class="cantuan-person">
          {{ allList.length }}人正在拼团,可直接参与
        </div>
        <div class="cantuan-more" @click="more">
          查看更多
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="line-center"></div>

      <!-- <cantuan-list :list="activeLists"></cantuan-list>
       -->
      <div class="setTime">
        <van-cell is-link v-for="(item, index) in activeLists" :key="index">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="cell">
              <img :src="item.group_avatarUrl" />
              <span class="custom-title">{{ item.group_nickname }}</span>
            </div>
          </template>

          <template #right-icon>
            <div class="right-flex">
              <div>
                <p>还差{{ item.people - item.actual_people }}人成团</p>
                <div class="timeText">距结束 {{ item.timeText }}</div>
              </div>
              <div class="btn-right" @click="joinTeam(item)">去参团</div>
            </div>
          </template>
        </van-cell>
      </div>

      <div class="content">
        <div v-html="infoList.content"><img src="" alt="" /></div>
      </div>
      <!-- shop组件 -->
      <div class="btn-dh">
        <van-icon name="wap-home-o" size="26" @click="goHome" />
        <div class="shouyes">首页</div>
        <div @click="onClickButton" class="btn-go" v-if="active_id">
          去参团
        </div>
        <div @click="onClickButton" class="btn-go" v-else>去开团</div>
      </div>

      <van-popup
        v-model="showPop"
        round
        position="bottom"
        :style="{ height: '55%' }"
        closeable
        v-if="decp_goods.length"
      >
        <van-swipe-cell>
          <van-card
            :price="decp_goods[activeIndex].interest_price || ''"
            :desc="'已选：' + decp_goods[activeIndex].spec_value"
            class="goods-card"
            :thumb="decp_goods[activeIndex].image"
          />
        </van-swipe-cell>
        <div class="title-gg">规格</div>
        <div class="spe">
          <div
            class="spe-item"
            :class="[index == activeIndex ? 'active' : '']"
            v-for="(item, index) in decp_goods"
            @click="selectItem(item, index)"
            :key="index"
          >
            {{ item.spec_value }}
          </div>
        </div>
        <div class="title-gg">数量</div>
        <van-field name="stepper">
          <template #input>
            <van-stepper v-model="num" />
          </template>
        </van-field>
        <div class="cantuan_btn" @click="goCantuanBtn" v-if="active_id">
          去参团
        </div>
        <div class="cantuan_btn" @click="goCantuanBtn" v-else>去开团</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getCantuanGoodsDetails } from '@/api/cate.js'
import cantuanList from '@/components/cantuan-list'
import { ImagePreview } from 'vant'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      infoList: {
        // goods_sku_id:this.decp_goods[0].goods_sku_id
      },
      swipperList: [],
      activeLists: [],
      showPop: false,
      activeIndex: 0,
      decp_goods: [],
      allList: [
        {
          timeText: ''
        },
        {
          timeText: ''
        }
      ],
      num: 1,
      timer: ['', ''],
      timeShow: [],
      active_id: ''
    }
  },
  components: {
    cantuanList
  },
  created() {
    this.active_id = this.$route.query.active_id
    console.log(this.active_id)
    console.log(this.$route.query.path)
    this._getInfoList({
      goods_id: this.$route.query.id,
      token: this.token
    })
    this.counDown()
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    joinTeam(item) {
      this.active_id = item.active_id
      if (this.decp_goods.length) {
        this.showPop = true
      } else {
        this.$dialog
          .alert({
            title: '提示',
            message: '商品库存不足,请选择其他商品选购'
          })
          .then(() => {
            this.$router.back()
          })
      }
    },
    // ...mapMutations('cart', ['getInfo']),
    async _getInfoList(data) {
      const res = await getCantuanGoodsDetails(data)
      this.swipperList = res.data.detail.image
      if (!this.$route.query.active_id) {
        window.localStorage.setItem('goods_id', res.data.detail.goods_id)
      }
      this.infoList = res.data.detail
      window.localStorage.setItem('infoList', JSON.stringify(this.infoList))
      this.decp_goods = res.data.detail.spec

      this.infoList.goods_sku_id = res.data.detail.spec[0].goods_sku_id
      this.infoList.spec_price = res.data.detail.spec[0].interest_price
      this.infoList.image = res.data.detail.image[0]
      if (!res.data.activeList) {
        this.allList = []
        this.activeLists = []
      } else {
        this.allList = res.data.activeList.map(item => {
          item.goods_id = res.data.detail.goods_id
          return item
        })
        if (res.data.activeList.length > 0) {
          this.activeLists = res.data.activeList.slice(0, 2)
          this.counDown()
        }
      }
    },
    prediv(index) {
      const arr = this.swipperList.map(item => item.file_path)
      ImagePreview({
        startPosition: index, // 当前显示图片的http链接
        images: arr // 需要预览的图片http链接列表
      })
    },
    goHome(e) {
      this.$router.push('/')
    },
    // 查看更多
    more() {
      this.$router.push({
        path: '/cantuan_details'
      })
      window.localStorage.setItem('list', JSON.stringify(this.allList))
    },
    // 点击去开团显示弹框
    onClickButton(e) {
      if (this.decp_goods.length) {
        this.showPop = true
      } else {
        this.$dialog
          .alert({
            title: '提示',
            message: '商品库存不足,请选择其他商品选购'
          })
          .then(() => {
            this.$router.back()
          })
        // this.$router.push({
        //   path: '/order',
        //   query: this.infoList,
        // })
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    selectItem(item, index) {
      console.log(item)
      this.activeIndex = index
      this.infoList.goods_sku_id = item.goods_sku_id
      this.infoList.spec_price = this.decp_goods[index].interest_price
      this.infoList.image = this.decp_goods[index].image
    },

    goCantuanBtn() {
      this.infoList.goods_num = this.num
      if (!this.token) {
        this.$toast('请先登录!')
        this.$router.push('/my')
      } else {
        if (!this.infoList.goods_sku_id) {
          this.$toast('请选择规格')
          return
        }
        console.log(this.infoList)
        this.infoList.active_id = this.active_id
        this.$router.push({
          path: '/order',
          query: this.infoList
        })
      }
    },
    getTimeLeft(time1) {
      // 计算目标与现在时间差（毫秒）
      // let time1 = new Date().getTime()+(45*1000*60);
      let time2 = new Date()
        .getTime()
        .toString()
        .substr(0, 10)
      let mss = Number(time1) - Number(time2)
      // console.log("time2" + time2);
      // console.log("time1" + time1);
      // 将时间差（毫秒）格式为：天时分秒
      let days = parseInt(mss / (60 * 60 * 24))
      let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60))
      let minutes = parseInt((mss % (60 * 60)) / 60)
      let seconds = parseInt(mss % 60)
      return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
    },
    myCounDown(i) {
      this.timeShow[i] = this.getTimeLeft(this.activeLists[i].end_time)
      this.$set(this.activeLists[i], 'timeText', this.timeShow[i])
      if (this.timeShow == '0天0时0分0秒') {
        clearInterval(this.timer[i])
      }
    },
    counDown() {
      //  console.log(this.activeLists);
      for (var i = 0; i < this.activeLists.length; i++) {
        this.timer[i] = setInterval(
          this.myCounDown,
          Math.random() * 500 + 100 * i,
          i
        )
        // 倒计时
      }
    }
  }
}
</script>

<style lang="less">
.good_details {
  padding-bottom: 120px;
  background: #f3f4f6;
  font-size: 24px;
  box-sizing: border-box;

  .chat-custom-right {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .chat-custom-text {
    font-size: 12px;
    color: #999;
  }

  .shopNav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }

  .commodityprices {
    display: flex;
    justify-content: space-between;
    width: 750px;
    height: 120px;
    // background: #FB242C;
    background-color: #fb242c;
    border-radius: 12px 12px 0px 0px;
    color: #fff;

    .leftbottom {
      color: #fff;
      display: flex;
      height: 22px;
    }

    .lefttop {
      margin-top: 45px;
      height: 22px;
      font-size: 24px;
    }

    .leftbottom {
      height: 22px;
      margin-top: 30px;
    }

    .leftimage {
      // line-height: 70px;
      padding: 0px;
      margin: 0px;
      margin-left: 20px;
      word-break: keep-all;
      white-space: nowrap;
    }

    .leftbottomleft {
      margin-top: -54px;
      margin-left: 100px;
    }

    .ptj {
      font-size: 28px;
    }

    .leftbottomright {
      margin-left: 20px;
      font-size: 24px;
      margin-top: -53px;
    }

    .rightimage {
      width: 170px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
  }

  .textbox {
    // width: 750px;
    height: 164px;
    background: #ffffff;
    border-radius: 0px 0px 12px 12px;
    margin-top: 20px;
    // padding: 20px 58px 0 24px;

    .titleBox {
      display: flex;
      align-items: center;
      height: 80px;

      font-size: 32px;
      font-weight: 600;
      color: #2d2f33;

      span {
        display: inline-block;
        width: 100px;
        padding: 5px;
        background: #ffa727;
        border-radius: 4px;
        font-size: 22px;
        text-align: center;
        color: #fff;
        margin: 0 15px;
      }

      b {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }
    }

    .boxBottom {
      width: 160px;
      height: 24px;
      font-size: 24px;
      font-weight: 600;
      color: #999999;
      line-height: 24px;
      margin-top: 5px;
      margin-left: 20px;
    }
  }

  .tuanzhang {
    width: 750px;
    height: 136px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tuan-left,
    .tuan-right {
      width: 373px;
      height: 74px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .tuan-line {
      width: 2px;
      height: 74px;
      background-color: #dcdcdc;
    }

    .butie-left {
      font-size: 28px;
      font-weight: 600;
      color: #666666;
      margin-bottom: 15px;
    }

    .butie-right {
      font-size: 28px;
      font-weight: bold;
      color: #ff0202;
      margin-bottom: 15px;
    }
  }

  .cantuan-now {
    width: 750px;
    background: #ffffff;
    border-radius: 12px;
    margin-top: 20px;

    // padding: 23px 24px 35px 23px;
    .cantuan-title {
      width: 100%;
      height: 75px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .cantuan-person {
        width: 325px;
        height: 28px;
        font-size: 28px;
        font-weight: 600;
        color: #2d2f33;
        padding-left: 20px;
      }

      .cantuan-more {
        width: 150px;
        height: 28px;
        font-size: 24px;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
    }

    .line-center {
      width: 701px;
      height: 2px;
      background-color: #dcdcdc;
      // margin: 30px 0;
    }
  }

  /deep/ .van-field__control--custom {
    justify-content: center;
  }

  .content {
    width: 100%;
    margin-top: 10px;
    padding: 0.25rem 0.5rem;
    padding-bottom: 1rem;
    box-sizing: border-box;

    img {
      width: 100%;
    }
    p {
      word-wrap: break-word;
    }

    * {
      white-space: pre-wrap !important;
    }
  }

  .btn-dh {
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    padding-left: 40px;
    align-items: center;
    background-color: #fff;
  }
  .shouyes {
    position: absolute;
    left: 42px;
    bottom: 25px;
    // margin-top: 80px;
  }
  .van-icon-wap-home-o {
    margin-top: -30px;
  }
  .btn-go {
    width: 80%;
    padding: 10px 0;
    margin: 30px 0;
    background: #febb40;
    border-radius: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 28px;
    color: #fff;
    margin-left: 40px;
  }

  .goods-card {
    margin-top: 50px;
    background: none !important;

    .van-card {
      background: none !important;
    }

    .van-card__content {
      justify-content: space-around;

      .van-card__desc {
        width: 172px;
        height: 33px;
        font-size: 24px;
        font-weight: 600;
        color: #666666;
        line-height: 33px;
      }

      .van-card__price {
        width: 150px;
        height: 36px;
        font-size: 28px;
        font-weight: 600;
        color: #fd1b1b;
        line-height: 36px;
      }
    }
  }

  .title-gg {
    margin: 20px 0 20px 50px;
    height: 45px;
    font-size: 32px;
    font-weight: 600;
    color: #2d2f33;
    line-height: 45px;
  }

  .spe {
    display: flex;
    padding: 0 65px;
    flex-wrap: wrap;

    .spe-item {
      width: 156px;
      height: 56px;
      background: rgba(220, 220, 220, 0.25);
      border-radius: 31px;
      font-weight: 600;
      color: #666666;
      line-height: 56px;
      font-size: 28px;
      text-align: center;
      margin: 10px 21px;
      border: 1px solid transparent;
    }

    .active {
      background: rgba(255, 167, 39, 0.25);
      border: 1px solid #ffa727;
      color: #ffa727;
    }
  }

  .cantuan_btn {
    position: fixed;
    bottom: 15px;
    left: 50%;
    padding: 0.25rem 0;
    transform: translate(-50%);
    width: 680px;
    background: #ffbb40;
    border-radius: 40px;
    text-align: center;
    font-size: 28px;
    color: #fff;
  }
}

.setTime {
  .cell {
    display: flex;
    align-items: center;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }

  .custom-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
  }

  .right-flex {
    height: 65px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: right;

    div {
      padding-right: 15px;

      p {
        font-size: 28px;
        font-weight: 600;
        color: #2d2f33;
        text-align: right;
      }

      div {
        font-size: 20px;
        color: #999;
      }
    }
  }

  .btn-right {
    padding: 3px 10px;
    background: linear-gradient(225deg, #f494ca 0%, #f655a8 100%);
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-size: 24px;
  }
}
</style>
