let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');

module.exports = {
    // 用户信息页面渲染
    searchUserRaise(req, res) {
        // 当前页默认为1
        let pages={};
        pages.list={}
        // pages
        pages.current=req.body.current || 1//当前页
        // pages.current = 2
        pages.size= 10
        pages.pages= 0//总行数
        pages.total= 0//总页数
        let sql1='select count(*) row from user_raise'
        let sql2='select * from user_raise,user,pets_info where user_raise.user_id=user.user_id and pets_info.pets_id=user_raise.pets_id order by user.user_id ASC limit ?,?'

        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.time
                item.time = moment(day).format("YYYY-MM-DD")
            });
            pages.list=rows
            console.log(pages.list,'返回的消息')
            res.json(pages)
        });
    },

    // 查询用户信息
    searchUserInfo(req,res){
        let user_id = req.body.keyword;
        let user_name = req.body.keyword;
        let pets_id = req.body.keyword;
        let pet_name = req.body.keyword;
        let telephone = req.body.keyword;
        let arr=[user_id,user_name,pets_id,pet_name,telephone];
        let sql = 'SELECT * FROM user_raise,user,pets_info where user_raise.user_id=user.user_id and pets_info.pets_id=user_raise.pets_id and (user.user_id=? or user.user_name=? or pets_info.pets_id=? or pets_info.pets_name=? or user.telephone=?)'
        func.connPool(sql,arr,(err,rows) => {
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.time
                item.time = moment(day).format("YYYY-MM-DD")
            });
            res.json(rows);
        });
    },

};