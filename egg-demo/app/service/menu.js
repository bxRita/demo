const Service = require('egg').Service;

class MenuService extends Service {

// 查询页面列表
    async list() {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const list = await this.app.mysql.select('menus',{
            orders: [['parentId','asc'], ['order','asc']]
        });
        return list;
    }
}

module.exports = MenuService;