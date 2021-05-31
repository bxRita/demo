'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // test
  router.get('/', controller.user.index);
  router.get('/user/:id', controller.user.info);
  /** *******************************************页面构建相关接口, 以/page 开头********************************************** begin */
  // pages 相关接口 
  require('./router/page')(app);
  /** *******************************************页面构建相关接口********************************************** end */
};
