<template>
  <div class="container">
    <van-nav-bar title="悦富拼规则" />

    <div class="rule" v-html="detail"></div>
  </div>
</template>
<script>
import {getHotSpellBanner} from '@/api/home.js'
export default {
  name: '',
  components: {
  },
  props: {},
  data() {
    return {
      detail:''
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getDetail(){
      getHotSpellBanner().then(res=>{
        if(res.code ==1){
          this.detail = res.data.pin_agreement
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.rule {
  width: 702px;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #666666;
  line-height: 40px;
  margin: 10px auto;
}
</style>
