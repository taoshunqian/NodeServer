var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const app = express();
const RedisClient = require('./redis/index');


const port = 8099;
const router = require("./router/router");
require("dotenv").config({ path: ".env" }); // 读取配置文件


app.use('/', express.static(__dirname + '/public')); // 加载html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cors()); // 跨域

app.use(session({
	secret: 'keybardcat',
	resave: true,
	saveUninitialized: false,
	store: new redisStore({
		client: RedisClient
	}),
	rolling: true,
	genid: req => {
		if (req.url == '/api/login') {
			// console.log(req.body.userName);
			let nickName = req.body;
			return `${nickName.userName}/${parseInt(Math.random()) * 1000}`
		}
	},
	cookie: {
		maxAge: 1 * 1000
	}
}));
app.use(function (req, res, next) {
	if (req.url == '/api/login') {
		let nickName = req.body;
		RedisClient.keys(`sess:${nickName.userName}/*`, (err, reply) => {
			if (!err && reply.length > 0) {
				RedisClient.del(reply(0));
			} else {
				console.log(reply.length)
			}
		})
		next();
	} else {
		if (req.sessionID == undefined) {
			res.status(401).send({
				message: '异地登录',
				code: 0
			});
		} else {
			// 不过期继续操作
			next()
		}
	}
});

app.use("/api", router); // api







// 处理错误问题
app.get('*', function (req, res, next) {
	res.sendFile(__dirname + "/public/" + "404.html");
});

app.post('*', function (req, res, next) {
	res.status(500).json({ "code": 500, msg: "请求有误" });
});

// 端口创建
app.listen(port, function () {
	console.log('http://localhost:8099/')
});


