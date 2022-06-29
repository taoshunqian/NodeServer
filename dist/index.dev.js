"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var router = require("./router/router");

var Create = require('./mysql/createMysql');

var dotenv = require("dotenv");

dotenv.config("./env");
Create.create();
app.use('/', express["static"](__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/", router);
app.listen(8099, function () {
  console.log('http://localhost:8099/');
});