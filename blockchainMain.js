const bodyParser = require('body-parser');  //HTTP请求体解析中间件
const express = require('express')
const app = express()
app.use(bodyParser.json());

app.listen(8000, () => console.log('app listening on:localhost:8000...\nblockchain is running...'));