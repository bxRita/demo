/*
 * FilePath: \src\settings.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-04-25 14:37:07
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
module.exports = {
  system: {
    /**
     * 基础部署路径
     *
     * 默认情况下，我们假设你的应用将被部署在域的根目录下,
     * 例如：https://www.my-app.com/
     * 默认：'/'
     * 如果您的应用程序部署在子路径中，则需要在这指定子路径
     * 例如：https://www.foobar.com/my-app/
     * 需要将它改为'/my-app/'
     */
    baseUrl: process.env.BASE_URL || '/',
    /**
     * token提交给服务端时的head，与服务端交互时TOKEN本次存储和提交给服务端的Key名称
     */
    tokenName: process.env.VUE_APP_TOKEN_KEY_NAME || 'Authorization'
  },
  /**
   * 服务端配置
   */
  services: {
    /**
     * GraphQL服务基础路径
     */
    graphql:
      process.env.VUE_APP_SERVICE_GRAPHQL_ENDPOINT ||
      'http://localhost:4000/graphql/',
    /**
     * RESTful服务基础路径
     */
    rest: process.env.VUE_APP_SERVICE_RESTFUL_ENDPOINT || '/terminals/'
  }
}
