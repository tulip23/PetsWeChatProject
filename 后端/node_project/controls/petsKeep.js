let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');

module.exports = {
    // 用户信息页面渲染
    searchKeepPets(req, res) {
        // 当前页默认为1
        let pages={};
        pages.list={}
        // pages
        pages.current=req.body.current || 1//当前页
        pages.size= 10
        pages.pages= 0//总行数
        pages.total= 0//总页数
        
        let sql1='select count(*) row from pets_keep'
        let sql2='select * from pets_keep,user where pets_keep.user_id=user.user_id order by pets_keep.user_id ASC limit ?,?'

        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.begin_time
                item.begin_time = moment(day).format("YYYY-MM-DD")
                let day2 = item.end_time
                item.end_time = moment(day2).format("YYYY-MM-DD")

            });
            pages.list=rows
            res.json(pages)
        });
    },

        // 查询用户信息
        searchKeepInfo(req,res){
            let user_name = req.body.keyword;
            let user_id = req.body.keyword;
            let telephone = req.body.keyword;
            let arr=[user_id,user_name,telephone];
            let sql = 'SELECT * FROM pets_Keep,user WHERE pets_keep.user_id=user.user_id and (user.user_id=? or user.user_name=? or user.telephone=?)'
            func.connPool(sql,arr,(err,rows) => {
                rows.forEach((item)=>{
                    item.begin_time = moment(item.begin_time).format("YYYY-MM-DD")
                    item.end_time = moment(item.end_time).format("YYYY-MM-DD")
                })
                res.json(rows);
            });
        },

};