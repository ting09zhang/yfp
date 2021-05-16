<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="今日热拼商品">
      <template #right>
        <van-icon name="share" size="24" />
      </template>
    </van-nav-bar>
    <div class="bgBox">
      <div class="bg-top"></div>
      <div class="bg-bom"></div>
    </div>
    <div class="box" v-for="item in goodsList" :key="item.goods_id">
      <div class="item">
        <div class="img-left">
          <img :src="item.goods_image" />
        </div>
        <div class="goods-right">
          <div class="info-top">
            <div>
              {{item.goods_name}}
            </div>
            <span>已拼{{item.sales_actual}}次 还差{{item.surplus_people}}人成团</span>
          </div>
          <div class="price-bom">
            <div class="pintuan-left">
              <div class="price-top">拼团价￥<span>{{item.subsidy}}</span></div>
              <div class="butie-bom">
                参拼补贴
              </div>
            </div>
            <div class="cantuan-right">
              <div class="gotuan" @click="gocantuan(item)">
                去参团
              </div>
              <div class="buy" @click="goGroup(item)">
                买期团
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getHotSpellGoods
  } from '@/api/home.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        goodsList: []
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      gocantuan(item) {
        if (this.token) {
          this.$router.push(`/goods_details?id=${item.goods_id}`)
        } else {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
        }
      },
      async getHotSpellGoodList() {
        const res = await getHotSpellGoods({
          "ty": 2
        })
        this.goodsList = res.data.list
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      goGroup(item) {
        if (!this.token) {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
          return;
        }

        if (this.userInfo.qigroup <= 0) {
          this.$dialog
            .alert({
              title: '提示',
              message: '你的期团值不足,赶快兑换吧'
            })
            .then(() => {
              // on close
            })
        } else {
          this.$router.push(`/group?goods_id=${item.goods_id}`)
        }
      }
    },
    created() {
      this.getHotSpellGoodList()
    }
  }

</script>

<style lang="less">
  .container {
    position: relative;
    font-size: 14px;
    top: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, #f3f4f6 100%);
  }

  .bgBox {
    width: 100%;
    height: 380px;
    position: absolute;
    left: 0;
    top: 0;

    .bg-top {
      width: 100%;
      height: 350px;
      background: linear-gradient(180deg, #fea568 0%, #fd6117 100%);
    }

    .bg-bom {
      width: 100%;
      height: 30px;
      background-color: #fd6117;
      border-radius: 0 0 50% 50%;
    }
  }

  .box {
    position: relative;
    left: 0;
    top: 72px;

    .item {
      width: 702px;
      height: 240px;
      margin: 15px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      padding: 10px;
      display: flex;

      &:nth-child(1) {
        margin: 0 auto 15px;
      }

      .img-left {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 80%;
          height: 80%;
          border-radius: 13px;
        }
      }

      .goods-right {
        width: 480px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;

        .info-top {
          div {
            width: 423px;
            height: 48px;
            font-size: 32px;
            font-weight: 600;
            color: #2d2f33;
            line-height: 48px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          span {
            display: inline-block;
            width: 274px;
            height: 33px;
            font-size: 24px;
            font-weight: 600;
            color: #666666;
            line-height: 33px;
          }
        }

        .price-bom {
          display: flex;
          justify-content: space-between;

          .pintuan-left {
            display: flex;
            flex-direction: column;

            .price-top {
              width: 180px;
              height: 36px;
              font-size: 22px;
              font-weight: 500;
              color: #fd1b1b;
              line-height: 36px;
              display: flex;

              span {
                font-size: 32px;
              }
            }

            .butie-bom {
              width: 145px;
              height: 30px;
              font-size: 22px;
              font-weight: 600;
              color: #999999;
              line-height: 30px;
            }
          }

          .cantuan-right {
            width: 208px;
            margin-left: 80px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .gotuan,
            .buy {
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              line-height: 50px;
              text-align: center;
            }

            .gotuan {
              width: 95px;
              height: 52px;
              background: linear-gradient(225deg, #f494ca 0%, #f655a8 100%);
              border-radius: 8px;
            }

            .buy {
              width: 95px;
              height: 52px;
              background: linear-gradient(140deg, #a3a5f9 0%, #504ff5 100%);
              border-radius: 8px;
            }
          }
        }
      }
    }
  }

</style>
