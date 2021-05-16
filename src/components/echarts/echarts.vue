<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  props: {
    option: {
      type: Array,
      default: () => ['起', '一周', '两周', '三周', '四周', '五周']
    },
    listData: {
      type: Array,
      // default: () => [],
      require: true
    }
  },
  data() {
    return {
      myChart: '',
      list: [],
      options: []
    }
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      let option = {
        // title: {
        //   text: "ECharts 入门示例"
        // },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ["销量"]
        // },
        xAxis: {
          type: 'category',
          data: this.options,
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.list,
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#fdd282' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#fff' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: '#ffca69'
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option)
    }
  },
  mounted() {
    this.drawChart()
    window.onresize = function() {
      //重置容器高宽
      // resizeWorldMapContainer()
      this.myChart.resize()
    }
  },
  watch: {
    listData: {
      handler(newVal) {
        this.list = newVal
        this.drawChart()
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(newVal) {
        this.options = newVal
        this.drawChart()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 690px;
  height: 444px;
}
</style>
