const express = require('express');
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');
// 导入config模块 ,里面的get()可以获取json里面的配置信息
const config = require('config');
const app = express();
// 数据库连接
require('./model/connect');
//导入express-session模块
const session = require('express-session');
const path = require('path');
//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//config自动判断系统当前的运行环境然后从config文件夹下读取对应的信息
console.log(config.get('title'));

//process是global全局对象下面的属性对象,process.env获取系统环境变量，返回值是对象
if (process.env.NODE_ENV == 'development') {
    //开发环境development
    //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中，'dev'是固定参数
    app.use(morgan('dev'));
} else {
    //生产环境production

}
//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// 关于express的模板配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');


template.defaults.imports.dateFormat = dateFormat;
//配置session
app.use(session({secret: 'secret key'}));

app.use('/admin', require('./middleware/loginGuard'));

//引入body-parser模块，用于拦截请求获取post请求参数,post属性就会保存在req.body中
const bodyParser = require('body-parser');

//处理post请求参数
app.use(bodyParser.urlencoded({extended:false}));


//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串转换为对象类型
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != path) {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

app.listen(80);
console.log('网站服务器启动成功！');