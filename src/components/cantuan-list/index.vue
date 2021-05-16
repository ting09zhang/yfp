<template>
  <div>
    <div>
      <van-cell is-link v-for="(item, index) in lists" :key="index">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="cell">
            <img :src="item.group_avatarUrl" />
            <span class="custom-title">{{ item.group_nickname }}</span>
          </div>
        </template>

        <template #right-icon>
          <div class="right-flex">
            <div>
              <p>还差{{ item.people - item.actual_people }}人成团</p>
              <div class="timeText">距结束 {{ item.timeText }}</div>
            </div>
            <div class="btn-right" @click="joinTeam(item)">去参团</div>
          </div>
        </template>
      </van-cell>

    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: '',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        lists: this.list,
        timer: [],
        timeShow: [],
      }
    },
    methods: {
      joinTeam(item) {
        if (this.token) {
          this.$router.push('/goods_details?id='+ item.goods_id+'&active_id='+item.active_id)
        } else {
          this.$router.push('/my')
          this.$toast('请先登录!')
        }
      }, //取倒计时（天时分秒）
      getTimeLeft(time1) {
        // 计算目标与现在时间差（毫秒）
        // let time1 = new Date().getTime()+(45*1000*60);
        let time2 = new Date().getTime().toString().substr(0, 10);;
        let mss = Number(time1) - Number(time2);
        // console.log("time2" + time2);
        // console.log("time1" + time1);
        // 将时间差（毫秒）格式为：天时分秒
        let days = parseInt(mss / (60 * 60 * 24));
        let hours = parseInt((mss % (60 * 60 * 24)) / (60 * 60));
        let minutes = parseInt((mss % (60 * 60)) / (60));
        let seconds = parseInt((mss % 60));
        return days + "天" + hours + "时" + minutes + "分" + seconds + "秒"
      },
      myCounDown(i) {
        // console.log(Math.random()*500+500);
        // alert(i)
        // console.log(this.lists[i].end_time)
        this.timeShow[i] = this.getTimeLeft(this.lists[i].end_time);
        // this.lists[i].timeText = this. timeShow[i]
        // console.log(this.timeShow[i]);
        this.$set(this.lists[i], 'timeText', this.timeShow[i])
        if (this.timeShow == "0天0时0分0秒") {
          clearInterval(this.timer[i]);
        }
      },
      counDown() {
        for (var i = 0; i < this.lists.length; i++) {
          this.timer[i] = setInterval(this.myCounDown, Math.random() * 500 + (100 * i), i);
          // 倒计时
        }
      }
    },
    created() {
      console.log(this.lists);
      var _this = this
      setTimeout(() => {
        _this.counDown();
      }, 300)
    },
    beforeDestroy() {
      for (var i = 0; i < this.lists.length; i++) {
        clearInterval(this.timer[i]);
      }
    },
    computed: {
      ...mapGetters(['token'])
    }
  }

</script>
<style lang="less" scoped>
  .cell {
    display: flex;
    align-items: center;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }

  .custom-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
  }

  .right-flex {
    height: 65px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: right;

    div {
      padding-right: 15px;

      p {
        font-size: 28px;
        font-weight: 600;
        color: #2d2f33;
        text-align: right;
      }

      div {
        font-size: 20px;
        color: #999;
      }
    }
  }

  .btn-right {
    padding: 3px 10px;
    background: linear-gradient(225deg, #f494ca 0%, #f655a8 100%);
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-size: 24px;
  }

</style>
