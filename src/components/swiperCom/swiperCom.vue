<template>
  <van-swipe
    class="swiper-box"
    :autoplay="3000"
    loop
    touchable
    indicator-color="#fff"
  >
    <van-swipe-item v-for="(item, index) in swiperList" :key="index">
      <img class="swiper-item" :src="item.file_path" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'swiperCom',
  props: {
    swiperList: {
      type: Array
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.swiper-box {
  width: 702px;
  height: 300px;
  margin: 0 auto;
  border-radius: 12px;

  .swiper-item {
    width: 100%;
    height: 100%;
  }
}
</style>
