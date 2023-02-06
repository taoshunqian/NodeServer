var Sql = require('../mysql/sql');

class LoginModel {
    // 获取页面中按钮的权限
    static async getViewRole(roleId, routerId) {
        let data = await Sql(`select * from 
        node_backstage_role_view_show where role_id=${roleId} 
        and router_id=${routerId}`);
        return data;
    }
    // 获取路由信息
    static async getRoleRouter(roleId) {
        let data = await Sql(`select title,router_id as id,
    router_role_id as roleId,router_grade as grade,
    router_ascription as ascription,router_order 
    from node_backstage_role_router where router_role_id=${roleId}`);
        return data;
    }
}

module.exports = LoginModel;