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




module.exports = {
    queryTaskList,
    getLabel,
    addLabel,
    getIframe,
    getArticle,
    getGirl,
}