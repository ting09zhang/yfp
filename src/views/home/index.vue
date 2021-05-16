<template>
  <div class="container">
    <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div>
    <!-- 搜索框 -->
    <div style="width: 100%; position: inherit">
      <van-search v-model="search" placeholder="请输入搜索关键词" background="transparent" shape="round"
        @search="_getPointGoodList" />
    </div>

    <!-- 轮播图区域 -->
    <swiper-com :swiperList="swiperList"></swiper-com>

    <!-- 功能nav区域   兼容ios怪异问题-->
    <nav-scroll :navList="navList"></nav-scroll>

    <!-- 限时热拼区 -->
    <div class="xsrp" :style="{
        background:
          'url(' +
          hotSpellbanner.bg_img +
          ')  center center / 100% content-box content-box no-repeat',
      }">
      <span class="xsrp-title">{{ hotSpellbanner.pin_name }}</span>
      <div class="xrrp-content">
        <div class="xsrp-item" v-for="(item, index) in hotSpellbanner.cat" :key="index" @click="goHotSpell(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 今日热拼商品区域 -->
    <div class="now-hot-spell">
      <div class="now-hot">
        <span class="hot-shopping">今日热拼商品</span>
        <div class="icon">
          <div class="andmore" @click="goMoreRp">查看更多</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="scroll">
        <div class="scroll-item">
          <div class="photo" v-for="(item, index) in hotSpellGoodList" :key="index">
            <div class="boximagge">
              <img :src="item.goods_image" />
            </div>
            <span class="price">{{ item.goods_name }}</span>
            <div class="background">
              <div class="pintuan">
                <div class="pintuanprice">
                  拼团价¥{{ item.interest_price2 }}
                </div>
                <div class="cantuanprice">参拼补贴{{ item.subsidy2 }}元</div>
              </div>
              <div style="margin-left: 1px">
                <span class="gocantuan" @click="gocantuan(item)">去参团</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 积分兑换商品 -->
    <van-pull-refresh v-model="isLoading" @refresh="onfresh">
      <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
        error-text="请求失败，点击重新加载" @load="onload">
        <point-goods :pointGoodList="pointGoodList" :title="jifenTitle"></point-goods>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    getSwiperList,
    getHotSpellBanner,
    getHotSpellGoods,
    getPointGoods,
  } from '@/api/home.js'
  import swiperCom from '@/components/swiperCom/swiperCom.vue'
  import navScroll from './components/navBar/index.vue'
  import pointGoods from '@/components/point-goods/point-goods.vue'
  import {
    mapGetters
  } from 'vuex'
  export default {
    components: {
      swiperCom,
      navScroll,
      pointGoods,
    },
    data() {
      return {
        search: '',
        swiperList: [],
        navList: [{
            url: require('@/static/jifenduihuan.png'),
            title: '分值兑换',
          },
          {
            url: require('@/static/jifenshangcheng.png'),
            title: '积分商城',
          },
          {
            url: require('@/static/shengqingdaili.png'),
            title: '申请代理',
          },
          {
            url: require('@/static/shengqingtuanzhang.png'),
            title: '申请团长',
          },
        ],
        hotSpellbanner: {},
        // 热拼商品列表
        hotSpellGoodList: [],
        // 积分兑换商品列表
        pointGoodList: [],
        jifenTitle: '积分兑换商品',
        page: 1,
        isLoading: true,
        finished: false,
        loading: false,
        isSearch: false,
        searchOld: '',
      }
    },
    watch: {
      pointGoodList: (val) => {
        console.log(val)
      },
    },
    methods: {
      // 搜索
      goSearch() {},
      // 获取轮播图数据
      async _getSwiperList() {
        const data = await getSwiperList()
        if (data.code == 1) {
          this.swiperList = data.data
        }
      },
      // 获取首页配置
      async _getHotSpellBanner() {
        const data = await getHotSpellBanner()
        if (data.code == 1) {
          this.hotSpellbanner = data.data
        }
      },
      // 获取热拼商品列表
      async _getHotSpellGoods() {
        const data = await getHotSpellGoods({
          ty: 1,
        })
        // console.log(data)
        this.hotSpellGoodList = data.data.list.map((item) => {
          item.subsidy2 = Number(item.subsidy).toFixed(0)
          item.interest_price2 = Number(item.interest_price).toFixed(0)
          return item
        })
        console.log(this.hotSpellGoodList)
      },
      // 获取积分兑换商品列表
      async _getPointGoodList(val) {
        if (this.searchOld != val) {
          this.page = 1
          this.isSearch = true
          this.searchOld = val
          this.pointGoodList = []
        }
        if (val && !this.isSearch) {
          this.page = 1
          this.isSearch = true
          this.searchOld = val
          this.pointGoodList = []
        } else {
          this.isSearch = false
        }
        const data = await getPointGoods({
          h: '1',
          page: this.page,
          search: val,
        })
        if (data.code == 1) {
          data.data.map((item) => {
            this.pointGoodList.push(item)
          })
          if (data.data.length < 10) {
            this.finished = true
          }
          this.isLoading = false
          this.loading = false
          this.page++
        }
        // console.log(this.pointGoodList.length);
      },
      onload() {
        this._getPointGoodList()
      },
      onfresh() {
        this.page = 1
        this.pointGoodList = []
        this.finished = false
        this._getPointGoodList()
      },
      // 前往今日热拼查看更多
      goMoreRp() {
        this.$router.push('/rp-more')
      },
      gocantuan(item) {
        if (!this.token) {
          this.$toast('请先登录!')
         window.open('http://shop.98chihuo.com/getcode.php')
        } else {
          this.$router.push(`/goods_details?id=${item.goods_id}`)
        }
      },
      // 前往限时热拼区
      goHotSpell(item) {
        this.$router.push(
          `/hot_spell_area?title=${item.name}&id=${item.category_id}`
        )
      },
    },
    computed: {
      ...mapGetters(['token']),
      flag() {
        return this.navList.length != 4
      },
    },
    created() {
      this._getSwiperList()
      this._getHotSpellBanner()
      this._getHotSpellGoods()
      this._getPointGoodList()
    },
  }

