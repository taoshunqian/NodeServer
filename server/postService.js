var Sql = require('../mysql/sql');

async function OrderList(req,res) {
    res.json({code:200});
}

async function login(req,res) {
    res.json({code: 200})
}

module.exports = {
    OrderList,
    login
}