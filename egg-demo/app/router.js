'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.index);
  router.get('/user/:id', controller.user.info);
  // pages 相关接口 
  router.get('/page/list', controller.page.list);
  router.post('/page/create', controller.page.create);
  router.put('/page/update', controller.page.update);
  router.delete('/page/delete', controller.page.delete);
};
