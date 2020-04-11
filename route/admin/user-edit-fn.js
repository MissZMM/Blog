
//导入用户集合
const { User,validateUser } = require('../../model/user');

const bcrypt = require('bcrypt');
module.exports = async (req, res, next) =>{

    try {
        await validateUser(req.body);
    } catch (e) {
        // console.log(e.message);
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        //JSON.stringfy将对象数据类型转换为字符串数据类型
        return next(JSON.stringify({path:'/admin/user-edit', message: e.message}));
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email:req.body.email})
    if(user) {
        //用户存在，则邮箱已被占用

        return res.redirect(JSON.stringify({path: '/admin/user-edit', message:'邮箱地址已占用'}));

    }
    // 密码加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //将用户信息添加到数据库
    await User.create(req.body);
    res.redirect('/admin/user');
}