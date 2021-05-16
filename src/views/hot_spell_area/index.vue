<template>
  <div class="container">
    <van-nav-bar :title="title " left-arrow @click-left="onClickLeft" class="hot_spell_nav" />
    <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div>
    <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="暂无"
      v-if="!topList.length && !bomList.length" />
    <div class="shopList" v-if="topList.length">
      <div class="title">精选热拼商品</div>
      <div class="scroll">
        <ul ref="cont" id="cont">
          <li v-for="item in topList" :key="item.goods_id">
            <img :src="item.goods_image" alt="" />
            <p>{{ item.goods_name}}</p>
            <div>
              <span>￥{{ item.interest_price }}</span>
              <i>￥{{ item.line_price }}</i>
              <button @click="gocantuan(item.goods_id)">参团</button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <van-pull-refresh v-model="isLoading" @refresh="onfresh">
      <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
        error-text="请求失败，点击重新加载" @load="onload">
        <div class="shop-item" v-for="(item, index) in bomList" :key="index">
          <img :src="item.goods_image" alt="" />
          <div class="flex-rightBox">
            <div class="right-top">
              <div>{{ item.goods_name }}</div>
              <p>
                火爆热拼中 <span>已拼{{ item.sales_actual }}次</span>
              </p>
            </div>
            <div class="right-bottom">
              <div class="bottom-left">
                <p>拼团价 ￥<span>{{item.interest_price}}</span></p>
                <div>还差{{ item.surplus_people }}人成团</div>
              </div>
              <div class="bottom-right">
                <button class="goBtn" @click="goKaituan(item)">去开团</button>
                <button class="buyBtn" @click="goGroup(item)">买期团</button>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    getHotSpellTop
  } from '@/api/cate'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    data() {
      return {
        title: '',
        topList: [],
        bomList: [],
        query: {
          limit: '10',
          page: '1'
        },
        finished: false,
        isloading: false,
        isSearch: false,
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      getHotSpellTopList(data) {
        getHotSpellTop(data).then(res => {
          this.topList = res.data.list.map(item => {
            item.interest_price = Number(item.interest_price).toFixed(0)
            item.line_price = Number(item.line_price).toFixed(0)
            return item
          })
          if (res.code) {
            setTimeout(() => {
              document.getElementById("cont").style.width = this.topList.length * 3.2 + 'rem'
            })
          }
        })
      },
      getList() {
        this.isLoading = true
        getHotSpellTop({
          cid: this.$route.query.id,
          ...this.query
        }).then(res => {
          if (res.code == 1) {
            res.data.list.map(item => {
              this.bomList.push(item)
              return item
            })
            if (res.data.list.length < 10) {
              this.finished = true
            } else {
              this.finished = false
            }
            this.page++
          }
          this.isLoading = false
        })
      },
      onload() {
        this.getList()
        console.log("onload")
      },
      onfresh() {
        this.page = 1
        this.bomList = []
        this.finished = false
        console.log("onfresh")
        this.getList()
      },
      gocantuan(id) {
        if (this.token) {
          this.$router.push(`/goods_details?id=${id}`)
        } else {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
        }
      },
      goKaituan(item) {
        if (this.token) {
          this.$router.push(`/goods_details?id=${item.goods_id}`)
        } else {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
        }
      },
      goGroup(item) {
        if (this.token) {
          this.$router.push(`/group?goods_id=${item.goods_id}`)
        } else if (this.userInfo.qigroup <= 0) {
          this.$dialog
            .alert({
              title: '提示',
              message: '你的期团值不足,赶快兑换吧'
            })
            .then(() => {
              // on close
            })
        } else {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
        }
      }
    },
    created() {
      this.title = this.$route.query.title
      this.getHotSpellTopList({
        top: '1',
        cid: this.$route.query.id
      })
      this.getList();
    }
  }

</script>

<style lang="less" scoped>
  .scroll {
    width: 710px;
    margin-top: 15px;
    overflow-y: hidden;
    overflow-x: scroll;
  }

  .container {
    position: relative;
    background: #f1f2f5;
  }

  ::-webkit-scrollbar {
    width: 0px;
    height: 0;
  }

  .hot_spell_nav {
    background: #ffb42a;
  }

  /deep/ .van-nav-bar .van-icon {
    color: #fff !important;
  }

  /deep/ .van-nav-bar__title {
    color: #fff;
  }

  .bgBox {
    width: 100%;
    height: 250px;
    position: absolute;
    left: 0;
    top: 0;

    .bgTop {
      width: 100%;
      height: 350px;
      background: #ffb42a;
    }

    .bgBom {
      width: 100%;
      height: 80px;
      background: #f1f2f5;
      border-radius: 50% 50% 0 0;
      border-top: none;
      position: absolute;
      left: 0;
      top: 270px;
    }
  }

  .shopList {
    position: relative;
    width: 710px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      line-height: 32px;
      margin-left: 5px;
    }

    ul {
      width: 710px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;

      li {
        width: 220px;
        background: #ffffff;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 15px;
        margin: 0 10px;
        box-sizing: border-box;

        img {
          width: 225px;
          height: 225px;
          border-radius: 12px 12px 0 0;
        }

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          margin: 5px;
          text-align: left;
          font-size: 22px;
          font-weight: 500;
          color: #2d2f33;
        }

        div {
          width: 95%;
          margin: 0 auto;
          height: 40px;
          background: linear-gradient(270deg, #f9e67e 0%, #fae77e 100%);
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          span {
            display: block;
            font-size: 24px;
            font-weight: 700;
            color: #ff2f3b;
          }

          i {
            display: block;
            font-size: 20px;
            font-weight: 500;
            color: #f9846e;
            text-decoration: line-through;
          }

          button {
            width: 66px;
            height: 100%;
            border: none;
            background-color: #fb4a5a;
            color: #fff;
            font-size: 20px;
            text-align: center;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }

  .shop-item {
    width: 702px;
    height: 234px;
    background: #ffffff;
    border-radius: 16px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-around;

    img {
      width: 196px;
      height: 194px;
      border-radius: 13px;
    }

    .flex-rightBox {
      width: 480px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .right-top {
        align-self: flex-start;

        div {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          font-size: 32px;
          font-weight: 600;
          color: #2d2f33;
        }

        p {
          font-size: 24px;
          font-weight: 600;
          color: #f0657e;

          span {
            font-size: 24px;
            font-weight: 600;
            color: #f0657e;
          }
        }
      }

      .right-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bottom-left {
          p {
            font-size: 22px;
            font-weight: 600;
            color: #fd1b1b;
          }

          div {
            font-size: 22px;
            font-weight: 600;
            color: #999999;
          }
        }

        .goBtn,
        .buyBtn {
          width: 95px;
          height: 52px;
          border-radius: 8px;
          text-align: center;
          color: #fff;
          border: none;
          font-size: 20px;
        }

        .goBtn {
          background: linear-gradient(218deg, #fdd366 0%, #ff942a 100%);
        }

        .buyBtn {
          margin-left: 5px;
          background: linear-gradient(140deg, #a3a5f9 0%, #504ff5 100%);
        }
      }
    }
  }

</style>
