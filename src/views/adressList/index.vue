<template>
  <div>
    <navbarF :title="'修改地址'"></navbarF>

    <van-address-list
      v-model="chosenAddressId"
      :list="adress"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      switchable
      @select="select"
    />
    <van-empty description="暂无地址,赶紧添加吧" v-if="!adress.length" />
  </div>
</template>

<script>
import navbarF from '@/components/navbar_f'
import {getAdressList,defaultAdressList} from '@/api/address.js'
import {mapGetters} from 'vuex'
export default {
  name: '',
  components: {
    navbarF
  },
  data() {
    return {
      chosenAddressId: '',
      adress: []
    }
  },
  methods: {
    onAdd() {
      this.$router.push('/setAdress')
    },
    onEdit(item) {
      this.$router.push({
        path: '/setAdress',
        query: item
      })
    },
    getAdressLists(){
      getAdressList({token:this.token}).then(res=>{
        res.data.list.forEach(item=>{
          item.addressDetail = item.detail
          item.tel = item.phone
          item.address = item.region.province +item.region.city + item.region.region
          item.id = item.address_id
   
        })
        this.adress = res.data.list
        this.chosenAddressId = res.data.default_id
      })
    },
    select(data){
      defaultAdressList({token:this.token,address_id:data.address_id}).then(res=>{
        if(res.code == 1){
          this.$toast('设置成功')
        }
      })
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {
   this.getAdressLists()
  }
}
</script>
<style lang="less" scoped></style>
