<template>
  <div>
    <navbarF :title="'设置'"></navbarF>
    <div class="card">
      <div class="img" @click="handler">
        <van-uploader v-model="fileList" multiple :max-count="1" preview-image :after-read="handler"/>
      </div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="formData.nickName"
          name="修改昵称"
          label="修改昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="formData.username"
          name="姓名"
          label="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
           <van-field
          v-model="formData.phone"
          name="电话"
          label="手机号码"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          readonly
          clickable
          name="area"
          :value="formData.adress"
          label="所在城市"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >确认修改</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import navbarF from '@/components/navbar_f'
import { areaList } from '@vant/area-data'
export default {
  name: '',
  components: {
    navbarF
  },
  data() {
    return {
      showArea: false,
      areaList: areaList,
      formData:{},
      fileList:[]
    }
  },
  methods: {
    onConfirm(values) {
      this.formData.adress = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showArea = false
    },
    onSubmit(){

    },
    handler(){
      
    }
  }
}
</script>
<style lang="less" scoped>
.van-button--info{
  background-color: #FFBB40;
  border: none;
}
.img{
  position: relative;
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  &::after{
    content:'更换头像';
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%);
    color: #FFBB40;
    font-size: 24px;
  }
}
.van-uploader__upload {
  border-radius:50% ;
}
</style>
