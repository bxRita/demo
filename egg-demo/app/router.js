'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.index);
  router.get('/user/:id', controller.user.info);
  /** *******************************************页面构建相关接口, 以/page 开头********************************************** begin */
  // pages 相关接口 
  router.get('/page/list', controller.page.list);
  router.get('/page/find/:id', controller.page.getById);
  router.post('/page/create', controller.page.create);
  router.put('/page/update', controller.page.update);
  router.delete('/page/delete', controller.page.delete);
  // 菜单 相关接口
  router.get('/page/menu/list', controller.menu.list);
  /** *******************************************页面构建相关接口********************************************** end */
};
