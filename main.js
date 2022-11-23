var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 8099;
const router = require("./router/router");
require("dotenv").config({path:".env"}); // 读取配置文件

app.use('/', express.static(__dirname + '/public')); // 加载html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cors()); // 跨域
app.use("/api", router); // api


// 处理错误问题
app.get('*', function (req, res, next) {
	res.sendFile(__dirname+"/public/"+"404.html");
});

app.post('*', function (req, res, next) {
	res.status(500).json({"code":500,msg:"请求有误"});
});

// 端口创建
app.listen(port, function () {
	console.log('http://localhost:8099/')
});


