<template>
  <div>
    <navbarF :title="'修改地址'"></navbarF>

    <van-address-edit :area-list="areaList" :address-info="infoList" show-postal :show-delete="$route.query.id"
      :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
      @change-detail="onChangeDetail" />
  </div>
</template>

<script>
  import navbarF from '@/components/navbar_f'
  import {
    areaList
  } from '@vant/area-data'
  import {
    addAdressList,
    editAdressList,
    removeAdressList
  } from '@/api/address.js'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    components: {
      navbarF
    },
    created() {
      this.infoList = this.$route.query
    },
    data() {
      return {
        areaList,
        searchResult: []
      }
    },
    methods: {
      async onSave(data) {
        data.detail = data.addressDetail;
        data.phone = data.tel
        if (this.$route.query.tel) {
          // 编辑
          let token = this.token
          let region = data.province + ',' + data.city + ',' + data.county
          editAdressList({
            ...data,
            token,
            region
          }).then(res => {
            if (res.code == 1) {
              this.$toast.success('保存地址成功!')
              this.$router.back()
            }
          })
        } else {
          // 新增
          let region = data.province + ',' + data.city + ',' + data.county
          let token = this.token
          const res = await addAdressList({
            ...data,
            token,
            region,
          })
          if (res.code) {
            this.$toast.success(res.msg)
            this.$router.back()
          } else {
            this.$toast.fail(res.msg)
          }
        }
      },
      onDelete() {
        removeAdressList({
          token: this.token,
          address_id: this.$route.query.address_id
        }).then(res => {
          if (res.code == 1) {
            this.$toast('删除地址成功!')
            this.$router.back()
          } else {
            this.$toast('删除地址失败!')
          }
        })
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = []
        } else {
          this.searchResult = []
        }
      }
    },

    computed: {
      ...mapGetters(['token'])
    }
  }

</script>
<style lang="less" scoped></style>
