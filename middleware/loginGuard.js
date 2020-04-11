const guard = (req, res, next) => {
    // 判断用户访问的是否登陆页面
    // 如果用户是登录的，将请求放行， 否则将请求重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        if (req.session.role == 'normal') {
            //用户登录且是普通用户重定向并阻止向下执行
            return res.redirect('/home/')
        }

        //用户是登录状态，将请求放行保存
        next();
    }

};
module.exports = guard;