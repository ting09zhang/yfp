<template>
  <div class="">
    <van-nav-bar :title="title" @click-left="$router.go(-1)" left-arrow />
    <div class="houxiye">
      <div v-html="users.user_proto" style="font-size:14px;padding:15px;color:#666;text-indent:28px;"></div>
    </div>
  </div>
</template>

<script>
import { getHotSpellBanner } from '@/api/home.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      title: '协议说明',
      users: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getHotSpellBanner()
  },
  mounted() {},
  methods: {
    // 协议说明
    async getHotSpellBanner() {
      const { data } = await getHotSpellBanner()
      // console.log(data)
      this.users = data
      // console.log(this.users)
    }
  }
}
</script>
<style lang="less" scoped>
.agreement {
  Attribute {
    font-size: 6px !important;
  }
  
}
</style>
