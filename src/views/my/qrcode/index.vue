<template>
  <div>
    <navbarF :title="'我的推广码'"></navbarF>
    <div class="code" @click="handler">
      <van-image
        width="100%"
        height="100%"
        :src="userInfo.code_path"
        fit="cover"
      />
    </div>
  </div>
</template>

<script>
import navbarF from '@/components/navbar_f'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    navbarF
  },
  methods: {
    handler() {}
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less" scoped>
.code {
  width: 750px;
  height: 100%;
  position: relative;
}
</style>
