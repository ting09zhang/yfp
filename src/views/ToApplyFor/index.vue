<template>
  <div class="container">
    <!-- 申请团长 -->
    <!-- <div class="tuanzhang"> -->
    <van-nav-bar left-arrow title="申请团长" @click-left="onClickLeft">
      <template #right>
        <van-icon name="share" size="32" />
      </template>
    </van-nav-bar>
    <!-- </div> -->
    <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div>
    <!--图片  -->
    <div class="tupian">
      <img src="../../assets/tuanzhang.png" alt="" />
    </div>
    <!--文字  -->
    <div class="textbox">
      <div class="textboxleft">
        <div @click="edit(editDetail[0].group_id)">
          <p
            class="onetext"
            :class="[defaultId == editDetail[0].group_id ? 'start' : '']"
          >
            {{ editDetail[0].name }}升级
          </p>
          <p class="two">购买{{ editDetail[0].amount }}元商品赠一级团长</p>
          <p class="four" v-if="defaultId == editDetail[0].group_id">
            <img src="../../assets/矩形备份 2.png" alt="" />
          </p>
          <p class="five" v-else></p>
        </div>
      </div>
      <div class="textboxright">
        <div @click="edit(editDetail[1].group_id)">
          <p
            class="onetext"
            :class="[defaultId == editDetail[1].group_id ? 'start' : '']"
          >
            {{ editDetail[1].name }}升级
          </p>
          <p class="two">购买{{ editDetail[1].amount }}元商品赠二级团长</p>
          <p class="four" v-if="defaultId == editDetail[1].group_id">
            <img src="../../assets/矩形备份 2.png" alt="" />
          </p>
          <p class="five" v-else></p>
        </div>
      </div>
    </div>
    <!-- 图片 -->
    <div class="liquor" v-for="item in goodsDetails" :key="item.goods_id">
      <div class="liquorleft">
        <img :src="item.goods_image" alt="" />
      </div>
      <div class="liquorright">
        <p class="treasure">{{ item.goods_name }}</p>
        <p class="price">{{ item.goods_sales }}人已购买升级</p>
        <div class="myprice">
          <p class="line_price">原价：￥{{ item.line_price }}</p>
          <p class="good_price">现价：￥{{ item.goods_price }}</p>
        </div>
      </div>
      <div></div>
    </div>
    <!-- 文字区域 -->
    <div class="explain">
      <p class="upgrade">升级说明</p>
      <p class="redpacket">
        升级一级团长，每次开团享有该团总额度2.5%的额外现金红包补贴
      </p>
    </div>
    <div class="btn" @click="leavl">
      {{ defaultId == 4 ? '立即升一星团长' : '立即升二星团长' }}
    </div>
  </div>
</template>

<script>
import { detailGroup, detailGoodsByGroupId } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      editDetail: [
        {
          name: ''
        },
        {
          name: ''
        }
      ],
      goodsDetails: [],
      defaultId: 4
    }
  },
  created() {
    this.getDetailEdit()
    if (this.userInfo.group_id == 0) {
      this.defaultId = 4
    } else if (this.userInfo.group_id == 4) {
      this.defaultId = 5
    } else {
      this.defaultId = 5
    }
    this.edit(this.defaultId)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    getDetailEdit() {
      detailGroup({
        token: this.token
      }).then(res => {
        this.editDetail = res.data
      })
    },
    edit(id) {
      this.defaultId = id
      detailGoodsByGroupId({
        group_id: id
      }).then(res => {
        if (res.code == 1) {
          this.goodsDetails = res.data
        }
      })
    },
    leavl() {
      if (this.userInfo.group_id > this.defaultId) {
        this.$dialog
          .alert({
            message: '当前团长等级高于要升级的团长等级',
            theme: 'round-button'
          })
          .then(() => {
            this.defaultId = 5
          })
      } else {
        var goods_name
        if (this.defaultId == '4') {
          goods_name = '一级团长'
        } else if (this.defaultId == '5') {
          goods_name = '二级团长'
        } else {
          goods_name = '一级团长'
        }
        console.log(this.goodsDetails)
        this.$router.push({
          path: '/order_detail',
          query: {
            goods_id: this.goodsDetails[0].goods_id,
            goods_name,
            interest_price: this.goodsDetails[0].goods_price,
            type: 'level',
            goods_sku_id: 1,
            goods_num: 1
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  position: relative;
  font-size: 14px;
  height: 100%;
}

.bgBox {
  width: 100%;
  height: 464px;
  position: absolute;
  left: 0;
  top: 0;

  .bgTop {
    width: 100%;
    height: 300px;
    background: linear-gradient(180deg, #ffbc2a 0%, #ff7f2a 100%);
    z-index: 999;
  }

  .bgBom {
    width: 100%;
    height: 50px;
    background-color: #fd6117;
    border-radius: 0 0 50% 50%;
    border-top: none;
  }
}

.van-nav-bar {
  background-color: #ffbc2a;
}

/deep/ .van-nav-bar__title {
  font-size: 28px;
  color: #fff;
  background-color: #ffbc2a;
}

.tuanzhang /deep/ .van-icon {
  font-size: 28px;
  color: #fff;
  width: 48px;
  height: 48px;
  background-color: #ffbc2a;
}

.tupian {
  position: relative;
  top: 80px;
  left: 22px;
  right: 20px;
  width: 702px;
  height: 300px;
  // border: 1px solid red;
}

.tupian img {
  width: 100%;
  height: 100%;
}

.textbox {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: 120px 25px 25px 25px;

  .textboxleft,
  .textboxright {
    width: 50%;
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  // .textboxright::after{
  //   content:"" ;
  // }
}

.onetext {
  font-size: 28px;
  height: 28px;
  color: #3f3f3f;
}

.two {
  font-size: 20px;
  margin-top: 10px;
  color: #999999;
  text-align: center;
  word-break: keep-all;
  white-space: nowrap;
}

.four {
  width: 30px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 10px;
  }
}
.five {
  height: 29.5px;
}

.start {
  font-weight: 450;
  // font-size: 30px;
  color: #000;
}

.shopping {
  font-size: 28px;
  margin-top: 5px;
  color: #999999;
}

.liquor {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  width: 702px;
  height: 234px;
  margin: 25px;

  .liquorleft {
    display: flex;
    margin: 20px 10px 20px;
    width: 194px;
    height: 194px;
    align-content: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .liquorright {
    height: 180px;
    width: 430px;
    margin: 20px 20px 20px 10px;

    .treasure {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      font-size: 30px;
      color: #2d2f33;
    }

    .price {
      font-size: 24px;
      color: #ffa727;
      border: 1px solid #ffa727;
      width: 220px;
      text-align: center;
      margin-top: 10px;
    }
    .myprice {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .line_price {
      margin-top: 60px;
      font-size: 20px;
      color: #999999;
      text-decoration: line-through;
    }
    .good_price {
      margin-top: 60px;
      font-size: 24px;
      color: crimson;
    }
  }
}

.explain {
  background-color: #fff;
  margin: 20px;
  width: 702px;
  height: 227px;

  .upgrade {
    display: inline-block;
    font-size: 30px;
    width: 142px;
    height: 45px;
    margin: 24px 562px 50px 20px;
    font-weight: 550;
  }

  .redpacket {
    display: inline-block;
    width: 657px;
    height: 80px;
    font-size: 28px;
    color: #666666;
    margin: -30px 25px 61px 20px;
  }
}

.btn {
  width: 702px;
  height: 80px;
  background: #ffbb40;
  border-radius: 45px;
  line-height: 80px;
  color: #fff;
  text-align: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  bottom: 15px;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
</style>
