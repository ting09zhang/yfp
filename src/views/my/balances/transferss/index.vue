<template>
  <div class="transfersss">
    <van-nav-bar :title="title" @click-left="$router.go(-1)" left-arrow />
    <!-- 搜索 -->
    <van-search v-model="key" placeholder="搜索昵称/姓名/手机号/ID" @search="Transfersbetwee"/>
    <!-- 用户的个人信息 -->
    <van-cell
      :title="item.nickName"
      v-for="item in list"
      :key="item.index"
      @click="
        $router.push({ path: '/jumptransferss', query: item })
      "
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <van-image round width="1rem" height="1rem" :src="item.avatarUrl" />
      </template>
      <template>
        <div>
          <span>{{ item.time }} </span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getbetween } from '@/api/my'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      title: '互转中心',
      key: '',
      list: []
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  created() {
    this.Transfersbetwee()
  },
  mounted() {},
  methods: {
    async Transfersbetwee() {
      const { data } = await getbetween({
        token: this.token,
        page: 1,
        key: this.key
      })

      this.list = data
      // console.log(this.list)
    }
  }
}
</script>
<style lang="less">
.transfersss {
  .van-search__content--square {
    height: 60px;
    background: #d8d8d8;
    border: 2px solid #979797;
  }
  .van-cell__title {
    margin-top: 15px;
    margin-left: 15px;
    font-size: 32px;
    font-weight: 600;
    color: #000000;
  }
  .van-cell__value {
    margin-top: 20px;
    font-size: 28px;
    font-weight: 400;
    color: #878d99;
  }
  .van-field__body {
    margin-top: -20px;
  }
  .van-search__content {
    border-radius: 40px;
    border: transparent;
    background: #f3f4f6;
  }
  .tubaioyan {
    color: #ffbb40;
    margin-right: 10px;
  }
}
</style>
