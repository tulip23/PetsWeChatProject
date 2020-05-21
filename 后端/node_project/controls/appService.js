let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');

// 小程序宠物信息页面渲染
module.exports = {
    // 医院页面下订单
    updateMoney(req, res) {
        let user_id = req.body.user_id
        let money = req.body.money
        let service_time = moment().format('YYYY-M-D');
        let user_name= req.body.user_name
        let telephone = req.body.telephone
        let pets_name = req.body.pets_name
        let service = req.body.service
        let price = req.body.price
        let gender = req.body.gender
        let address = req.body.address
        let kind = req.body.kind
        let status = '匹配中'
        let arr = [user_id,service_time,user_name,telephone,pets_name,service,price,gender,address,kind,status]
        // console.log(arr,"arr")
        let sql = 'update user set money=? where user_id=?'
        let sql2 = 'insert into pets_service(user_id,service_time,user_name,telephone,pets_name,service,price,gender,address,kind,status) values(?,?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,[money,user_id],(err,rows) => {
        })
        func.connPool(sql2,arr,(err,rows) => {
            // console.log(rows)
        })
    },

     // 寄养页面下订单
     insertKeep(req, res) {
        let user_id = req.body.user_id
        let begin_time = req.body.begin_time
        let end_time = req.body.end_time
        let money = req.body.money
        let user_name= req.body.user_name
        let telephone = req.body.telephone
        let pets_name = req.body.pets_name
        let price = req.body.price
        let address = req.body.address
        let kind = req.body.kind
        let shape = req.body.shape
        let status = '匹配中'
        let arr = [user_id,begin_time,end_time,user_name,telephone,pets_name,price,address,kind,shape,status]
        // console.log(arr,"arr")
        let sql = 'update user set money=? where user_id=?'
        let sql2 = 'insert into pets_keep(user_id,begin_time,end_time,user_name,telephone,pets_name,price,address,kind,shape,status) values(?,?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,[money,user_id],(err,rows) => {
        })
        func.connPool(sql2,arr,(err,rows) => {
            // console.log(rows)
        })
    },

    // 洗护页面下订单
    insertWash(req, res) {
        let user_id = req.body.user_id
        let money = req.body.money
        let user_name= req.body.user_name
        let telephone = req.body.telephone
        let pets_name = req.body.pets_name
        let price = req.body.price
        let address = req.body.address
        let shape = req.body.shape
        let service = req.body.service
        let service_time = moment().format('YYYY-M-D');
        let status = '匹配中'
        let arr = [user_id,service_time,user_name,telephone,pets_name,price,address,shape,service,status]
        // console.log(service_time,)
        let sql = 'update user set money=? where user_id=?'
        let sql2 = 'insert into pets_service(user_id,service_time,user_name,telephone,pets_name,price,address,shape,service,status) values(?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,[money,user_id],(err,rows) => {
        })
        func.connPool(sql2,arr,(err,rows) => {
            // console.log(rows)
        })
    },

    // 查询用户信息
    myUserId(req,res){
        user_id = req.body.user_id
        let sql = 'select * from user where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            res.json(rows);
        });
    },

    // 我的服务记录
    serviceRecord(req,res){
        let user_id= req.body.user_id
        let sql = 'select * from pets_service where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            rows.forEach((item)=>{
                item.service_time = moment(item.service_time).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    },

    // 我的寄养记录
    KeepsRecord(req,res){
        let user_id= req.body.user_id
        let sql = 'select * from pets_keep where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            rows.forEach((item)=>{
                item.begin_time = moment(item.begin_time).format("YYYY-MM-DD")
                item.end_time = moment(item.end_time).format("YYYY-MM-DD")
            })
            res.json(rows);
        });
    }

};