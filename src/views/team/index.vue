<template>
  <div class="partnerIncome">
    <!-- <van-nav-bar title="合伙人收益" fixed placeholder>
      <template #left>
        <img src="@/assets/returnIcon.png" class="navImg">
      </template>
      <template #right>
        <img src="@/assets/share.png" class="navImg">
      </template>
    </van-nav-bar> -->
    <div class="earnings">
      <van-nav-bar left-arrow title="合伙人收益" @click-left="onClickLeft">
        <template #right>
          <van-icon name="share" size="28" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 时间行 -->
    <div class="timepicker" @click="pick">
      <div class="datatime">
        <van-field class="inp" readonly clickable :value="month" />
      </div>
      <van-icon name="play" size="15"></van-icon>
    </div>

    <!-- 总收益区域 -->
    <div class="paddingWrap">
      <div class="profitWrap">
        <div class="profitTextA">总收益</div>
        <div class="profitTextB"><span>￥</span>{{ sum }}.00</div>
        <div class="profitTextC">本周收益：<span>￥</span>{{ weekSum }}.00</div>
        <echarts
          :option="option"
          :listData="dataList"
          ref="echarts"
        ></echarts>
      </div>
    </div>

    <!-- 收支明细 -->

    <div class="box">
      <div class="title">本周收支明细</div>
      <div class="item" v-for="(item, index) in weekList" :key="index">
        <div class="left">{{ item.time }}</div>
        <div class="right">+¥{{ item.money }}</div>
      </div>
    </div>

    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-picker
        title="选择时间"
        show-toolbar
        :columns="flag ? columns1 : columns2"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <template #columns-top>
          <div class="picker">
            <div :class="[flag ? 'picker_left' : 'picker_right']" @click="flag=false">按月</div>
            <div :class="[flag ? 'picker_right' : 'picker_left']" @click="flag=true">按年</div>
          </div>
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import echarts from '@/components/echarts/echarts'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import {
  getWeek,
  getMonth,
  getMonthByYear,
  getWeekByMonth
} from '@/api/team.js'
export default {
  name: '',
  components: { echarts },
  data() {
    return {
      show: false,
      flag: false,
      weekList: [],
      dataList: [],
      year: '',
      month:
        (new Date().getMonth() + 1).toString.length == 1
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1,
      yearList: [],
      monthList: [],
      option: ['一周', '两周', '三周', '四周', '五周', '六周'],
      sum: '',
      weekSum: '',
      columns1: [
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
        '2028',
        '2029',
        '2030',
        '2031',
        '2032'
      ],
      columns2: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    pick(){
      this.show = true
      // this.dataList = ''
    },
    getWeekList() {
      getWeek({
        token: this.token
      }).then(res => {
        this.weekList = res.data
        this.weekSum = res.data
          .map(item => item.money)
          .reduce(function(prev, cur) {
            return prev + cur
          }, 0)
      })
    },
    getYearList() {
      getMonthByYear({
        token: this.token,
        year: this.month
      }).then(res => {
        this.dataList = res.data
        this.option  = ['1月','3月','6月','9月','12月']
      })
    },
    getMonthList() {
      getMonth({
        token: this.token
      }).then(res => {
        this.monthList = res.data
        this.sum = res.data
          .map(item => item.money)
          .reduce(function(prev, cur) {
            return prev + cur
          }, 0)
      })
    },
    getWeekByMonthList() {
      getWeekByMonth({
        token: this.token,
        month: this.month
      }).then(res => {
        res.data = res.data.map(item => item.money)
        this.dataList = res.data
      })
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value) {
      this.month = value
      this.show = false
      if(this.flag){
        this.getYearList()
      }else{
        this.getWeekByMonthList()
      }
    }
  },
  created() {
    this.getWeekList()
    this.getWeekByMonthList()
    this.getMonthList()
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>
<style lang="less" scoped>
.timepicker {
  display: flex;
  background-color: #fff;
  .datatime {
    font-size: 24px;
    color: #000000;
    height: 33px;
    text-indent: 2em;
    margin: 20px;
  }
  .van-icon {
    transform: rotateZ(90deg);
    margin: 20px;
  }
}
.paddingWrap {
  width: 690px;
  height: 644px;
  background-color: #fff;
  margin: 10px auto;
  padding: 10px 15px;
}
.profitWrap {
  width: 100%;
  height: 644px;
  background: #ffffff;
  border-radius: 0px 0px 12px 12px;
  .profitTextA {
    font-size: 24px;
    color: #000000;
    width: 72px;
    height: 33px;
  }
  .profitTextB {
    font-size: 34px;
    color: #000000;
    width: 184px;
    height: 48px;
    margin: 20px 0px;
  }
  .profitTextC {
    font-size: 24px;
    color: #000000;
    width: 240px;
    margin: 50px 0px;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
.earnings {
  position: relative;
  background-color: #fff;
  /deep/ .van-nav-bar__title {
    font-size: 28px;
    color: #000000;
  }
  /deep/ .van-icon {
    font-size: 28px;
    color: #d8d8d8;
  }
}
.box {
  width: 690px;
  height: 676px;
  background: #ffffff;
  border-radius: 12px;
  margin: 20px auto 0;
  padding: 0 20px;
  .title {
    width: 100%;
    height: 85px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 85px;
  }
  .item {
    margin: 10px 0;
    width: 690px;
    height: 80px;
    background: #f8f8f8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    .left {
      width: 170px;
      height: 34px;
      font-size: 28px;
      font-family: DIN-Medium, DIN;
      font-weight: 500;
      color: #666666;
      line-height: 34px;
      text-align: center;
    }
    .right {
      width: 180px;
      height: 34px;
      font-size: 28px;
      font-family: DIN-Medium, DIN;
      font-weight: 500;
      color: #000000;
      line-height: 34px;
    }
  }
}
.picker {
  display: flex;
  align-items: center;
  justify-content: center;
  .picker_left {
    width: 150px;
    height: 50px;
    border-radius: 8px 0px 0px 8px;
    border: 1px solid #dcdcdc;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffbb40;
    line-height: 50px;
    text-align: center;
  }
  .picker_right {
    width: 150px;
    height: 50px;
    background: #ffbb40;
    border-radius: 0px 8px 8px 0px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 50px;
    text-align: center;
  }
}
.inp {
  width: 80px;
  text-align: center;
}
.van-cell {
  position: static;
  text-align: center;
  padding: 0;
  margin-left: 10px;
  margin-right: -20px;
}
</style>
