const mysql = require('mysql');
const DATADB = require('../config');
var pingInterval;
const connection = mysql.createConnection({
    host: DATADB.mysql.host,
    user: DATADB.mysql.user,
    password: DATADB.mysql.password,
    port: DATADB.mysql.port,
    database: DATADB.mysql.database,
});

try {
    clearInterval(pingInterval);
    pingInterval = setInterval(() => {
        connection.ping((err) => {
            if (err) {
                console.log('ping error: ' + JSON.stringify(err));
            }
        });
    }, 20 * 1000);
    connection.connect()
} catch (e) {
    console.log("连接失败")
}

module.exports = connection;
