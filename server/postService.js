var Sql = require('../mysql/sql');
const promiseRedis = require('../redis/index');
const validatorInfo = require('../validator/index');
const statusCode = require('../code/index');
const LoginModel = require('../model/login');

async function OrderList(req, res) {
    res.json({ code: 200 });
}

async function delayAsync(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

let hostArr = [];
async function isSuc(host) {
    return await hostArr.includes(host);
}

let reqNum = 0;
let reqArr = [];
let reqIdArr = [];

async function production(req, res) {
    await delayAsync(1);
    if (reqNum < 10) {
        // var isNot = await isSuc(req.headers.host); // 校验 ip 只能抢购一次
        // if(isNot) {
        //     res.status(404).json({ code: 404 });
        //     return false;
        // }
        reqArr.push({ name: Math.random(), time: new Date(), address: req.headers.host });
        // reqIdArr.push(req.body.userName);
        // hostArr.push(req.headers.host);
        if (reqArr.length == 10) {
            // let res = await promiseRedis.lpush(['shopId', ...reqIdArr ]);
            // let res2 = await promiseRedis.sadd(['shopId2', ...hostArr ]);
            // console.warn(res);
            // console.warn(res2);
            console.log(reqArr);
        }
        res.json({ code: 200 });
    } else {
        res.status(404).json({ code: 404 });
    }
    reqNum++;
}


async function login(req, res) {
    let data = await Sql(``);
}

// 排序
function BubbleSort(ary) {
    for (var i = 0; i < ary.length - 1; i++) {
        for (var j = i + 1; j < ary.length; j++) {
            var current = ary[i]['order'];
            if (current > ary[j]['order']) {
                var tmp = ary[j]['order'];
                ary[j]['order'] = current;
                ary[i]['order'] = tmp;
            }
        }
    }
    return ary;
}

// 递归排序
function routerInfo(id, router,roleId) {
    var data = [];
    for (var i = 0; i < router.length; i++) {
        var item2 = router[i]['roleId'].split(",");
        if (router[i]['ascription'] == id && item2.includes(roleId.toString())) {
            var item = {
                ...router[i],
                "children": routerInfo(router[i]['id'], router,roleId)
            }
            data.push(item);
        }
    }
    return BubbleSort(data);
}

// 获取路由信息
async function getRoleRouter(req, res) {
    await delayAsync(1);

    let { roleId } = req.body;
    if (!validatorInfo.validatorInt(roleId)) {
        res.json({
            "code": 400,
            "msg": "roleId 必须为数字"
        })
        return false;
    }
    let data = await LoginModel.getRoleRouter(roleId);
    let router = [];

    for (var i = 0; i < data.length; i++) {
        var item = data[i]['roleId'].split(",");
        if (item.includes(roleId)) {
            router.push({
                ...data[i],
                "children": routerInfo(data[i]['id'], data,roleId)
            });
        }
    }
    res.json({
        "code": 200,
        "msg": "成功",
        router
    })
}


async function getViewRole(req, res) {
    await delayAsync(1);

    let { roleId, routerId } = req.body;

    if (!validatorInfo.validatorInt(roleId) || !validatorInfo.validatorInt(routerId)) {
        res.json({
            "code": 400,
            "msg": "roleId,routerId 必须为数字"
        })
        return false;
    }

    let data = await LoginModel.getViewRole(roleId,routerId);
    let dataArr = [];
    for(var i=0;i<data.length;i++) {
        dataArr.push({
            "title": data[i]['title'],
            "class": data[i]['class'],
        })
    }
    res.json({
        "code": 200,
        "msg": "成功",
        dataArr
    })
}

module.exports = {
    OrderList,
    production,
    getRoleRouter,
    getViewRole
}