'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
    /**
     * @description 查询菜单列表
     */
    async list() {
        const { ctx } = this;
        const list = await ctx.service.menu.list()
        ctx.body = list;
    }

}

module.exports = MenuController;