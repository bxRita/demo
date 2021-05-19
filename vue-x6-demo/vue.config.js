const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  // configureWebpack: {
  //   externals: isProd
  //     ? {
  //         vue: 'Vue',
  //         'vue-router': 'VueRouter',
  //         vuex: 'Vuex'
  //       }
  //     : {}
  // },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(gql|graphql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
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
