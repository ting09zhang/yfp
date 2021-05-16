<template>
  <div class="navbar">
    <van-nav-bar :title="title" @click-left="onClickLeft" left-arrow />
    <!-- tab标签页 -->
    <van-tabs v-model="active" @click="handler">
      <van-tab title="待付款">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载" @load="onload">
            <navbarss :list="list" ref="list" :type="'待付款'"></navbarss>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待发货">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载" @load="onload">
            <navbarss :list="list" ref="list" :type="'待发货'"></navbarss>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待收货">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载" @load="onload">
            <navbarss :list="list" ref="list" :type="'待收货'"></navbarss>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已完成">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载" @load="onload">
            <navbarss :list="list" ref="list" :type="'已完成'"></navbarss>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="全部订单">
        <van-pull-refresh v-model="isLoading" @refresh="onfresh">
          <van-list v-model="loading" :finished="finished" :offset="1" :immediate-check="false" finished-text="已全部加载完成"
            error-text="请求失败，点击重新加载" @load="onload">
            <navbarss :list="list" ref="list" :type="'待付款'"></navbarss>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {
    getOrderList
  } from '@/api/order.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        active: 0, // 默认第一个
        list: [],
        title: '标题',
        page: 1,
        isLoading: true,
        finished: false,
        loading: false,
        dataType: ''
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    watch: {},
    created() {

    },
    mounted() {
      this.active = this.$route.query.id - 1
      switch (this.active) {
        case 0:
          this.title = '待付款'
          this.dataType = 'payment'
          break
        case 1:
          this.title = '待发货'
          this.dataType = 'delivery'
          break
        case 2:
          this.title = '待收货'
          this.dataType = 'received'
          break
        case 3:
          this.title = '已完成'
          this.dataType = 'finish '
          break
        case 4:
          this.title = '全部订单'
          this.dataType = 'all'
          break
      }
      this.$nextTick(() => {
        this.getOrderList()
      })
    },
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      getOrderList() {
        getOrderList({
          page: this.page,
          token: this.token,
          dataType: this.dataType
        }).then(res => {
          if (res.code) {
            res.data.data.map(item => {
              this.list.push(item)
            })
            if (res.data.data.length < 10) {
              this.finished = true
            }
            this.isLoading = false
            this.loading = false
            this.page++
          }
        })
      },
      handler(i) {
        this.list = []
        switch (i) {
          case 0:
            this.title = '待付款'
            this.dataType = 'payment'
            break
          case 1:
            this.title = '待发货'
            this.dataType = 'delivery'
            break
          case 2:
            this.title = '待收货'
            this.dataType = 'received'
            break
          case 3:
            this.title = '已完成'
            this.dataType = 'finish '
            break
          case 4:
            this.title = '全部订单'
            this.dataType = 'all'
            break
        }
        this.onfresh()
      },
      onload() {

        this.getOrderList()
      },
      onfresh() {
        this.page = 1
        this.list = []
        this.finished = false
        this.getOrderList()
      },
    }
  }

</script>
<style lang="less"></style>
