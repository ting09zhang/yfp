<template>
  <div class="teams">
    <!-- 弧度背景 -->
    <!-- <div class="bgBox">
      <div class="bgTop"></div>
      <div class="bgBom"></div>
    </div> -->
    <!-- 导航栏 -->
    <van-nav-bar left-arrow>
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #title>
        <div class="wodetuadui">我的团队</div>
      </template>
      <template #right>
        <van-icon name="share" />
      </template>
    </van-nav-bar>
    <!-- 正方形背景 -->
    <!-- <div>
      <div class="beijizheng"></div>
    </div> -->
    <!-- tab栏 -->
    <van-tabs v-model="active">
      <van-tab :title="sums.zhi">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell-group>
            <van-cell />
            <template #title>
              <div class="danyuange"></div>
            </template>
          </van-cell-group>
          <van-cell
            :title="item.nickName"
            :label="item.phone"
            :value="item.create_time"
            v-for="item in list"
            :key="item.index"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <van-image
                round
                width="1rem"
                height="1rem"
                :src="item.avatarUrl"
              />
            </template>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab :title="sums.jian"
        ><van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell-group>
            <van-cell />
            <template #title>
              <div class="danyuange"></div>
            </template>
          </van-cell-group>
          <van-cell
            :title="item.nickName"
            :label="item.phone"
            :value="item.create_time"
            v-for="item in listse"
            :key="item.index"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <van-image
                round
                width="1rem"
                height="1rem"
                :src="item.avatarUrl"
              />
            </template>
          </van-cell> </van-list
      ></van-tab>
      <van-tab :title="sums.today"
        ><van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell-group>
            <van-cell />
            <template #title>
              <div class="danyuange"></div>
            </template>
          </van-cell-group>
          <van-cell
            :title="item.nickName"
            :label="item.phone"
            :value="item.create_time"
            v-for="item in listss"
            :key="item.index"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
              <van-image
                round
                width="1rem"
                height="1rem"
                :src="item.avatarUrl"
              />
            </template>
          </van-cell> </van-list
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getmembers, getnumbertab } from '@/api/my'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      page: 1,
      list: [],
      sums: {},
      listse: [],
      listss: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  created() {
    this.onmember()
    this.Membernumber()
    this.sonmember()
    this.onmembers()
  },
  mounted() {},
  methods: {
    // tab栏
    async Membernumber() {
      const { data } = await getnumbertab({
        token: this.token
      })
      this.sums = data
      console.log(data)
    },
    // 列表数据支
    async onmember() {
      this.loading = true
      const { data } = await getmembers({
        token: this.token,
        page: this.page
      })
      this.list = data
      // console.log(data)
      this.loading = false
      this.finished = true
      // console.log(this.list)
    },
    // 列表数据非直属
    async onmembers() {
      this.loading = true
      const { data } = await getmembers({
        token: this.token,
        page: this.page,
        jibie: 1
      })
      this.listse = data
      console.log(data)
      this.loading = false
      this.finished = true
      // console.log(this.list)
    },
    // 列表数据今日新增
    async sonmember() {
      this.loading = true
      const { data } = await getmembers({
        token: this.token,
        page: this.page,
        jibie: 2
      })
      this.listss = data
      // console.log(data)
      this.loading = false
      this.finished = true
      // console.log(this.list)
    }
  }
}
</script>
<style lang="less">
.teams {
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
    width: 100%;
    height: 362px;
    z-index: 100;
    // position: absolute;
    // z-index: 99;
    // background-image: url('../../../../');
    background-color: #cfa17d;
  }
  .danyuange {
    font-size: 28px;
    font-weight: 500;
    color: #000000;
  }
  .van-cell {
    padding-top: 5px;
  }
  .van-cell-group__title {
    padding: 30px;
  }
  .van-cell__title {
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    margin-left: 20px;
    margin-top: -10px;
  }
  .van-cell__value {
    font-size: 22px;
    font-weight: 600;
    color: #999999;
    margin-top: 20px;
  }
  .van-cell__label {
    margin-top: -5px;
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
    background: linear-gradient(180deg, #161e32 0%, #161e32 100%);
  }

  .bgBom {
    width: 100%;
    height: 50px;
    background-color: #161e32;
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
