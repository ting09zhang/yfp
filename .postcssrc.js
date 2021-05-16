module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {

      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
// postcss配置文件  rootValue指定根元素大小,默认分为10份,vant组件库默认适配375的屏幕,
// 但我们的设计稿是750,所以要通过函数的方式设置不同的适配方案
