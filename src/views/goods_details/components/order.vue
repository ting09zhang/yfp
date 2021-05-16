<template>
  <div class="container">
    <van-nav-bar title="确定订单" left-arrow @click-left="onClickLeft" />
    <van-cell class="adress" @click="$router.push('/adressList')">
      <template #title>
        <div class="left-flex">
          <van-icon name="location-o" color="#ffa727" size="24" />
          <div class="flex-right">
            <div>
              {{ adressList.name }} <span> {{ adressList.phone }}</span>
            </div>
            <p>{{ adressList.address }}</p>
          </div>
        </div>
      </template>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="arrow" class="search-icon" size="24" />
      </template>
    </van-cell>

    <van-card
      class="good"
      :num="detailList.goods_num"
      :price="detailList.spec_price"
      :title="detailList.goods_name"
      :thumb="detailList.image.file_path"
    />

    <div class="card-order">
      <div class="card-flex">
        <div>商品总额</div>
        <p>￥{{ detailList.spec_price*detailList.goods_num }}</p>
      </div>
      <div class="card-flex">
        <div>邮费</div>
        <p>包邮</p>
      </div>
      <van-divider />
      <div class="card-flex" v-if="detailList.regimental_subsidy">
        <div>团长开团补贴奖</div>
        <p>¥{{ detailList.regimental_subsidy }}</p>
      </div>
      <div class="card-flex">
        <div>参拼补贴奖</div>
        <p>¥{{ detailList.join_subsidy }}</p>
      </div>
      <div class="card-flex">
        <div>期团奖</div>
        <p>¥{{ detailList.qigroup_subsidy }}</p>
      </div>
      <div class="card-flex">
        <div>分值奖</div>
        <p>¥{{ detailList.score_subsidy }}</p>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="submit">
      <div class="price">
        <p>
          实付金额<span>￥{{ detailList.spec_price*detailList.goods_num }}</span>
        </p>
      </div>
      <div class="submitBtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAdressList } from '@/api/address.js'
export default {
  name: '',
  data() {
    return {
      detailList: {},
      adressList: '',
      adress: [],
      defaultId: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    submitOrder() {
      if (!this.adressList) { 
        this.$toast('请选择收货地址!')
        this.$router.push('/adressList')
        return
      }
      this.$router.push({
        path: `/order_detail`,
        query: this.detailList
      })
    },
    getAdressLists() {
      getAdressList({ token: this.token }).then(res => {
        res.data.list.forEach(item => {
          item.addressDetail = item.detail
          item.tel = item.phone
          item.address =
            item.region.province + item.region.city + item.region.region
          item.id = item.address_id
          if (item.address_id == this.chosenAddressId) {
            item.isDefault = true
          }
        })
        this.adress = res.data.list
        this.defaultId = res.data.default_id
        this.adress.forEach(item => {
          if (this.defaultId == item.address_id) {
            this.adressList = item
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.detailList = this.$route.query
    console.log(this.detailList.image.file_path);
    this.getAdressLists()
  }
}
</script>
<style lang="less" scoped>
.container {
  background: #f3f4f6;
  .adress {
    width: 702px;
    display: flex;
    border-radius: 12px;
    align-items: center;
    margin: 20px auto;
  }
  .left-flex {
    display: flex;
    align-items: center;
    .flex-right {
      margin-left: 12px;
      div {
        font-size: 32px;
        font-weight: 500;
        color: #000000;
        span {
          font-size: 28px;
          font-weight: 500;
          color: #999999;
          line-height: 28px;
        }
      }
      p {
        font-size: 24px;
        font-weight: 500;
        color: #666666;
      }
    }
  }
  .good {
    width: 702px;
    border-radius: 12px;
    background: #fff;
    margin: 0 auto;
    .van-card__title {
      font-size: 30px;
      font-weight: 600;
      color: #2d2f33;
    }
    .van-card__desc {
      color: #999;
    }
    .van-card__price,
    .van-card__price-integer {
      height: 36px;
      font-size: 36px;
      font-weight: 500;
      color: #fe4343;
      line-height: 36px;
    }
  }
  .card-order {
    width: 702px;
    height: 409px;
    background: #ffffff;
    border-radius: 12px;
    margin: 20px auto;
    padding: 30px 0;
    .card-flex {
      width: 662px;
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 35px 20px;
      &:nth-child(1) {
        margin-top: 10px;
      }
      div {
        font-size: 24px;
        font-weight: 500;
        color: #999999;
      }
      p {
        font-size: 24px;
        font-weight: 500;
        color: #000000;
      }
    }
  }
  .submit {
    position: fixed;
    left: 0;
    bottom: 0px;
    width: 750px;
    height: 98px;
    background: #ffffff;
    padding: 0 20px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .price {
      width: 250px;
      p {
        font-size: 22px;
        font-weight: 500;
        color: #999999;
        span {
          font-size: 26px;
          font-weight: 600;
          color: #ff0202;
          margin-left: 15px;
        }
      }
    }
    .submitBtn {
      width: 300px;
      height: 65px;
      line-height: 65px;
      background: #ffbb40;
      border-radius: 40px;
      color: #fff;
      font-size: 32px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
