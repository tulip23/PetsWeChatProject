let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let log=require('../log/logger')

module.exports = {
    // 用户信息页面渲染
    searchAll(req, res) {
        // 当前页默认为1
        let pages={};
        pages.list={}
        // pages
        pages.current=req.body.current || 1//当前页
        pages.size= 7
        pages.pages= 0//总行数
        pages.total= 0//总页数
        let sql1='select count(*) row from user'
        let sql2='select * from user order by user_id ASC limit ?,?'
        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            pages.list=rows
            res.json(pages)
        });
    },

        // 查询用户信息
        searchUser(req,res){
            let keyword = req.body.keyword;
            let arr=[keyword,keyword,keyword];
            let sql = 'SELECT * FROM user WHERE user_id=? or user_name=? or telephone=?'
            func.connPool(sql,arr,(err,rows) => {
                res.json(rows);
            });
        },

};