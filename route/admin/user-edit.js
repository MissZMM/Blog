const { User } = require('../../model/user');
module.exports = async (req, res) => {
    //标识当前用户所在的页面是用户管理页面
    req.app.locals.currentLink = 'user';

    //获取地址栏中的id参数以判断操作

    const {message, id} = req.query;
    if (id) {
        //传递了id则是修改操作
        let user = await User.findOne({_id : id});
        //渲染用户编辑页面
        res.render('admin/user-edit', {
            message:message,
            user : user,
            link : '/admin/user-modify?id=' + id,
            button : '修改'
        });
    } else {
        //添加操作
        res.render('admin/user-edit', {
            message:message,
            link: '/admin/user-edit',
            button : '添加'
        });
    }
    res.render('admin/user-edit', {
        message:message
    });
}