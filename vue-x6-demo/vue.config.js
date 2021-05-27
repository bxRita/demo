const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  configureWebpack: {
    devtool: 'inline-cheap-module-source-map',
    externals: isProd
      ? {
          // vue: 'Vue',
          // 'vue-router': 'VueRouter',
          // vuex: 'Vuex',
          // 'ant-design-vue': 'antd'
        }
      : {}
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(gql|graphql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
    // 增加在线编辑器插件
    config
      .plugin('MonacoWebpackPlugin')
      .use(require('monaco-editor-webpack-plugin'))
  },
  runtimeCompiler: true,
  outputDir: 'dist',
  devServer: {
    port: 8088,
    proxy: {
      '/graphql': {
        target: 'http://172.26.166.31:9199',
        https: true,
        secure: false,
        changeOrigin: true
      }
    }
  }
}
