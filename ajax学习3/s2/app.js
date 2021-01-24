// 引入express模块
const express = require('express');
// 引入path模块
const path = require('path');

// 创建web服务器
const app = express();
// 静态资源访问功能
app.use(express.static(path.join(__dirname,'public')));

app.get('/test', (req, res) => {
    const result = 'fn({name: "周棒"})';
    res.send(result);
});

app.get('/better', (req, res) => {
    //接受客户端传递过来的函数名称
    // const fnName = req.query.callback;
    // const result = fnName + '({name: "周棒"})';
    // res.send(result);
    res.jsonp({name:'lisi',age:20});
});

// 监听端口
app.listen(3001);
// 控制台提示输出
console.log('服务器开启成功');