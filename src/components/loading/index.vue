<template>
  <div class="g-loading">
    <!-- <van-loading class="loading-content" type="spinner" size="24px" color="#1989fa" vertical>拼命加载中...</van-loading> -->
  </div>
</template>
<script>
export default {
  name: 'LOADING',
  data() {
    return {}
  }
}
</script>
<style scoped lang='less'>
.g-loading {
    position: fixed;
    top:0;
    left:0;
    z-index:99999999;
    width: 100%;
    height: 100%;
    background: rgba(255,250,205,.5);  
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    .loading-content{
      margin: 0 auto;
      margin-top: 60%;
    }
    .van-loading__text{color:rgb(25, 137, 250)}
  }
</style>