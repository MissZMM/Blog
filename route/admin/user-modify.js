const {User} = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    //接收客户端传递的参数
    const {username, email, role, state, password} = req.body;
    //即将要修改的用户的id
    const id = req.query.id;
    // res.send(body.password);
    let user = await User.findOne({_id : id});

    const isValid = await bcrypt.compare(password, user.password);
   if(isValid) {
       //密码比对成功,将用户信息更新到数据库
       await User.updateOne({_id : id}, {
           username : username,
           email : email,
           role : role,
           state : state
       });
        //重定向页面
       res.redirect('/admin/user');
   } else {
       //密码比对失败
       let obj = {
           path : '/admin/user-edit',
           message : '密码比对失败， 无法修改！',
           id : id
       };
       next(JSON.stringify(obj));
       // res.send('密码比对失败');
   }

}