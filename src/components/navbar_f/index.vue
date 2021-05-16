<!--
 * @Author: 导航组件
 * @Date: 2021-04-24 11:33:38
 * @LastEditTime: 2021-04-24 14:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\components\navbar_f\index.vue
-->
<template>
  <div class="navbar">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :fixed="fixed"
      :left-arrow="leftArrow"
      @click-left="onClickLeft"
      :border="border"
      :right-text="rightText"
      :placeholder="placeholder"
      :z-index="zIndex"
      :safe-area-inset-top="safeAreaInsetTop"
    />
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    border: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: Boolean,
      defalult: false
    },
    zIndex: {
      type: Number,
      default: 1
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.navbar{
  height: 88px;
}
.van-nav-bar {
  margin-bottom: 114px;
  /deep/ .van-nav-bar__title {
    line-height: 46px;
    font-size: 32px;
    font-weight: 500;
  }
  /deep/ .van-icon-arrow-left {
    color: #7a7a7a;
  }
}
</style>
