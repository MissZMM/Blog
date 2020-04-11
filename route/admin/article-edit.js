module.exports = (req, res) => {
    //标识当前用户所在的页面是文章管理页面
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit.art');
}