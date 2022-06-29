var connection = require('./mysql');

const Sql = function(item) {
    return new Promise((resolve,reject) => {
        connection.query(item, function (req, result) {
            resolve(result);
        })
    })
}

module.exports = Sql