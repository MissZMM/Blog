const Joi = require('joi');
//导入bcrypt
const bcrypt = require('bcrypt');
//创建用户集合
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址无重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        //admin:超级管理员
        //normal：普通用户
        type: String,
        required: true,
    },
    state: {
        //0:启用状态
        //1：禁用状态
        type: Number,
        default:0
    }
})
//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'itheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// createUser();
// User.create({
//     username: '李四',
//     email: 'lisi@itcast.cn',
//     password: 'pass',
//     role: 'normal',
//     state: 0
// });



//验证用户信息
const validateUser = (user) => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名没有通过验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid(['normal', 'admin']).required().error(new Error('角色值不符合要求')),
        state: Joi.number().valid([0, 1]).required().error(new Error('状态值非法'))

    };
    return  Joi.validate(user, schema);
};

//将用户集合作为模块成员导出
module.exports = {
    //键值相同时可直接写成User（User: User）
    User,
    validateUser
};