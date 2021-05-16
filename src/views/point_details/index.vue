<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="商品详情">
    </van-nav-bar>
    <van-swipe :indicator-dots="true" :interval="3000" :duration="1000" :circular="true" indicator-color="white">
      <!-- 循环渲染轮播图的 item 项 -->
      <van-swipe-item v-for="(item, i) in infoList.goods_image" :key="i">
        <!-- 动态绑定图片的 src 属性 -->
        <img :src="item" class="img" @click="prediv(i)" />
      </van-swipe-item>
    </van-swipe>

    <div class="detail">
      <div class="detai-left">
        <div class="title">
          {{ infoList.goods_name }}
        </div>
        <div class="price">
          <div class="price-lf">
            ￥{{ infoList.goods_price }}元+{{ infoList.selling_integral }}积分
          </div>
          <span class="yuanfjeeu">原价{{ infoList.line_price }}元</span>
        </div>
      </div>
      <div class="detai-right">剩余{{ userInfo.points }}积分</div>
    </div>

    <div class="detail-title">
      商品描述
    </div>

    <div v-html="infoList.content" class="info_details"></div>
    <div class="btn" @click="handler">
      {{ infoList.if_buy == 1 ? '立即兑换' : '积分不足' }}
    </div>
  </div>
</template>

<script>
  import {
    getPointGoodsDetails
  } from '@/api/cate.js'
  import {
    mapGetters
  } from 'vuex'
  import {
    ImagePreview
  } from 'vant'
  export default {
    components: {
      [ImagePreview.Component.name]: ImagePreview.Component
    },
    data() {
      return {
        infoList: {}
      }
    },
    methods: {
      async _getInfoList(data) {
        const res = await getPointGoodsDetails(data)
        this.infoList = res.data.detail
      },
      prediv(index) {
        const arr = this.infoList.goods_image.map(item => item)
        ImagePreview({
          startPosition: index, // 当前显示图片的http链接
          images: arr // 需要预览的图片http链接列表
        })
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      handler() {
        if (this.infoList.if_buy == 1) {
          if (this.infoList.goods_image.length > 1) {
            this.infoList.goods_image = this.infoList.goods_image[0]
          }
          this.$router.push({
            path: '/point-order',
            query: this.infoList
          })
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    created() {
      const data = this.$route.query.id
      this._getInfoList({
        goods_id: data,
        token: this.token
      })
    }
  }

</script>

<style lang="less">
  .container {
    padding-bottom: 80px;
    background: #f3f4f6;
    height: 100%;

    .img {
      width: 100%;
    }
  }

  .detail {
    width: 750px;
    background: #ffffff;
    border-radius: 0px 0px 12px 12px;
    margin-top: 20px;
    // padding: 30px 24px 30px 23px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    align-items: center;

    .detai-left {
      width: 420px;

      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        width: 400px;
        font-size: 28px;
        margin-top: 50px;
        margin-bottom: 10px;
        font-weight: 600;
        color: #2d2f33;
      }

      .price {
        word-break: keep-all;
        white-space: nowrap;
        margin-bottom: 30px;

        .price-lf {
          font-size: 28px;
          font-weight: 700;
          color: #ff0202;
          display: inline-block;
        }

        span {
          font-size: 22px;
          font-weight: 500;
          color: #999999;
          margin-left: 20px;
          text-decoration: line-through;
        }
      }
    }

    .detai-right {
      font-size: 22px;
      font-weight: 500;
      color: #666666;
      margin-top: -40px;
    }
  }

  .detail-title {
    font-size: 28px;
    font-weight: 600;
    color: #2d2f33;
    text-align: center;
    margin: 15px 0;
  }

  .btn {
    position: fixed;
    left: 50%;
    bottom: 30px;
    width: 650px;
    transform: translateX(-50%);
    height: 80px;
    color: #fff;
    background-color: #ffbb40;
    text-align: center;
    line-height: 80px;
    border-radius: 50px;
    font-size: 28px;
  }

  .info_details {
    width: 100%;
    padding: 5px 15px 50px 15px;
    margin: 5px auto;
    box-sizing: border-box;

    img,
    p,
    div {
      width: 100%;
    }

    * {
      white-space: pre-wrap !important;
    }
  }

</style>
