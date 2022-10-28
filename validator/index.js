const validator = require('validator');

function isEmpty(error) {
    return error == undefined ||
        error === null ||
        (typeof error == "object" && Object.keys(error).length === 0) ||
        (typeof error == "string" && error.trim().length === 0)
}

function validatorLoginInput(data) {
    let error = {};
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        error.password = "密码的长度只能在6到30之间";
    }
    if (validator.isEmpty(data.email)) {
        error.email = "邮箱不能为空";
    }
    return {
        error,
        isValidate: isEmpty(error)
    }
}

module.exports = {
    validatorLoginInput
}