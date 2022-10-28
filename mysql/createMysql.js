var Sql = require('./sql');

class Create {
    constructor() {

    }
    // 删除所有的表
    async delete() {
        var res = await Sql(`SELECT concat('DROP TABLE IF EXISTS', table_name, ';') 
        FROM information_schema.tables WHERE table_schema='tao';`);
        var res = await Sql(`DROP TABLE IF EXISTS node_user_info`);
        var res = await Sql(`DROP TABLE IF EXISTS node_user_role`);
    }


    async create() {
        var head = "node_";
        var table = `${head}user_info`;
        // 创建用户表
        var res = await Sql(`CREATE TABLE IF NOT EXISTS ${table}(
            user_id INT UNSIGNED AUTO_INCREMENT,
            user_tel INT(11) NOT NULL COMMENT '用户手机号',
            user_name CHAR(40) NOT NULL COMMENT '用户名称',
            user_image VARCHAR(100) NOT NULL COMMENT '用户相片',

            user_password CHAR(50) NOT NULL COMMENT '用户密码',
            user_role VARCHAR(100) NOT NULL COMMENT '用户角色',
            user_address VARCHAR(500) NOT NULL COMMENT '用户地址',

            user_gender enum('男','女','保密'),

            create_date DATE COMMENT '创建时间',
            update_date DATE COMMENT '最后一次更新时间',
            last_date DATE COMMENT '最新一次登录',
            PRIMARY KEY (user_id)
         )ENGINE=InnoDB DEFAULT CHARSET=utf8;`);

        var res = await Sql(`SELECT table_name 
         FROM information_schema.TABLES WHERE table_name ='${table}'`);
        if (res.length == 0) {
            console.log(table + " ceate error");
            return false
        } else {
            console.log(table + " ceate success");
        }
        // 用户权限
        var res = await Sql(`CREATE TABLE IF NOT EXISTS ${head}user_role(
            role_id INT UNSIGNED AUTO_INCREMENT,

            role_title VARCHAR(10) NOT NULL COMMENT '名称',
            role_note VARCHAR(40) NULL COMMENT '备注',

            create_date DATE COMMENT '创建时间',
            update_date DATE COMMENT '最后一次更新',

            PRIMARY KEY (role_id)
         )ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
        //  判断表是否存在
        var res = await Sql(`SELECT table_name 
         FROM information_schema.TABLES WHERE table_name ='${head}user_role'`);
        if (res.length == 0) {
            console.log(head + "user_role ceate error");
            return false
        } else {
            console.log(head + "user_role ceate success");
        }

        // 订单状态
        var res = await Sql(`CREATE TABLE IF NOT EXISTS ${head}order_status(
            status_id INT UNSIGNED AUTO_INCREMENT,
            status_name VARCHAR(10) NOT NULL COMMENT '名称',
            PRIMARY KEY (status_id)
         )ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
        //  判断表是否存在
        var res = await Sql(`SELECT table_name 
        FROM information_schema.TABLES WHERE table_name ='${head}order_status'`);
        if (res.length == 0) {
            console.log(head + "order_status ceate error");
            return false
        } else {
            console.log(head + "order_status ceate success")
        }
        // 订单详情
        var res = await Sql(`CREATE TABLE IF NOT EXISTS ${head}order(
            order_id INT UNSIGNED AUTO_INCREMENT,
            order_title CHAR(50) NOT NULL COMMENT '名称',
            order_note VARCHAR(200) NULL COMMENT '备注',
            
            order_state INT NOT NULL COMMENT '订单状态',

            order_content VARCHAR(400) NOT NULL COMMENT '订单内容', 
            order_play CHAR(50) NOT NULL COMMENT '订单金额',

            order_create_user INT NOT NULL COMMENT '创建订单用户',
            order_point_user INT NOT NULL COMMENT '指向订单用户/商家',

            order_serve_date DATETIME NULL COMMENT '服务时间',
            
            order_create_date DATE COMMENT '创建时间',
            order_update_date DATE COMMENT '最后一次更新',
            
            PRIMARY KEY (order_id)
         )ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
        //  判断表是否存在
        var res = await Sql(`SELECT table_name 
        FROM information_schema.TABLES WHERE table_name ='${head}order'`);
        if (res.length == 0) {
            console.log(head + "order ceate error");
            return false
        } else {
            console.log(head + "order ceate success")
        }




        // var res = await Sql(`alter table ${table} add constraint
        //  user_role foreign key(user_role)
        //  references ${head}user_role(role_id)`);


    }

}

module.exports = new Create();