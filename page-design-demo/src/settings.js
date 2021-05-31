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
     * token提交给服务端时的head，与服务端交互时TOKEN本次存储和提交给服务端的Key名称
     */
    tokenName: process.env.VUE_APP_TOKEN_KEY_NAME || 'Authorization'
  },
  /**
   * 服务端配置
   */
  services: {
    /**
     * RESTful服务基础路径
     */
    rest:
      process.env.VUE_APP_SERVICE_RESTFUL_ENDPOINT || 'http://127.0.0.1:7001/'
  }
}
