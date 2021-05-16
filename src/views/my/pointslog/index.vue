<template>
  <div class="particulars">
    <van-nav-bar :title="title" @click-left="$router.go(-1)" left-arrow />
    <!-- tab标签页 -->
    <van-tabs v-model="tagIndex" @click="handler">
      <van-tab title="全部">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
            error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多">
            <template>
              <van-cell v-for="(item, index) in list" :key="index">
                <template #title>
                  <div class="fengdui">
                    {{ item.title }}
                  </div>
                </template>
                <template>
                  <div class="jiageye">操作积分 {{ item.value }}</div>
                  <div class="qinshu">
                    <span>当前积分</span>
                    <span>:{{ item.now_point }}</span>
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
      <van-tab title="收益">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
            error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多">
            <template>
              <van-cell v-for="(item, index) in list" :key="index">
                <template #title>
                  <div class="fengdui">
                    {{ item.title }}
                  </div>
                </template>
                <template>
                  <div class="jiageye">操作积分 {{ item.value }}</div>
                  <div class="qinshu">
                    <span>当前积分</span>
                    <span>:{{ item.now_point }}</span>
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
      <van-tab title="使用">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="isLoading" :finished="finished" :offset="1" :immediate-check="false"
            error-text="请求失败，点击重新加载" @load="onload" finished-text="没有更多">
            <template>
              <van-cell v-for="(item, index) in list" :key="index">
                <template #title>
                  <div class="fengdui">
                    {{ item.title }}
                  </div>
                </template>
                <template>
                  <div class="jiageye">操作积分 {{ item.value }}</div>
                  <div class="qinshu">
                    <span> 当前积分</span>
                    <span>:{{ item.now_point }}</span>
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
    </van-tabs>
  </div>
</template>

<script>
  import {
    getPointlog
  } from '@/api/my.js'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        list: [],
        isLoading: false,
        finished: true,
        title: '积分明细',
        page: 1,
        tagIndex: 0,
      }
    },
    computed: {
      ...mapGetters(['token']),
    },
    watch: {},
    created() {
      this.onfresh()
    },
    mounted() {},
    methods: {
      getList() {
        this.isLoading = true
        getPointlog({
          token: this.token,
          page: this.page,
          ty: this.tagIndex,
        }).then((res) => {
          if (res.code) {
            res.data.map((item) => {
              this.list.push(item)
            })
            this.page++
            if (res.data.length < 10) {
              this.finished = true
            } else {
              this.finished = false
            }
          }
           console.log(this.list.length)
          this.isLoading = false
        })
       
      },
      handler(i) {
        this.onfresh()
      },
      onload() {
        this.getList()
         console.log("onload")
      },
      onfresh() {
        this.page = 1
        this.list = []
        this.finished = false
        console.log("onfresh")
        this.getList()
      },
    },
  }

</script>
<style lang="less">
  .particulars {
    .jiageye {
      font-size: 28px;
      font-weight: 500;
      color: #666666;
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
      font-size: 22px;
      font-weight: 600;
      color: #999999;
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
  }

</style>
