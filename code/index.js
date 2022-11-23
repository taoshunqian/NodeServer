module.exports = function statusCode(code,obj) {
    var data = {};
    switch(code) {
        case 200:
            data = {
                code: 200,
                data: obj
            }
            break;
            
    }
}