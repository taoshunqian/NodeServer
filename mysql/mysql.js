const mysql = require('mysql');
const connection = mysql.createConnection({
    host:"", 
    user: "root",
    password:"",
    port:3306,
    database:"tao",
})
try {
    connection.connect()
} catch(e) {
    console.log("连接失败")
}

module.exports = connection;
