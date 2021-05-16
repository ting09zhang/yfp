<template>
  <div class="deposit">
    <!-- 最上的返回栏 -->
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="提现中心">
    </van-nav-bar>
    <!-- 可提现的总金额 -->
    <van-cell :value="'可提现金额：¥' + userInfo.balance" class="tixian" />
    <!-- 可提现的总金额 -->
    <!-- 用户提现多少金额 -->
    <van-card thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
      <!-- 用户名称 -->
      <template #title>
        <div class="mingchenga">{{ userInfo.nickName }}</div>
      </template>
      <!-- 用户照片 -->
      <template #thumb>
        <van-image round width="2rem" height="2rem" :src="userInfo.avatarUrl" />
      </template>
      <!-- 用户照片 -->
      <!-- 用户手机号 -->
      <template #desc>
        <div style="margin-top:15px">
          <span>{{ userInfo.phone }}</span>
        </div>
      </template>
    </van-card>
    <!-- 提现的金额 -->
    <van-row type="flex" justify="space-between" class="tiwh">
      <van-col  class="tixianjine">提现金额</van-col>
      <button class="van-buttonn" @click="values = userInfo.balance">
        全部
      </button>
      <van-cell-group class="input_ti">
        <van-field v-model="values" placeholder="请输入提现金额" />
      </van-cell-group>
    </van-row>

    <van-cell-group>
      <van-cell
        :title="item.title"
        clickable
        v-for="(item, index) in cellList"
        @click="handlePay(index)"
        :key="index"
        class="pay"
      >
        <template #icon>
          <van-icon :name="item.icon" :color="item.color" class="icons" />
        </template>
        <template #right-icon>
          <van-icon name="success" class="success" v-if="item.flag" />
        </template>
      </van-cell>

      <van-form v-if="cellList[0].flag">
        <van-field
          v-model="formData.realname"
          name="真实姓名"
          label="真实姓名"
          :rules="[{ required: true, message: '请填写真实姓名' }]"
        />
        <van-field
          v-model="formData.account"
          name="支付宝账号"
          label="支付宝账号"
          :rules="[{ required: true, message: '请填写支付宝账号' }]"
        />
      </van-form>

      <van-form v-if="cellList[1].flag">
        <van-field
          v-model="form.realname"
          name="姓名"
          label="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="form.open_bank"
          name="开户行"
          label="开户行"
          :rules="[{ required: true, message: '请填写开户行' }]"
        />
        <van-field
          v-model="form.tel"
          name="联系电话"
          label="联系电话"
          :rules="[{ required: true, message: '请填写联系电话' }]"
        />
        <van-field
          v-model="form.bank_card"
          name="银行卡号"
          label="银行卡号"
          :rules="[{ required: true, message: '请填写银行卡号' }]"
        />
      </van-form>
    </van-cell-group>

    <van-button
      type="primary"
      class="dahaoanniu"
      round
      size="large"
      @click="submit"
      >提现</van-button
    >
    <van-cell center class="tixianshuo">
      <template #title>
        <span class="custom-title">提现说明</span>
      </template>
      <template #label class="tixiaii">
       <div v-html="decp"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getDepositDetails,
  updateZfbInfo,
  updateBankInfo,
  submitDeposit
} from '@/api/deposit.js'
import {getHotSpellBanner} from '@/api/home.js'
import minxin from '@/minxin/minxin'
export default {
  name: '',
  components: {},
  mixins: [minxin],
  props: {},
  data() {
    return {
      values: '',
      decp:'',
      formData: {},
      form: {},
      cellList: [
        { title: '支付宝提现', icon: 'alipay', flag: false, color: '#1296db' },
        {
          title: '银行卡提现',
          icon: 'gold-coin',
          flag: false,
          color: '#ffc752'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  watch: {},
  created() {
    this.getDepositList()
    this.getDetail()
  },
  mounted() {},
  methods: {
    getDetail(){
      getHotSpellBanner().then(res=>{
        if(res.code ==1){
          this.decp = res.data.withdraw_explain
        }
      })
    },
    handlePay(index) {
      this.cellList.forEach(item => {
        item.flag = false
      })
      this.cellList[index].flag = true
    },
    getDepositList() {
      getDepositDetails({
        token: this.token
      }).then(res => {
        if (res.data.bankinfo == null) {
          this.form = {}
          console.log(this.form)
        } else {
          this.form = res.data.bankinfo
        }
        if (res.data.zfbinfo == null) {
          this.formData = {}
        } else {
          this.formData = res.data.zfbinfo
        }
      })
    },
    submit() {
      // 支付宝提现
      if (this.cellList[0].flag) {
        updateZfbInfo({ ...this.formData, token: this.token }).then(res => {
          if (res.code == 1) {
            submitDeposit({
              token: this.token,
              type: 'zfb',
              money: this.values
            }).then(res => {
              if (res.code == 1) {
                this.$dialog
                  .alert({
                    title: '提示',
                    message: '你已经提现成功了!'
                  })
                  .then(() => {
                    this.values = ''
                  })
                this.getUserInfos()
              }else{
                this.$toast.fail(res.msg)
              }
            })
            .catch(err=>{
              this.$toast.fail(err)
            })
          } else {
            this.$toast.fail(res.msg)
          }
        })
      } else {
        // 银行卡提现
        updateBankInfo({ ...this.form, token: this.token }).then(res => {
          if (res.code == 1) {
            submitDeposit({
              token: this.token,
              type: 'yhk',
              money: this.values
            }).then(res => {
              if (res.code == 1) {
                this.$dialog
                  .alert({
                    title: '提示',
                    message: '你已经提现成功了!'
                  })
                  .then(() => {
                    this.values = ''
                  })
                this.getUserInfos()
              } else {
                this.$toast.fail(res.msg)
              }
            })
          } else {
            this.$toast.fail(res.msg)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .success {
  color: #ffa727 !important;
}
.van-cell {
  align-items: center;
}
.icons {
  margin-right: 5px;
}
.deposit {
  .van-nav-bar__title {
    font-size: 36px;
    color: #000000;
    font-weight: 600;
  }
  .van-icon {
    width: 48px;
    height: 48px;
    color: #666666;
  }
  .tixian {
    width: 702px;
    height: 96px;
    background: #ffffff;
    border-radius: 8px;
    margin: 20px 24px;
  }
  .van-cell__value {
    width: 345px;
    height: 45px;
    font-size: 32px;
    font-weight: 500;
    color: #666666;
  }
  .van-buttonn {
    color: #ffbb40;
    width: 90px;
    height: 36px;
    border-radius: 8px;
    font-size: 24px;
    border: 1px solid #ffbb40;
    margin-right: 24px;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .tixianjine {
    height: 40px;
    font-size: 28px;
    font-weight: 500;
    color: #666666;
    line-height: 40px;
    margin-left: 24px;
    margin-top: 20px;
  }
  .shuru {
    border: #ffffff;
    background-color: #ffffff;
  }
  .tiwh {
    display: flex;
    background: #ffffff;
    margin-bottom: 20px;
  }
  .jusiei {
    position: relative;
    height: 100px;
    border-top: 1px solid #999999;
    margin-top: 20px;
    border-bottom: 1px solid #999999;
  }
  .gouxia {
    position: absolute;
    right: 24px;
    top: 30px;
  }
  .input_ti {
    margin-top: 30px;
    width: 100%;
  }
  .dahaoanniu {
    margin-top: 30px;
    width: 702px;
    height: 80px;
    background: #ffbb40;
    border-radius: 40px;
    opacity: 0.49;
    margin-left: 20px;
    border: #ffffff;
  }
  .tixianshuo {
    margin-top: 24px;
    font-size: 24px;
    font-weight: 500;
    color: #666666;
    line-height: 33px;
  }
  .van-cell__label {
    margin-top: 24px;
    font-size: 22px;
    font-weight: 500;
    color: #999999;
    line-height: 35px;
  }
  .van-icon-success {
    border: #ffffff;
  }
  .mingchenga {
    color: #000000;
    font-size: 32px;
  }
}
</style>
