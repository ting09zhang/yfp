<template>
  <div class="Spell_groupitem">
    <!-- 期团明细导航栏 -->
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="我的拼团">
      <template #right>
        <van-icon name="share" size="32" />
      </template>
    </van-nav-bar>
    <!-- 期团明细导航栏 -->

    <!-- 组团Tab标签页 -->
    <van-tabs
      v-model="activeIndex"
      swipeable
      title-active-color="#000000"
      title-inactive-color="#999999"
      @click="handler"
    >
      <!-- 进行中 -->
      <van-tab title="组团中" title-class="zutua" class="quayan">
        <!-- list列表 -->
        <!-- list列表内容 -->
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list
            v-model="isLoading"
            :finished="finished"
            :offset="1"
            :immediate-check="false"
            finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载"
            @load="onload"
          >
            <div v-for="(item, index) in list" :key="index">
              <van-cell class="neidan">
                <template #title>
                  <div>{{ item.order_no }}</div>
                </template>
                <template>
                  <div>{{ item.active_status.text }}</div>
                </template>
              </van-cell>
              <!-- 商品卡片 -->
              <van-card
                class="card_shang"
                :price="item.goods_price"
                :num="item.total_num"
                :thumb="item.goods_img"
              >
                <template #title>
                  <div class="title">{{ item.goods_name }}</div>
                </template>
                <template #tags>
                  <div plain class="qt">{{ item.people }}人团</div>
                </template>

                <template #footer>
                  <div>
                    <div class="num">
                      <div class="sum">
                        合计: <span>￥{{ item.total_price }}</span>
                      </div>
                      <div class="creaTime">
                        <span>{{ item.create_time }}</span>
                      </div>
                    </div>
                    <div>
                      <van-button
                        size="mini"
                        @click="
                          $router.push({
                            path: '/detailss',
                            query: {
                              id: item.active_id
                            }
                          })
                        "
                        >查看拼团详情</van-button
                      >
                    </div>
                  </div>
                </template>
              </van-card>
              <!-- 商品卡片 -->
            </div>
          </van-list>
        </van-pull-refresh>
        <!-- list列表内容 -->
        <!-- list列表拼团下面的内容 -->
      </van-tab>

      <!-- 成功 -->
      <van-tab title="组团成功">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list
            v-model="isLoading"
            :finished="finished"
            :offset="1"
            :immediate-check="false"
            finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载"
            @load="onload"
          >
            <div v-for="(item, index) in list" :key="index">
              <van-cell class="neidan">
                <template #title>
                  <div>{{ item.order_no }}</div>
                </template>
                <template>
                  <div>{{ item.active_status.text }}</div>
                </template>
              </van-cell>
              <!-- 商品卡片 -->
              <van-card
                class="card_shang"
                :price="item.goods_price"
                :thumb="item.goods_img"
              >
                <template #title>
                  <div class="title">{{ item.goods_name }}</div>
                </template>
                <template #tags>
                  <div plain class="qt">{{ item.people }}人团</div>
                </template>

                <template #footer>
                  <div class="num">
                    <div class="sum">
                      合计: <span>￥{{ item.total_price }}</span>
                    </div>
                    <van-button
                      size="mini"
                      @click="
                        $router.push({
                          path: '/detailss',
                          query: {
                            id: item.active_id
                          }
                        })
                      "
                      >查看拼团详情</van-button
                    >
                  </div>
                </template>
              </van-card>
              <!-- 商品卡片 -->
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>

      <!-- 失败 -->
      <van-tab title="组团失败">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list
            v-model="isLoading"
            :finished="finished"
            :offset="1"
            :immediate-check="false"
            finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载"
            @load="onload"
          >
            <div v-for="(item, index) in list" :key="index">
              <van-cell class="neidan">
                <template #title>
                  <div>{{ item.order_no }}</div>
                </template>
                <template>
                  <div>{{ item.active_status.text }}</div>
                </template>
              </van-cell>
              <!-- 商品卡片 -->
              <van-card
                class="card_shang"
                :price="item.goods_price"
                :thumb="item.goods_img"
              >
                <template #title>
                  <div class="title">{{ item.goods_name }}</div>
                </template>
                <template #tags>
                  <div plain class="qt">{{ item.people }}人团</div>
                </template>
                <template #num>
                  <div>x{{ item.total_num }}</div>
                </template>
                <template #footer>
                  <div class="num">
                    <div class="sum">
                      合计: <span>￥{{ item.total_price }}</span>
                    </div>
                    <van-button
                      size="mini"
                      @click="
                        $router.push({
                          path: '/detailss',
                          query: {
                            id: item.active_id
                          }
                        })
                      "
                      >查看拼团详情</van-button
                    >
                  </div>
                </template>
              </van-card>
              <!-- 商品卡片 -->
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 组团Tab标签页 -->
  </div>
</template>

<script>
import { getbooking } from '@/api/my'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      list: [], // 失败
      isLoading: true,
      loading: false, //  控制加载的loading的状态
      finished: false, // 控制数据加载结束的状态
      page: 1,
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    // 2失败     0// 进行中     1// 成功
    async getList() {
      this.isLoading = true
      const res = await getbooking({
        token: this.token,
        page: this.page,
        ty: this.activeIndex
      })
      if (res.code) {
        res.data.map(item => {
          item.goods_price = item.goods_price.toFixed(2)
          this.list.push(item)
        })
        if (res.data.length < 10) {
          this.finished = true
        }
        this.isLoading = false
        this.loading = false
        this.page++
      }
    },
    handler(i) {
      this.activeIndex = i
      this.list = []
      this.onfresh()
    },
    onload() {
      this.getList()
    },
    onfresh() {
      this.page = 1
      this.list = []
      this.finished = false
      this.getList()
    }
  }
}
</script>
<style lang="less" scoped>
.Spell_groupitem {
  .zutua {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 32px;
  }

  .quayan {
    background: #f3f4f6;
  }
}

.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  font-size: 30px;
  color: #333;
}

.sum {
  margin-bottom: 10px;

  span {
    font-size: 32px;
    font-weight: 550;
    color: #000000;
  }
}

.creaTime {
  font-size: 20px;
  color: #999;
}

.qt {
  width: 76px;
  padding: 3px 8px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid #f0657e;
  color: #f0657e;
  text-align: center;
}

.van-card__num {
  text-align: right;
}

.van-card__thumb {
  width: 194px;
  height: 194px;
}

.num {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}
.van-card__footer > div {
  padding-top: 5px;
}
.van-button--default {
  border: 1px solid #999;
}

.van-cell__value {
  font-size: 28px;
  font-weight: 500;
  color: #fd1b1b;
}

.van-cell__title {
  font-size: 28px;
  font-weight: 500;
  color: #000000;
}

.neidan {
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;

  van-cell {
    margin-right: 10px;
  }
}

.card_shang {
  background: #000;
  border-radius: 16px;
  margin: 0 auto;
  width: 95%;
}

.card_shang {
  background: #ffffff;
}

.buyqt {
  width: 154px;
  height: 56px;
  border-radius: 27px;
  margin-top: 10px;
  border: 1px solid #666666;
  text-align: center;
  color: #666666;
  line-height: 56px;
}

.buyqt {
  border: 1px solid #fd1b1b;
  color: #fd1b1b;
}
</style>
