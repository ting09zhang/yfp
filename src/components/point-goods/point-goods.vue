<template>
  <div>

    <div class="shopping">
      <div class="shoppingtitle">
        <span>{{ title }}</span>
      </div>
      <div class="shoppingicon" v-if="showMore">
        <div class="andmore" @click="goMore">查看更多</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <!--图片区域  -->
    <div class="contentimg" v-for="(item, index) in pointGoodList" :key="index" @click="godetails(item)">
      <div class="leftimgbox">
        <img :src="item.goods_image" mode="" />
      </div>
      <div class="rightimgbox">
        <div class="righttop">
          <div class="righttoptext">
            <div class="text">{{ item.goods_name }}</div>
          </div>
          <div class="righttoptexttop">
            <span>{{ item.goods_sales }}次已兑换</span>
          </div>
        </div>
        <div class="rightbottom">
          <div class="rightbottomleft">
            <div class="rightbottomlefttop">
              <span>¥ {{ item.goods_price }}元+{{
                  item.selling_integral
                }}积分</span>
            </div>
            <div class="rightbottomleftbottom">
              <span>原价¥</span>
              <span class="linepr">{{ item.line_price }}元</span>
            </div>
          </div>
          <div class="rightbottomright">
            <!-- <button type="default">兑换</button> -->
            <span type="button"  class="span">兑换</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'point-goods',
    props: {
      pointGoodList: {
        type: Array,
        default: () => [],
      },
      title: {
        type: String,
      },
      showMore: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        loading: false,
        finished: false,
      }
    },
    methods: {
      goMore() {
        this.$router.push('/point-shop')
      },
      godetails(item) {
        if (this.token) {
          this.$router.push(`/point_details?id=${item.goods_id}`)
        } else {
          this.$toast('请先登录!')
         window.open('http://shop.98chihuo.com/getcode.php')
        }
      },
    },
    computed: {
      ...mapGetters(['token']),
    },
  }

</script>

<style lang="less">
  .shopping {
    display: flex;
    justify-content: space-between;
    margin: 30px 20px;

    .shoppingtitle {
      width: 250px;
      height: 36px;
      font-size: 28px;
      // font-weight: 600;
      color: #000;
      line-height: 36px;
    }

    .shoppingicon {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      font-size: 24px;
      color: #979797;

      .andmore {
        display: inline-block;
      }

      .van-icon {
        font-size: 30px;
      }
    }
  }

  .contentimg {
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    width: 702px;
    height: 200px;
    background: #ffffff;
    border-radius: 16px;
  }

  .leftimgbox {
    width: 200px;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
  }

  .rightimgbox {
    width: 488px;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;


    .righttoptext {
      margin-top: 8px;
      // width: 439px;
      height: 36px;
      font-size: 30px;
      font-weight: 600;
      color: #2d2f33;
      line-height: 36px;

      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .righttoptexttop {
      // width: 153px;
      height: 33px;
      font-size: 24px;
      font-weight: 600;
      color: #666666;
      line-height: 33px;
      margin-top: 10px;
    }
  }

  .rightbottom {
    display: flex;
    height: auto;
    justify-content: space-between;
    margin-top: 30px;

    .rightbottomleft {
      // width: 223px;
      font-size: 24px;
      font-weight: 500;
      color: #ff0202;
      line-height: 36px;
    }

    .rightbottomleftbottom {
      // width: 105px;
      height: 32px;
      font-size: 22px;

      font-weight: 500;
      color: #999999;
      line-height: 32px;
    }

    .linepr {
      text-decoration: line-through;
    }
  }

  .rightbottomright {
    width: 120px;
    height: 50%;
    background: #ffa727;
    border-radius: 25px;
    text-align: center;
    padding: 10px 0;
    .span {
      width: 52px;
      font-size: 24px;
      // text-align: center;
      font-weight: 600;
      color: #ffffff;
    }
  }

  .rightbottomlefttop {
    font-size: 26px;
    font-weight: 700;
    color: #ff0202;
  }

</style>
