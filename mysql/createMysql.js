var Sql = require('./sql');

class Create {
    constructor() {
    }
    async create() {
        var res = await Sql(`SELECT table_name 
         FROM information_schema.TABLES WHERE table_name ='runoob_tbl'`)
        //  if(res.length == 0) {
        //      console.log("不存在")
        //  } else {
        //      console.log('无需创建')
        //      return false
        //  }
        console.log(res);
        return false;
        var res = await Sql(`CREATE TABLE IF NOT EXISTS runoob_tbl(
            runoob_id INT UNSIGNED AUTO_INCREMENT,
            user_id INT NOT NULL COMMENT '用户id',
            runoob_title VARCHAR(100) NOT NULL COMMENT '标题',
            runoob_author VARCHAR(40) NOT NULL COMMENT '66',
            submission_date DATE COMMENT '时间',
            PRIMARY KEY (runoob_id)
         )ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
         console.log(res)
        //  判断表是否存在
         
         
        // var res = await Sql(`alter table runoob_tbl add constraint
        //  runoob_id foreign key(runoob_id_user_id)
        //  references no_user(user_id)`)
         
    }
}

module.exports = new Create();