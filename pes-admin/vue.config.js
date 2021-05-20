const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    devtool: 'inline-cheap-module-source-map',
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'ant-design-vue': 'antd'
    },
    plugins: [new VueLoaderPlugin()]
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

    config.module
      .rule('vue')
      .test(/\.(vue)$/)
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return options
      })
  },
  runtimeCompiler: true,
  outputDir: 'dist',
  devServer: {
    port: 8080,
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
