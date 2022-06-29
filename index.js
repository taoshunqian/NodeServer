var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const router = require("./router/router");
const Create = require('./mysql/createMysql')

let dotenv = require("dotenv");
dotenv.config("./env");
//  检测数据库
Create.create()

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use("/",router);


app.listen(8099, function () {
	console.log('http://localhost:8099/')
})