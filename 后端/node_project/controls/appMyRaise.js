let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');

module.exports = {
    // 用户信息页面渲染
    raiseRecord(req, res) {
        let user_id = req.body.user_id;
        let sql = 'select * from user_raise where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            rows.forEach((item)=>{
                item.time = moment(item.time).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    },

    // 查询本人申请领养信息
    raiseApply(req,res){
        let adopt_id = req.body.user_id
        let sql = 'select * from adopt_record,pets_info where adopt_record.pets_id=pets_info.pets_id and adopt_id=?'
        func.connPool(sql,adopt_id,(err,rows) => {
            rows.forEach((item)=>{
                item.time = moment(item.time).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    },

    // 查询用户帖子信息
    postRecord(req,res){
        let user_id = req.body.user_id
        let sql = 'select * from posts where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            rows.forEach((item)=>{
                item.created = moment(item.created).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    },

    // 查看别人的申请记录
    applyForPets(req,res){
        let raise_id = req.body.raise_id
        let sql = 'select * from adopt_record,pets_info where adopt_record.pets_id=pets_info.pets_id and raise_id=?'
        func.connPool(sql,raise_id,(err,rows) => {
            rows.forEach((item)=>{
                item.time = moment(item.time).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    }

};