// 导入用户集合构造函数
const {User} = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports  = async (req, res) => {
    //接收请求参数
    const {email, password} = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {msg:'邮件地址或密码错误'})
    }
    // 根据邮箱地址查询用户信息
    //es6中{{email:email}}键值相同可只写一个
    //如果查询到了用户，user变量的值是对象类型,对象中存储的是用户信息
    //没有查询到用户，user变量的值是空
    let user = await User.findOne({email});
    if (user) {
        //将客户端传递的密码和用户信息中的密码比对
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            req.session.role = user.role;
            // res.send('登陆成功');
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user')
            } else {
                //重定向博客首页
                res.redirect('/home/');
            }

        }else {
            res.status(400).render('admin/error',{msg: '邮箱地址或密码错误'});
        }
    }else {
        //没有查询到用户
        res.status(400).render('admin/error',{msg: '该用户不存在'});
    }

}
