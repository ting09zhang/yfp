<template>
  <div class="balances">
    <!-- 弧度背景 -->
    <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div>
    <!-- 导航栏 -->
    <van-nav-bar left-arrow>
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #title>
        <div class="wodetuadui">我的余额</div>
      </template>
      <template #right>
        <van-icon name="share" />
      </template>
    </van-nav-bar>
    <!-- 正方形背景 -->
    <div class="beijijian">
      <div class="beijizheng">
        <div class="zongzhi">总至仓(元)</div>
        <div class="jieryis">{{ user.balance }}</div>
        <van-button round type="info" size="small" class="diweihu" @click="$router.push('/transferss')">互转</van-button>
        <van-button round type="info" size="small" class="tixianannian" @click="$router.push('/deposit')">提现
        </van-button>
        <div class="bottomCon">
          <div class="zuixinyuan">
            <span class="jianyuanzui">最新收益(元):</span>
            <span>{{ user.new_income }}</span>
          </div>
          <div class="zuijuedingdui">
            <span class="jianyuanzui">累计收益(元):</span>
            <span>{{ user.lei_income }}</span>
          </div>
        </div>

        <!-- tab标签页 -->
        <van-tabs v-model="tagIndex" @click="handler">
          <van-tab title="收入明细">
            <van-pull-refresh v-model="isLoading" @refresh="onfresh">
              <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
                error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多了">
                <template>
                  <van-cell v-for="(item, index) in list" :key="index">
                    <template #title>
                      <div class="fengdui">
                        {{ item.describe }}
                      </div>
                    </template>
                    <template>
                      <div class="jiageye">
                        {{ item.money }}
                      </div>
                      <div class="qinshu">
                        <span>操作前余额</span>
                        <span>:{{ item.before_money }}</span>
                      </div>
                    </template>
                    <template #label>
                      <div>
                        {{ item.create_time }}
                      </div>
                    </template>
                  </van-cell>
                </template>
              </van-list>
            </van-pull-refresh>
          </van-tab>
          <van-tab title="支出明细">
            <van-pull-refresh v-model="isLoading" @refresh="onfresh">
              <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
                error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多了">
                <template>
                  <van-cell v-for="(item, index) in list" :key="index">
                    <template #title>
                      <div class="fengdui">
                        {{ item.describe }}
                      </div>
                    </template>
                    <template>
                      <div class="jiageye">
                        {{ item.money }}
                      </div>
                      <div class="qinshu">
                        <span>操作前余额</span>
                        <span>:{{ item.before_money }}</span>
                      </div>
                    </template>
                    <template #label>
                      <div>
                        {{ item.create_time }}
                      </div>
                    </template>
                  </van-cell>
                </template>
              </van-list>
            </van-pull-refresh>
          </van-tab>
          <van-tab title="提现明细">
            <van-pull-refresh v-model="isLoading" @refresh="onfresh">
              <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
                error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多">
                <template>
                  <van-cell v-for="(item, index) in list" :key="index">
                    <template #title>
                      <div class="fengdui">
                        {{ item.statusTxt }}
                      </div>
                    </template>
                    <template>
                      <div class="jiageye">提现金额: {{ item.money }}</div>
                      <div class="qinshu">
                        <span>操作前余额</span>
                        <span>:{{ item.before_money }}</span>
                      </div>
                    </template>
                    <template #label>
                      <div>
                        {{ item.time }}
                      </div>
                    </template>
                  </van-cell>
                </template>
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    balancetInfo,
    getWithDetails
  } from '@/api/balance.js'
  import {
    getUserInfo2
  } from '@/api/login.js'

  import {
    mapGetters
  } from 'vuex'
  import minxin from '@/minxin/minxin'

  export default {
    mixins: [minxin],
    name: '',
    components: {},
    props: {},
    data() {
      return {
        list: [],
        page: 1,
        tagIndex: 0,
        isLoading: true,
        finished: false,
        ty: 0,
        user: {}
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo']),
    },
    watch: {},
    created() {
      this.onfresh()
      this.getUserInfos()
      this.getUse();
    },
    mounted() {},
    methods: {
      getPointDetail(params) {
        this.isLoading = true
        balancetInfo({
          token: this.token,
          page: this.page,
          ty: this.ty,
        }).then((res) => {
          if (res.code) {
            res.data.map((item) => {
              this.list.push(item)
            })
            this.loading = false
            this.isLoading = false
            this.page++
            console.log(this.list.length)
            if (res.data.length < 10) {
              this.finished = true
            }
          }
        })
      },
      getmyWithDetails() {
        this.isLoading = true
        getWithDetails({
          token: this.token,
          page: this.page,
        }).then((res) => {
          if (res.code) {
            res.data.map((item) => {
              switch (item.status) {
                case "1":
                  item.statusTxt = '审核中'
                  break
                case "2":
                  item.statusTxt = '成功'
                  break
                case "3":
                  item.statusTxt = '审核驳回'
                  break
                default:
                  item.statusTxt = '未知错误'
              }
              this.list.push(item)
            })
            this.isLoading = false
            this.loading = false
            this.page++
            if (res.data.length < 10) {
              this.finished = true
            }
          }
        })
      },
      onload() {
        if (this.tagIndex !== 2) {
          if (this.tagIndex == 0) {
            this.ty = 2
          } else {
            this.ty = 1
          }
          this.getPointDetail()
        } else {
          this.getmyWithDetails()
        }
        console.log("onload")
      },
      onfresh() {
        this.page = 1
        this.list = []
        this.finished = false
        console.log("onfresh")
        if (this.tagIndex !== 2) {
          if (this.tagIndex == 0) {
            this.ty = 2
          } else {
            this.ty = 1
          }
          this.getPointDetail()
        } else {
          this.getmyWithDetails()
        }
      },
      handler(i) {
        this.tagIndex = i
        this.page = 1
        this.list = []
        this.finished = false

        if (this.tagIndex !== 2) {
          var ty
          if (this.tagIndex == 0) {
            this.ty = 2
          } else {
            this.ty = 1
          }
          this.getPointDetail({
            token: this.token,
            page: this.page,
            ty: ty,
          })
        } else {
          this.getmyWithDetails({
            token: this.token,
            page: this.page,
          })
        }
      },
      async getUse() {
        const res = await getUserInfo2({
          "token": this.token,
          "info": 1,
        })
        if (res.code) {
          this.user = res.data.user
          console.log(this.user);
        }
      }
    },
  }

</script>
<style lang="less">
  .balances {
    width: 100%;
    position: relative;
    font-size: 14px;
    background-color: #ffffff;
    height: 100%;

    .van-icon-arrow-left {
      color: #ffffff;
      font-size: 54px;
    }

    .van-icon-share {
      color: #ffffff;
      font-size: 54px;
    }

    .beijizheng {
      position: relative;
      position: absolute;
      right: 30px;
      z-index: 99;
      width: 92%;
      height: 380px;
      border-radius: 25px;
      z-index: 100;
      background-color: #ffeede;
    }

    .beijijian {
      margin-top: 20px;
      font-size: 28px;
    }

    .van-tabs {
      margin-top: 50px;
    }

    .zongzhi {
      font-weight: 600;
      margin-top: 40px;
      margin-left: 40px;
    }

    .jieryis {
      font-size: 50px;
      font-weight: 800;
      margin-left: 40px;
      margin-top: 10px;
    }

    .diweihu {
      width: 110px;
      height: 20x;
      font-size: 24px;
      position: absolute;
      right: 180px;
      top: 50px;
      font-weight: 600;
      color: #000;
      border-radius: 30px;
      padding-right: 20px;
      background-color: #ffffff;
      border: #ffffff;
    }

    .tixianannian {
      width: 110px;
      height: 20x;
      font-size: 24px;
      position: absolute;
      right: 40px;
      font-weight: 600;
      top: 50px;
      color: #000;
      border-radius: 30px;
      border: #ffffff;
      padding-right: 20px;
      background-color: #ffffff;
    }

    .bottomCon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }

    .zuixinyuan {
      margin-top: 50px;
      margin-left: 40px;
      font-weight: 500;
      color: #666666;

      .jianyuanzui {
        font-size: 24px;
      }

      span:last-child {
        padding-left: 15px;
        font-size: 28px;
      }
    }

    .zuijuedingdui {
      margin-top: 50px;
      margin-right: 40px;
      font-weight: 500;
      color: #666666;

      .jianyuanzui {
        font-size: 24px;
      }

      span:last-child {
        padding-left: 15px;
        font-size: 28px;
      }
    }

    .jiageye {
      //文本超出隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      font-size: 30px;
      font-weight: 700;
      color: #fe1618;
    }

    .fengdui {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      font-size: 28px;
      font-weight: 500;
      color: #666666;
    }

    .qinshu {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      font-size: 22px;
      font-weight: 600;
      color: #999999;
    }

    .jutabsna {
      margin-top: 30px;
    }
  }

  .bgBox {
    width: 100%;
    height: 350px;
    position: absolute;
    left: 0;
    top: 0;

    .bgTop {
      width: 100%;
      height: 442px;
      background: linear-gradient(to bottom, #ffa12a 0%, #fe8738 100%);
    }

    .bgBom {
      width: 100%;
      height: 50px;
      background-color: #f4f4f5;
      border-radius: 0 0 50% 50%;
      border-top: none;
    }
  }

  .van-hairline--bottom {
    background-color: transparent;
  }

  .wodetuadui {
    color: #ffffff;
    font-size: 36px;
    font-weight: 600;
  }

</style>
