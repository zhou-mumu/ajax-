// 引入express模块
const express = require('express');
// 引入path模块
const path = require('path');
// 实现session功能
var session = require('express-session');
// 接收post请求参数
const formidable = require('formidable');

// 创建web服务器
const app = express();
// 实现session功能
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
// 静态资源访问功能
app.use(express.static(path.join(__dirname,'public')));


app.use((req,res,next) => {
// 1.允许哪些客户端访问我
    // *代表允许所有的客户端访问我
    // 注意：如果跨域请求中涉及到cookie信息传递，值不可为*
    res.header('Access-Control-Allow-Origin','http://localhost:3000');
    // 2.允许客户端使用哪些请求方法访问我
    res.header('Access-Control-Allow-Methods','get,post');
    // 允许客户端发送跨域请求时携带cookie信息
    res.header('Access-Control-Allow-Credentials',true);
    next();
})

app.post('/login', (req, res) => {
	// 创建表单解析对象
	var form = formidable.IncomingForm();
	// 解析表单
	form.parse(req, (err, fields, file) => {
		// 接收客户端传递过来的用户名和密码
		const { username, password } = fields;
		// 用户名密码比对
		if (username == 'zhoubang' && password == '123456') {
			// 设置session
			req.session.isLogin = true;
			res.send({message: '登录成功'});
		} else {
			res.send({message: '登录失败, 用户名或密码错误'});
		}
	})
});

app.get('/checkLogin', (req, res) => {
	// 判断用户是否处于登录状态
	if (req.session.isLogin) {
		res.send({message: '处于登录状态'})
	} else {
		res.send({message: '处于未登录状态'})
	}
});

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

app.get('/cross',(req,res) => {
    
    res.send('hi');
})

// 监听端口
app.listen(3001);
// 控制台提示输出
console.log('服务器开启成功');

