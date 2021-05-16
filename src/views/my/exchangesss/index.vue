<template>
  <div class="exchangesss">
    <van-nav-bar
      :title="title"
      @click-left="$router.go(-1)"
      left-arrow
      class="biaoti"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="item in list" :key="item.id">
        <van-cell size="large">
          <template #title>
            <div>
              <span class="jeieijrr">订单号:</span>
              &nbsp;&nbsp;
              <span class="dinghu">{{ item.order_no }}</span>
            </div>
          </template>
          <template #right-icon>
            <div class="daifahou">{{ item.state_text }}</div>
          </template>
        </van-cell>
        <van-card>
          <template #thumb>
            <div class="zhaopian">
              <img :src="item.goods[0].image_path" alt="" />
            </div>
          </template>
          <template #title>
            <span class="mingchengbao">{{ item.goods[0].goods_name }}</span>
          </template>
          <template #price>
            <div>
              <span>¥ {{ item.total_price }}元+</span>
              <span>{{ item.points_money }}积分</span>
            </div>
          </template>
          <template #tags>
            <van-tag plain type="danger" class="shirentuas">
              <span>共</span>
              <span>{{ item.goods[0].total_num }}</span>
              <span>件商品</span>
            </van-tag>
          </template>
          <template #footer>
            <div class="hejijiage">
              <span class="hejiss">{{ item.create_time }}</span>
            </div>
          </template>
        </van-card>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getrecords } from '@/api/my'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      title: '兑换记录',
      loading: false,
      finished: false,
      list: [],
      pay_status: {
        '10': '未付款',
        '20': '已付款'
      },
      delivery_status: {
        '10': '未发货',
        '20': '已发货'
      },
      receipt_status: {
        '10': '未收货',
        '20': '已收货'
      },
      order_status: {
        '10': '进行中',
        '20': '取消',
        '21': '待取消',
        '30': '已完成'
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  created() {
    this.Forrecord()
  },
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    async Forrecord() {
      this.loading = true
      const { data } = await getrecords({
        page: 1,
        token: this.token
      })
      // console.log(data)
      this.list = data.data
      this.loading = false
      this.finished = true
    }
  }
}
</script>
<style lang="less">
.exchangesss {
  .van-icon-arrow-left {
    font-size: 48px;
    color: #ffffff;
    margin-top: 10px;
  }
  .van-ellipsis {
    color: #ffffff;
    margin-top: 5px;
    font-weight: 600;
  }
  #datasTableDiv table td {
    white-space: nowrap;
  }
  .van-cell__title {
    font-size: 22px;
    font-weight: 600;
    color: #000000;
  }
  .daifahou {
    width: 120px;
    height: 48px;
    background: #ffa727;
    font-size: 30px;
    color: #ffffff;
    border-radius: 20px 0 20px 0;
    line-height: 48px;
    text-align: center;
  }
  height: 88px;
  .van-card {
    margin-top: 0;
  }
  .van-cell__value {
    color: red;
    font-size: 28px;
    font-weight: 500;
  }
  .shirentuas {
    // margin: 10px;
    padding: 3px 5px;
    font-weight: 500;
    color: #666666;
    font-size: 24px;
  }
  .van-tag--plain {
    position: absolute;
    top: 30px;
    right: 345px;
    margin-top: 30px;
  }

  .van-tag--plain {
    border: opacity;
  }
  .mingchengbao {
    width: 340px;
    display: block;
    overflow: hidden;
    font-size: 32px;
    font-weight: 600;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    margin-left: 5px;
  }
  .van-button--default {
    margin-top: 40px;
  }
  .hejijiage {
    margin-top: -30px;
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
    margin-top: 60px;
  }
}
.biaoti {
  background: linear-gradient(180deg, #fea568 0%, #fd6117 100%);
}
</style>
