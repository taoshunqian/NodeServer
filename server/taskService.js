var Sql = require('../mysql/sql');
var RedisClient = require("../redis/index");

async function queryTaskList(req, res) {
    let data = await Sql("select * from node_user_role");
    res.json(data)
}

function getItems(data) {
    let testArr = [];
    let resultArr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].rank == 0) {
            resultArr.push({
                ...data[i],
                chid: []
            })
        } else {
            testArr.push(data[i])
        }
    }
    for (var j = 0; j < resultArr.length; j++) {
        for (let i = 0; i < testArr.length; i++) {
            if (resultArr[j].label_id == testArr[i].rank) {
                resultArr[j].chid.push(
                    testArr[i]
                )
            }
        }
    }
    return resultArr

}

async function getLabel(req, res) {
    let data = await Sql(`
    select no_label.label_name,no_label.rank,no_label.label_id,no_label.label_color,no_label.label_status
    from no_user left join no_label on 
    no_user.user_id = no_label.user_id
    `);
    res.json(getItems(data));
}

async function getIframe(req, res) {
    let data = await Sql("select iframe_name,iframe_url,iframe_id from no_iframe");
    res.json(data)
}

async function getArticle(req, res) {
    let data = await Sql(`
    select * from no_title
    `)
    res.json(data)
}

async function getGirl(req, res) {
    let data = await Sql(`
    select * from no_girl
    `);
    console.log(data);
    res.json(data);
}


async function addLabel(req, res) {
    let data = await Sql("insert into no_label (label_name, user_id, rank) values ( 'ppp', 3, 0)")
    res.json({
        id: data.insertId
    })
}
var num = 0;

// function smembers(name) {
//     new Promise((resolve,reject) => {
//         RedisClient.smembers(name, function(err,v) {
//             resolve(v)
//         })
//     }).catch((e) => {
//         reject("查询失败");
//     })
// }

// let disNum = true;

// async function addTest(req, res) {
//     // console.log(req.query.num);
    
//     // num++;
//     // RedisClient.rpush("user", req.query.num);
//     // RedisClient.lrange("user", 0 , 10, function(err,v) {
//     //     console.log(v)
//     // });
//     // RedisClient.ltrim("user", 0 , 10, function(err,v) {
//     //     RedisClient.lrange("user", 0 , 10, function(err2,v2) {
//     //         console.log(v2)
//     //     });
//     // });
//     //  查询数量
//     RedisClient.scard("user3", async (err,v) => {
//         if(v > 50) {
//             if(disNum) {
//                 disNum = false;
//                 setTimeout(() => {
//                     disNum = true
//                 },1000* 5)
//                 await Sql("update no_test set ww=ww+1 where id = 1");
//             }
//             res.json({
//                 code: 500
//             })
//         } else {
//             // 查询指定元素是否存在
//             RedisClient.sismember("user3",req.query.num,function(err,v) {
//                 if(v == 1) {
//                     res.json({
//                         code: 400
//                     })
//                 } else {
//                     RedisClient.sadd("user3",req.query.num);
//                     res.json({
//                         code: 200
//                     })
//                 }
//             })
//         }
//     })
    
//     // RedisClient.sadd("user",req.query.num);

//     // await RedisClient.hget("user",function(err,v) {

//     // });

//     // RedisClient.hset("user",req.query.num,new Date(), function(err,v) {
//     //     if(!err) {
            
//     //     }else {
//     //         res.json({
//     //             code: 401
//     //         })
//     //     }
//     // })

    

//     // let num = await Sql("select ww from no_test where id = 1");

//     // if(num == 10) {
//     //     res.json({
//     //         msg:"结束"
//     //     })
//     // } else {
//     //     let data = await Sql("update no_test set ww=ww+1 where id = 1")
//     //     res.json(data);
//     // }
// }




module.exports = {
    queryTaskList,
    getLabel,
    addLabel,
    getIframe,
    getArticle,
    getGirl,
    // addTest
}