<!--
 * @Author: your name
 * @Date: 2021-04-24 14:09:57
 * @LastEditTime: 2021-04-24 15:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\views\login_views\other\index.vue
-->
<template>
  <div class="other">
    <nav-bar-f title="手机登录"></nav-bar-f>
    <moblie-com></moblie-com>
  </div>
</template>
<script>
import navBarF from '@/components/navbar_f'
import moblieCom from '@/components/mobile_login'
export default {
  name: '',
  components: { navBarF, moblieCom },
  props: {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
<style scoped lang="less">
.other {
  height: 100vh;
  background-color: #fff;
}


</style>
