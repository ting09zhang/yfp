<!--
 * @Author: your name
 * @Date: 2021-04-24 15:41:05
 * @LastEditTime: 2021-04-24 15:44:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yfp\src\views\login_views\register\index.vue
-->
<template>
  <div class="register">
    <nav-bar></nav-bar>
    <mobile-com></mobile-com>
  </div>
</template>
<script>
import navBar from '@/components/navbar_f'
import mobileCom from '@/components/mobile_login'
export default {
  name: '',
  components: { navBar, mobileCom },
  props: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  computed: {},
  watch: {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
