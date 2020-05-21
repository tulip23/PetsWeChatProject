let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
let multer = require('multer');
let path = require('path');
function format(rows){
    rows.forEach((item) => {
        // 日期格式转化
        let day = item.createdTime
        item.createdTime = moment(day).format("YYYY-MM-DD")
    });
    return rows;
}

// 小程序宠物信息页面渲染
module.exports = {
        // 加载帖子
        allPosts(req, res) {
            let sql = 'select * from posts,user where posts.user_id=user.user_id order by created DESC'
            let comments=[]
            let sql2 = "select * from images_url where doc_id=?"
            var promise=new Promise((resolve, reject)=>{
                func.connPool(sql,(err,rows) => {
                    rows.forEach((item)=>{
                        item.created = moment(item.created).format("YYYY-MM-DD")
                    })
                    comments=rows
                    resolve(comments)
                });
            }).then(data=>{
                data.forEach((e,index)=>{
                    data[index]['children']=[]
                    if(e.doc_id==null){
                        e.doc_id=-1
                    }
                    func.connPool(sql2,e.doc_id,async (err,rows) => {
                        data[index]['children']=rows
                        if(index==(data.length-1)){
                            res.json(data)                      
                        }
                    });
                })
            })
        },

    // 点赞数量增加
    addLike(req, res) {
        let post_id = req.body.post_id
        let good = req.body.good
        let likeNumber = req.body.likeNumber
        let sql = 'update posts set likeNumber=?,good=? where post_id=?'
        func.connPool(sql,[likeNumber,good,post_id],(err,rows) => {
            res.json(rows)
        });
    },

    // 查询最大image的id
    selectPost(req,res){
        let sql = 'select ifnull(max(doc_id),0)+1 doc_id from images_url'
        func.connPool(sql,(err, rows) => {
            res.json(rows)
        });
    },

    
    // 发表文字
    sendComment(req,res){
        let user_id = req.body.user_id
        let content = req.body.content
        let browse = 0
        let good = 2
        let likeNumber = 0
        let post_id = req.body.post_id
        let doc_id = req.body.doc_id
        let created = moment().format('YYYY-M-D');
        let sql = 'insert into posts(post_id,user_id,content,created,browse,good,likeNumber,doc_id) values(null,?,?,?,?,?,?,?)'
        let arr2 = [user_id,content,created,browse,good,likeNumber,doc_id]
        func.connPool(sql,arr2,(err, rows) => {
            res.json(rows)
        });
    },

    // 发帖上传文件
    uploadImage(req,res){
        let fileName = req.files[0].filename
        let doc_id=req.body.doc_id
        let created_time = moment().format('YYYY-M-D');
        let url  = `http://image.jt.com/uploads/${created_time}/${fileName}`
        let sql2 = 'insert into images_url(doc_id,created_time,url) values(?,?,?)'
        let arr = [doc_id,created_time,url]
        func.connPool(sql2,arr,(err, rows) => {
            res.send({code: 200, msg: 'done',url:'url'});
        });
    },

    // 删除帖子
    delPost(req,res){
        let post_id = req.body.post_id
        console.log(post_id)
        let sql1 = 'delete from posts where post_id=?'
        let sql2 = 'delete from comments where post_id=?'
        func.connPool(sql1,post_id,(err, rows) => {
            console.log('删除成功')
        });
        func.connPool(sql2,post_id,(err, rows) => {
            res.send({code: 200, msg: 'done'});
        });
    },

    // 我的评论记录
    initComments(req,res){
        let user_id = req.body.user_id
        console.log(user_id)
        let sql = 'select * from comments where user_id=?'
        // let sql2 = 'delete from comments where post_id=?'
        func.connPool(sql,user_id,(err, rows) => {
            rows.forEach((item)=>{
                item.createdTime = moment(item.createdTime).format('YYYY-M-D')
            })
            res.send(rows);
        });
    },

    // 删除评论
    delComments(req,res){
        let id = req.body.id
        console.log(id)
        let sql = 'delete from comments where id=?'
        func.connPool(sql,id,(err, rows) => {
            res.send({code: 200, msg: 'done'});
        });
    },
};