<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="积分商城">
      <template #right>
        <van-icon name="share" size="18" />
      </template>
    </van-nav-bar>
    <div class="bgBox">
      <div class="bg-top"></div>
      <div class="bg-bom"></div>
    </div>
    <div style="width: 100%; position: inherit">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" background="transparent" @search="_getAllPointGoodList" />
    </div>

    <!-- 轮播图区域 -->
    <swiper-com :swiperList="swiperList"></swiper-com>

    <div class="card">
      <div class="jifen">
        <img src="~@/static/jf.png" />
        <span>{{ userInfo.points }}</span>
      </div>
      <div class="history">
        <img src="~@/static/duihuan.png" />
        <span @click="point">兑换记录</span>
      </div>
    </div>

    <!-- 积分兑换 -->
    <van-pull-refresh v-model="isLoading" @refresh="onfresh">
      <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
        error-text="请求失败，点击重新加载" @load="onload">
        <point-goods :title="jifenTitle" :showMore="false" :pointGoodList="pointGoodList"></point-goods>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import swiperCom from '@/components/swiperCom/swiperCom.vue'
  import pointGoods from '@/components/point-goods/point-goods.vue'
  import {
    getSwiperList,
    getPointGoods
  } from '@/api/home.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    components: {
      swiperCom,
      pointGoods,
    },
    data() {
      return {
        swiperList: [],
        searchVal: '',
        jifenTitle: '热门推荐',
        pointGoodList: [],
        query: {
          page: 1,
          listRows: '10',
        },
        page: 1,
        isLoading: true,
        finished: false,
        loading: false,
        isSearch: false,
        searchOld: '',
      }
    },
    methods: {
      // 获取轮播图数据
      async _getSwiperList() {
        const data = await getSwiperList({
          type: '2',
        })
        if (data.code == 1) {
          this.swiperList = data.data
        }
      },
      async _getAllPointGoodList(val) {
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
          console.log(this.pointGoodList.length);
          if (data.data.length < 10) {
            this.finished = true
          }
          this.isLoading = false
          this.loading = false
          this.page++
        }
      },
      onload() {
        this._getAllPointGoodList()
      },
      onfresh() {
        this.page = 1
        this.pointGoodList = []
        this.finished = false
        this._getAllPointGoodList()
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      point() {
        if (this.token) {
          this.$router.push('/stockss?id=5')
        } else {
            window.open('http://shop.98chihuo.com/getcode.php')
          this.$toast('请先登录!')
        }

      },
    },
    created() {
      this._getSwiperList()
      this._getAllPointGoodList()
    },
    computed: {
      ...mapGetters(['token', 'userInfo']),
    },
  }

</script>

<style lang="less">
  .container {
    position: relative;
    font-size: 14px;
    height: 100%;
    background: linear-gradient(180deg, rgba(243, 244, 246, 0) 0%, #f3f4f6 100%);

    .bgBox {
      width: 100%;
      height: 380px;
      position: absolute;
      left: 0;
      top: 0;

      .bg-top {
        width: 100%;
        height: 330px;
        background: linear-gradient(180deg, #fea568 0%, #fd6117 100%);
      }

      .bg-bom {
        width: 100%;
        height: 50px;
        background-color: #fd6117;
        border-radius: 0 0 50% 50%;
      }
    }

    .card {
      width: 702px;
      height: 88px;
      background: #ffffff;
      border-radius: 8px;
      margin: 20px auto;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .jifen,
      .history {
        width: 200px;
        height: 48px;
        display: flex;
        align-items: center;

        img {
          width: 48px;
          height: 48px;
        }

        span {
          font-size: 24px;
          font-weight: 600;
          color: #3f3f3f;
          margin-left: 8px;
        }
      }
    }
  }

</style>
