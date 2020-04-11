// 博客的展示页面路由
const express = require('express');
const home = express.Router();


home.get('/', require('./home/index'));
home.get('/article', require('./home/article'));

//创建文章评论功能路由
home.post('/comment', require('./home/comment'));
 module.exports = home;