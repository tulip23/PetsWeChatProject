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
    // 分页查询
    recordInit(req,res){
        // 当前页默认为1
        let pages={};
        pages.list={}
        pages.current=req.body.current || 1 //当前页
        pages.size= 7
        pages.pages= 0  //总行数
        pages.total= 0  //总页数
        let sql1='select count(*) row from adopt_record'
        let sql2='select * from adopt_record,pets_info where adopt_record.pets_id=pets_info.pets_id order by adopt_record.id ASC limit ?,?'
        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            pages.list=rows
            pages.list.forEach((item)=>{
                item.time = moment(item.time).format("YYYY-MM-DD")
            })
            res.json(pages)
        });
    },

    // 查询记录
    allRecord(req,res){
        let adopt_id = req.body.keyword
        let user_name = req.body.keyword
        let pets_id = req.body.keyword
        let status = req.body.status
        let arr = [adopt_id ,user_name,pets_id,status,status]
        let sql = 'select * from adopt_record where (adopt_id =? or user_name=? or pets_id=?) or (status=? or ? is null)'
        func.connPool(sql,arr,(err,rows) => {
            rows.forEach((item)=>{
                item.time = moment(item.time).format("YY-MM-DD")
            })
            res.send(rows);

        });
    },

    // 领养宠物追踪
    tracePets(req,res){
        let pages={};
        pages.list={}
        pages.current=req.body.current || 1 //当前页
        pages.size= 7
        pages.pages= 0  //总行数
        pages.total= 0  //总页数
        let sql1='select count(*) row from trace_record'
        let sql2='select * from trace_record order by id ASC limit ?,?'
        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            pages.list=rows
            pages.list.forEach((item)=>{
                item.time = moment(item.time).format("YYYY-MM-DD")
            })
            res.json(pages)
        });
    },

    // 搜索记录
    myRecord(req,res){
        let adopt_id = req.body.keyword
        let sql = 'select * from trace_record where adopt_id=?'
        func.connPool(sql,adopt_id,(err, rows) => {
            rows.forEach((item)=>{
                item.time = moment(item.time).format('YYYY-MM-DD')
            })
            res.send(rows);
        })
    },

    // 宠物信息审核
    updateStatus(req,res){
        // let adopt_id = req.body.adopt_id
        let status = req.body.status
        let status2 = req.body.status
        let adopt_id = req.body.adopt_id
        let arr = [status,adopt_id]
        let sql1 = 'update adopt_record set status=? where adopt_id=?'
        let sql2 = 'update user_raise set status=? where pets_id=?'
        func.connPool(sql1,arr,(rows,err)=>{
            
        })
        if(status2 == '审批不通过'){
            status2 = '送养中'
            let arr1 = [status2,pets_id]
            console
            func.connPool(sql2,arr1,(rows,err)=>{
                res.json({status:200})
            })
        }else{
            func.connPool(sql2,arr,(rows,err)=>{
                console.log('ok了')
                res.json({status:200})
            })
        }
    }

};