const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    //获取客户端传过来的页码
    const page = req.query.page;

    //数据库中查询数据
    let result = await pagination(Article).page(page).size(2).display(3).find().populate('author').exec();

    //渲染模板并传递数据
    res.render('home/default.art', {
        result: result
    });
};