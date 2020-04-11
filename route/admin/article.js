const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page;
    //标识当前用户所在的页面是文章管理页面
    req.app.locals.currentLink = 'article';

    //查询所有文章数据
    // let articles = await Article.find().populate('author');
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    //
    // res.send(articles);

    res.render('admin/article.art', {
        articles: articles
    });
};