<template>
  <div>
    <van-nav-bar title="参团详情" left-arrow @click-left="onClickLeft" />
    <cantuan-list :list="list"></cantuan-list>
  </div>
</template>

<script>
import cantuanList from "@/components/cantuan-list"
export default {
  name: '',
  components:{
    cantuanList
  },
  data() {
    return {
      list:[]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  },
  created(){
    this.list = JSON.parse(window.localStorage.getItem('list'))
  }
}
</script>
<style lang="less" scoped></style>
