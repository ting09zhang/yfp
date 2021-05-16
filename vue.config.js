const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  lintOnSave: false,
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        target: 'http://shop.98chihuo.com/', // 要代理的服务器地址  这里不用写 api
        changeOrigin: true // 是否跨域
        // 重写路径
        // pathRewrite: {}
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
