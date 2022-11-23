var express = require('express');
const router = express.Router();
const service = require("../server/taskService");
const postService = require("../server/postService");

for(var i in service) {
    router.get('/' + i,service[i])
}

for(var i in postService) {
    router.post('/' + i,postService[i])
}

module.exports = router;