</script>

<style lang="less" scoped>
  .scroll {
    overflow-y: hidden;
    overflow-x: scroll;
    width: 100%;

    .scroll-item {
      display: flex;
      width: 100%;
    }
  }

  .container {
    width: 100%;
    position: relative;
    font-size: 14px;
    height: 100%;
  }

  .bgBox {
    width: 100%;
    height: 350px;
    position: absolute;
    left: 0;
    top: 0;

    .bgTop {
      width: 100%;
      height: 300px;
      background: linear-gradient(180deg, #fea568 100%, #fd6117 0%);
    }

    .bgBom {
      width: 100%;
      height: 50px;
      background-color: #fea568;
      border-radius: 0 0 50% 50%;
      border-top: none;
    }
  }

  .xsrp {
    width: 706px;
    height: 222px;
    background: #ffffff;
    border-radius: 16px;
    margin: 15px auto 32px;
    position: relative;

    .xsrp-title {
      position: absolute;
      left: 20px;
      top: 30px;
      z-index: 99;
      color: #fff;
      font-weight: 550;
      font-size: 32px;
    }

    .xrrp-content {
      width: 100%;
      height: 102px;
      position: absolute;
      left: 0;
      top: 90px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 999;

      .xsrp-item {
        width: 200px;
        height: 92px;
        border-radius: 20px;
        // border: 1px solid #fff;
        box-shadow: #f0f0f0 0 0 10px inset;
        color: #fff;
        font-weight: 450;
        font-size: 28px;
        text-align: center;
        line-height: 92px;
      }
    }
  }

  .now-hot-spell {
    width: 692px;
    background: #ffffff;
    border-radius: 16px;
    margin: 0 auto;
    padding: 15px;

    .now-hot {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: 10px;

      .hot-shopping {
        font-size: 28px;
        color: #000;
        margin-right: 5px;
      }

      .icon {
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

        i {
          font-size: 30px;
        }
      }
    }

    .photo {
      float: left;
      width: 225px;
      margin: 25px 3px 0;
      text-align: center;

      .boximagge {
        width: 225px;
        height: 210px;
        

        img {
          width: 225px;
          height: 210px;
          border-radius: 13px;
        }
      }
    }
  }

  .price {
    display: inline-block;
    width: 225px;
    margin-top: 20px;
    font-size: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    font-weight: 600;
    color: #2d2f33;
  }

  .background {
    position: relative;
    width: 225px;
    height: 78px;
    background: linear-gradient(270deg, #ff9a23 0%, #fecc34 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-top: 15px;

    >div:last-child {
      position: absolute;
      top: 0;
      right: 0;
      width: 80px;
      height: 0;
      line-height: 78px;
      width: 78px;
      text-align: center;
      border-bottom: 78px solid #feb92d;
      border-left: 20px solid transparent;
      border-top-right-radius: 10px;
    }

    .gocantuan {
      width: 60px;
      height: 30px;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      line-height: 30px;
    }

    .pintuan {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
    }

    .pintuanprice {
      width: 153px;
      height: 28px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      line-height: 28px;
    }

    .cantuanprice {
      width: 153px;
      height: 28px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      line-height: 28px;
    }
  }

</style>
