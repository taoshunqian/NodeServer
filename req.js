const request  = require('request');
var RedisClient = require("./redis/index");
// var num = 0

function api(num) {
    request.get("http://localhost:8099/addTest?num=" + num, function(error,response,body) {
        if(response.statusCode == 200) {
            if(JSON.parse(body).code == 500) {
                num++
                console.log(num)
            }
        }
    })
}

for(var i=0;i<100;i++) {
    api(i)
}

// RedisClient.sadd("user3","value","value")
// RedisClient.EXPIRE("user", 600, function(err,v) {
//     if(v==1) {
//         console.log("设置成功")
//     }
// })
// RedisClient.smembers("user3", function(err,v) {
//     console.log(v)
// })

// for(var i=0;i<100;i++) {
//     api(i)
// }

// RedisClient.hset("user", "key","value5")
// RedisClient.hset("user", "key2","value5")
// RedisClient.hset("user", "key3","value5")

// RedisClient.hget("user","key",function(err,v) {
//     console.log(v)
// })
// RedisClient.hgetall("user",(err,v) => {
//     console.log(v)
// })