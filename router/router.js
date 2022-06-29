var express = require('express');
const router = express.Router();
const service = require("../server/taskService");

for(var i in service) {
    router.get('/' + i,service[i])
}

module.exports = router;