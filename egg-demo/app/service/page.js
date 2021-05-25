const Service = require('egg').Service;

class PageService extends Service {
    // 创建页面
    async create(name, content,desc) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const page = await this.app.mysql.insert('pages', {
            name,
            content,
            desc
        });
        return page;
    }
    // 更新页面
    async update(id, name, content,desc) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const page = await this.app.mysql.update('pages', 
        { // 待更新的数据项
            name,
            content,
            desc
        },{// 更新条件
            where: {
                id
            }
        });
        return page;
    }
    // 删除页面
    async delete(id) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const page = await this.app.mysql.delete('pages', 
        { 
            id
        });
        return page;
    }
    // 查询页面列表
    async list(po, ps) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const list = await this.app.mysql.select('pages', {
            // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
            // columns: ['author', 'title'], // 要查询的表字段
            // orders: [['created_at','desc'], ['id','desc']], // 排序方式
            offset: (po-1)*ps, // 返回数据量
            limit: ps // 数据偏移量
        });
        return list;
    }
}

module.exports = PageService;