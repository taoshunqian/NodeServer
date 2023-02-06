module.exports = function statusCode(code,obj) {
    var data = {};
    switch(code) {
        case 200:
            data = {
                code: 200,
                msg: "成功",
                data: obj
            }
            break;
            
    }
}