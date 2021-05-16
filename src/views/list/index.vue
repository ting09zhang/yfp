<template>
  <div class="list_comte">
    <!-- 分类搜索 -->
    <van-search placeholder="搜索热门商品" class="sousuo" @focus="onfocus" />
    <!-- 分类搜索 -->
    <!-- 分类 -->
    <van-tree-select :items="items" :active-id.sync="items.category_id" :main-active-index.sync="active"
      @click-nav="itemslist(active)">
      <template #content>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <!-- 列表内容 -->
          <van-card @click="openItem(item)" v-for="item in Listthe" :key="item.category_id" :price="item.goods_price"
            :title="item.goods_name" :thumb="item.goods_image" :origin-price="item.line_price" :tags="item.goods_sales">
            <template #tags>
              <span class="groupCount">已拼{{item.goods_sales}}件</span>
            </template>
          </van-card>

          <!-- 列表内容 -->
        </van-list>
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="没有此类商品"
          v-if="!Listthe.length" />
      </template>
    </van-tree-select>
    <!-- 分类 -->
  </div>
</template>
<script>
  import {
    getclassify,
    getListthecontent
  } from '@/api/list'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        active: 0, // 默认分类第一个
        items: [], // 分类列表
        Listthe: [], // 分类列表内容
        loading: false, // 加载中
        finished: false, // 加载结束
        timestamp: null // 请求获取下一页的时间戳
      }
    },
    created() {
      this.listings()
      this.Listthecontent()
    },
    mounted() {},
    computed: {
        ...mapGetters(['token']),
    },
    watch: {},
    methods: {
      // list列表
      async listings() {
        const {
          data
        } = await getclassify()
        this.items = data
        console.log(this.items)
      },
      // 搜索跳转
      onfocus() {
        this.$router.push('/point-shop')
      },
      // 点击左侧导航时触发
      itemslist(active) {
        let category_id = this.items[active].category_id
        this.Listthecontent({
          category_id
        })
      },
      // list列表内容
      async Listthecontent(params) {
        const {
          data
        } = await getListthecontent(params)
        this.Listthe = data
        console.log(this.Listthe)
        // console.log(data)
        this.loading = false
        // if (page.length) {
        // } else {
        this.finished = true
        // }
      },
      openItem(item) {
        if (!this.token) {
          this.$toast('请先登录!')
          window.open('http://shop.98chihuo.com/getcode.php')
          return;
        }
        this.$router.push('/point_details?id=' + item.goods_id)
      }
    }
  }

</script>
<style scoped lang="less">
  .van-card__price {
    div {
      color: #ff0e10;
      font-weight: 700;
    }
  }

  .groupCount {
    display: inline-block;
    padding: 3px 10px;
    margin-top: 5px;
    border: 1px solid #ff0e10;
    color: #FF0E10;
    border-radius: 7px;
  }

  .list_comte {
    height: 100%;

    .sousuo {
      margin-bottom: 20px;
    }

    .van-sidebar-item {
      display: flex;
      width: 200px;
      height: 100px;
      align-self: center;
      justify-content: center;
      border-radius: 0 20px 0 0;
      line-height: 40px;
      box-sizing: border-box;
      font-size: 28px;
      color: rgba(187, 187, 187, 1);
      background-color: rgba(242, 243, 245, 1);
    }

    .actives {
      background: #000;
      color: #000;
    }

    .van-sidebar {
      height: 800px;
      background-color: rgba(243, 244, 246);
    }
  }

</style>
