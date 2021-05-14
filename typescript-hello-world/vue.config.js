module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    // 小于10KB的资源内联
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
  }
};
