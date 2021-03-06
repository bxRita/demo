'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
    /**
     * @description 页面创建
     */
    async create() {
        const { ctx } = this;
        const {name, desc, content} = ctx.request.body
        const page = await ctx.service.page.create(name, content, desc)
        ctx.body = page;
    }
    /**
     * @description 页面更新
     */
    async update() {
        const { ctx } = this;
        const {id, name, desc, content} = ctx.request.body
        // console.log(ctx.request.body)
        const page = await ctx.service.page.update(id, name, content, desc)
        ctx.body = page;
    }
    /**
     * @description 页面删除
     */
    async delete() {
        const { ctx } = this;
        const {id} = ctx.request.body
        const page = await ctx.service.page.delete(id)
        ctx.body = page;
    }
    async getById() {
        const { ctx } = this;
        const pageId = ctx.params.id;
        const page = await ctx.service.page.findById(pageId);
        ctx.body = page;
    }
    /**
     * @description 查询页面列表
     */
    async list() {
        const { ctx } = this;
        const {pageNo, pageSize} = ctx.query
        const list = await ctx.service.page.list(pageNo, pageSize)
        ctx.body = list;
    }

}

module.exports = PageController;
