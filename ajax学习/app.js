//引入express模块
const express = require('express');
// 路径处理模块
const path = require('path');

const bodyParser = require('body-parser');

//创建web服务器
const app = express();

app.use(bodyParser.json());

//静态资源访问服务功能
app.use(express.static(path.join(__dirname,'public')));

app.get('/first',(req,res) => {
    res.send('Hello');
});

app.get('/responseData',(req,res) => {
    res.send({"name":"zhushumei"});
})

app.get('/get',(req,res) => {
    res.send(req.query);
})

app.post('/post',(req,res) => {
    res.send(req.body);
})

app.post('/json',(req,res) => {
    res.send(req.body);
})

app.get('/readystate',(req,res) => {
    res.send('hello');
})

app.get('/error',(req,res) => {
    res.status(400).send('not ok');
})
//监听端口
app.listen(3000);
//控制台提示输出
console.log('服务器启动成功');