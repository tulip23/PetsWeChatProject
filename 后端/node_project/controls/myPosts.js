let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
var session = require('express-session')
let moment = require('moment');

module.exports = {
    // 删除用户
    deleteUser(req, res) {
        // POST方法获取浏览器传来的参数
        let user_id = req.body.user_id;
        func.connPool(sql.delUser, ['user', user_id], rows => {
            res.send({status: 200, msg:'删除成功',rows});
        });

    },

    // 帖子页面渲染
    myPost(req,res){
        // 当前页默认为1
        let pages={};
        pages.list={}
        // pages
        pages.current=req.body.current || 1//当前页
        pages.size= 10
        pages.pages= 0//总行数
        pages.total= 0//总页数
        let sql1='select count(*) row from posts'
        let sql2='select * from posts order by created DESC limit ?,?'
        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            pages.list=rows
            pages.list.forEach((item)=>{
                item.created = moment(item.created).format("YYYY-MM-DD")
            })
            res.json(pages)
        });
    },

    // 查找某一条帖子
    searchOnePost(req,res){
        let user_id = req.body.keyword;
        let created = req.body.created
        if(req.body.keyword == null){
            created = moment(created ).format("YYYY-MM-DD")
            let sql = 'select * from posts where created=?'
            func.connPool(sql,created,(err,rows) => {
                rows.forEach((item)=>{
                    item.created = moment(item.created ).format("YYYY-MM-DD")
                })
                res.json(rows);
            });
        }else{
            if(created != null){
                created = moment(created ).format("YYYY-MM-DD")
            }
            let sql = 'select * from posts where (user_id=?) and (created=? or ? is null)'
            let arr=[user_id,created,created];
            func.connPool(sql,arr,(err,rows) => {
                rows.forEach((item)=>{
                    item.created = moment(item.created ).format("YYYY-MM-DD")
                })
                res.json(rows);
            });
        }
    }

};