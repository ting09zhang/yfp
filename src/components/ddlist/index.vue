<!--
 * @Author: 导航组件
 * @Date: 2021-04-24 11:33:38
 * @LastEditTime: 2021-04-24 14:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\components\navbar_f\index.vue
-->
<template>
  <div>
    <div v-for="(item,index) in list" :key="index" :title="item">
      <template>
        <van-cell-group>
          <van-cell :title="item.order_no" :value="item.state_text" :label="'下单时间' + item.create_time" />
        </van-cell-group>
        <van-card price="2.00">
          <template #thumb>
            <div class="zhaopian">
              <img :src="item.goods[0].image_path" />
            </div>
          </template>
          <template #title>
            <span class="mingchengbao">{{ item.goods[0].goods_name }}</span>
          </template>
          <template #tags>
            <!-- <van-tag plain type="danger" class="shirentuas">10人团</van-tag> -->
          </template>
          <template #num>
            <div>×{{ item.goods[0].total_num }}</div>
          </template>
          <template #footer>
            <div class="hejijiage">
              <span class="hejiss">
                <!-- 合计:￥{{ item.total_price }} -->
              </span>
              <span class="jiagesdf">支付:￥{{ item.pay_price }}</span>
            </div>
            <van-button size="mini" class="qiuxiaodingdas" v-if="item.state_text == '待付款' || item.state_text == '待发货'"
              @click="cancel(item)">取消订单</van-button>
            <van-button size="mini" class="qiuxiaodingdas" v-if="item.state_text == '已完成'" @click="success(item)">
              完成订单
            </van-button>
            <!-- <van-button size="mini" class="quzhifu">去支付</van-button> -->
          </template>
        </van-card>
      </template>
    </div>
  </div>
</template>
<script>
  import {
    cancelOrderList,
    successOrderList
  } from '@/api/order.js'
  import { Dialog } from 'vant';
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    components: {},
    props: {
      list: {
        type: Array,
        default: () => []
      },
      type: String
    },
    data() {
      return {
        loading: false,
        listData: []
      }
    },
    created() {},
    mounted() {},
    computed: {
      ...mapGetters(['token'])
    },
    watch: {
      list: {
        handler(newVal) {
          this.listData = newVal
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      cancel(item) {
        let _this = this
        Dialog.confirm({
         title: '提示',
          message: '是否确定取消订单?',
          beforeClose,
        });

        function beforeClose(action, done) {
          if (action === 'confirm') {
            cancelOrderList({
              token: _this.token,
              order_id: item.order_id
            }).then(res => {
              if (res.code == 1) {
                _this.$toast.success('取消成功')
                done()
              } else {
                _this.$toast.fail(res.msg)
              }
            })
          } else {
            done()
          }
        }
      },
      success(item) {
        let _this = this

        function beforeClose(action, done) {
          if (action === 'confirm') {
            successOrderList({
              token: _this.token,
              order_id: item.order_id
            }).then(res => {
              if (res.code == 1) {
                _this.$toast.success('取消成功')
                done()
              } else {
                _this.$toast.fail(res.msg)
              }
            })
          } else {
            done()
          }
        }

        Dialog.confirm({
          title: '提示',
          message: '是否确定取消订单?',
          beforeClose
        })
      }
    }
  }

</script>
<style scoped lang="less">
  .navbar {
    height: 88px;

    .van-card {
      margin-top: 0;

    }

    .van-card__content {
      padding-left: 15px;
    }

    .van-cell__value {
      color: red;
      font-size: 28px;
      font-weight: 500;
    }

    .shirentuas {
      margin: 10px;
    }

    .shirentuas {
      font-weight: 500;
      color: #f0657e;
      font-size: 24px;
      line-height: 33px;
    }

    .mingchengbao {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      font-size: 32px;
      font-weight: 600;
      margin-left: 5px;
    }

    .van-card__num {
      margin-right: 350px;
    }

    .van-button--default {
      margin-top: 40px;
    }

    .hejijiage {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .hejiss {
      font-size: 24px;
      color: #999999;
      margin-right: 5px;
    }

    .jiagesdf {
      font-size: 22px;
      font-weight: 500;
      color: #000000;
    }

    .quzhifu {
      font-size: 28px;
      color: #ffffff;
      border-radius: 8px;
      font-weight: 500;
      background-color: red;
      margin-left: 20px;
    }

    .qiuxiaodingdas {
      color: #666666;
      border-radius: 8px;
      font-size: 28px;
      border: 1px solid #999999;
    }

    .zhaopian img {
      width: 194px;
      height: 194px;
    }

    .van-card__price {
      margin-left: 8px;
    }
  }

  .van-nav-bar {
    /deep/ .van-nav-bar__title {
      line-height: 46px;
      font-size: 26px;
      font-weight: 550;
    }

    /deep/ .van-icon-arrow-left {
      color: #7a7a7a;
    }
  }

</style>
