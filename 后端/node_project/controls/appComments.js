let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
function format(rows){
    rows.forEach((item) => {
        // 日期格式转化
        let day = item.createdTime
        item.createdTime = moment(day).format("YYYY-MM-DD")
    });
    return rows;
}

module.exports = {
    // 评论页面渲染
    onePosts(req, res) {
        let post_id = req.body.post_id
        let sql = 'select * from posts,user where posts.user_id=user.user_id and post_id=?'
        func.connPool(sql,post_id,(err,rows) => {
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.created
                item.created = moment(day).format("YYYY-MM-DD")
            });
            res.json(rows)
        });
    },

    // 加载评论
    comments(req, res) {
        let post_id = req.body.post_id
        let sql = 'select user.wechaturl,user.user_id,user.user_name,comments.comment_text,comments.parent_id,comments.post_id,comments.id,'+
        'comments.createdTime from comments,user,posts where posts.post_id=comments.post_id and comments.user_id=user.user_id '+ 
        'and comments.post_id=? and comments.parent_id is null'
        let comments=[]
        let sql2='select * from comments where parent_id=?'
        var promise=new Promise((resolve, reject)=>{
            func.connPool(sql,post_id,(err,rows) => {
                comments=format(rows)
                resolve(comments)
            });
        }).then(data=>{
            data.forEach((e,index)=>{
                data[index]['children']=[]
                func.connPool(sql2,e.id,async (err,rows) => {
                    data[index]['children']=format(rows)
                    if(index==(data.length-1)){
                        // 查询用户信息
                        res.json(data)                      
                    }
                });
            })
        })
    },

    // 第三级加载评论
    myComments(req, res) {
        let parent_id = req.body.parent_id
        let sql = 'select * from comments where parent_id=?'
        let comments=[]
        let sql2='select user_name from user where user_id=?'
        var promise=new Promise((resolve, reject)=>{
            func.connPool(sql,parent_id,(err,rows) => {
                comments=format(rows)
                resolve(comments)
            });
        }).then(data=>{
            data.forEach((e,index)=>{
                data[index]['children']=[]
                func.connPool(sql2,e.user_id,async (err,rows) => {
                    data[index]['children']=format(rows)
                    if(index==(data.length-1)){
                        // 查询用户信息
                        res.json(data)                   
                    }
                });
            })
        })
    },

    // 点赞数量增加
    addThumbs(req, res) {
        let id = req.body.id
        let thumbs = req.body.thumbs
        let numberLike = req.body.numberLike
        let sql = 'update comments set numberLike=?,thumbs=? where id=?'
        func.connPool(sql,[numberLike,thumbs,id],(err,rows) => {
            res.json(rows)
        });
    },

    // 浏览数量增加
    addBrowse(req, res) {
        let post_id = req.body.post_id
        let browse = req.body.browse
        let sql = 'update posts set browse=? where post_id=?'
        func.connPool(sql,[browse,post_id],(err,rows) => {
            res.json(rows)
        });
    },

    // 发布评论
    addComments(req, res) {
        let user_id = req.body.user_id
        let post_id = req.body.post_id
        let comment_text = req.body.comment_text
        let parent_id = req.body.parent_id
        let createdTime = moment().format('YYYY-M-D');
        let sql = 'INSERT INTO comments(user_id,post_id,comment_text,parent_id,createdTime) VALUES(?,?,?,?,?)'
        let arr = [user_id,post_id,comment_text,parent_id,createdTime]
        func.connPool(sql,arr,(err,rows) => {
            res.json(rows)
        });
    },

    // 发布回复
    addOthers(req, res) {
        let user_id = req.body.user_id
        let post_id = req.body.post_id
        let comment_text = req.body.comment_text
        let parent_id = req.body.parent_id
        let createdTime = moment().format('YYYY-M-D');
        let responseName = req.body.responseName
        let sql = 'INSERT INTO comments(user_id,post_id,comment_text,parent_id,createdTime,responseName) VALUES(?,?,?,?,?,?)'
        let arr = [user_id,post_id,comment_text,parent_id,createdTime,responseName]
        console.log(arr)
        func.connPool(sql,arr,(err,rows) => {
            res.json(rows)
        });
    },


};