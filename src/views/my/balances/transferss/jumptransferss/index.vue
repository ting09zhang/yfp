<template>
  <div class="jumptransferss">
    <van-nav-bar
      :title="title"
      @click-left="$router.go(-1)"
      left-arrow
      class="jianju"
    />
    <!-- 用户信息 -->
    <van-cell :title="detail.nickName" :label="detail.phone">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <van-image round width="1rem" height="1rem" :src="detail.avatarUrl" />
      </template>
    </van-cell>
    <!-- 转增数额 -->
    <div>
      <div class="zhuangzeng">
        <span class="shuershu">转赠数额</span>
        <van-button plain type="info" size="small" @click="value = userInfo.balance">全部</van-button>
      </div>
      <div class="buttonjian">
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入金额" />
        </van-cell-group>
      </div>
    </div>
    <van-button
      type="primary"
      size="large"
      class="dahaoanniu"
      @click="onloagins"
      >转增</van-button
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {balancetransfer} from '@/api/balance.js'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      title: '互转中心',
      value: '',
      detail: {}
    }
  },
  computed: {
    ...mapGetters(['token','userInfo'])
  },
  watch: {},
  created() {
    this.detail = this.$route.query
  },
  mounted() {},
  methods: {
    onloagins() {
      this.$dialog.confirm({
        message: `确定要转增${this.value}余额吗?`,
        beforeClose
      })
      var _this = this
      function beforeClose(action, done) {
        if (action === 'confirm') {
          balancetransfer({
            token:_this.token,
            send_phone:_this.detail.phone,
            send_phone_q:_this.detail.phone,
            money:_this.value
          }).then(res=>{
            if(res.code == 1){
              _this.$toast.success('转账成功')
              _this.$router.push('/balances')
            }else{
              _this.$toast.fail(res.msg)
            }
            done()
          })
        } else {
          done()
        }
      }
    }
  }
}
</script>
<style lang="less">
.jumptransferss {
  background-color: #ffffff;
  .jianju {
    margin-bottom: 30px;
  }
  .van-cell__title {
    font-size: 32px;
    margin-left: 15px;
    font-weight: 600;
    color: #000000;
  }
  .van-image--round {
    width: 80px;
    height: 80px;
  }
  .zhuangzeng {
    background-color: #ffffff;
    margin-top: 50px;
  }
  .van-button--info {
    width: 90px;
    height: 36px;
    border-radius: 8px;
    color: #ffbb40;
    border: 1px solid #ffbb40;
    position: absolute;
    right: 50px;
    margin-top: 10px;
  }
  .shuershu {
    font-size: 28px;
    font-weight: 500;
    color: #666666;
    margin-left: 35px;
  }
  .buttonjian {
    margin-top: 50px;
  }
  .van-field {
    border-bottom: 1px solid #dcdcdc;
  }
  .dahaoanniu {
    margin-top: 80px;
    width: 702px;
    height: 80px;
    background: #ffbb40;
    border-radius: 40px;
    border: transparent;
    font-size: 32px;
    font-weight: 600;
    margin-left: 25px;
  }
}
</style>
