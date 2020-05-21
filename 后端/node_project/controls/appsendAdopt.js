let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
let multer = require('multer');
let path = require('path');
let bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

// 小程序宠物信息页面渲染
module.exports = {
    // 获取收养人的信息
    initUser(req, res) {
        let user_id = req.body.user_id
        let sql = 'select * from user where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            res.json(rows)
        });
    },

    // 用户信息不完善时
    insertAdopt(req,res){
        let user_id = req.body.user_id
        let address = req.body.address
        let telephone = req.body.telephone
        let gender = req.body.gender
        let age = req.body.age
        let experience = req.body.experience
        let merry = req.body.merry
        let live = req.body.live
        let status = req.body.status
        let time = moment().format('YYYY-M-D');
        let reason = req.body.reason
        let kind = req.body.kind
        let number = req.body.number
        let remark = req.body.remark
        let demand = req.body.demand
        let species = req.body.species
        let arr = [user_id,experience,merry,live,status,time,reason,kind,number,remark,demand,species]
        let sql = 'insert into user_adopt(user_id,experience,merry,live,status,time,reason,kind,number,remark,demand,species) values(?,?,?,?,?,?,?,?,?,?,?,?)'
        let sql2 = 'update user set address=?,telephone=?,gender=?,age=? where user_id=?'
        let arr2 = [address,telephone,gender,age,user_id]
        func.connPool(sql,arr,(err,rows) => {
            // console.log('成功插入')
        });
        func.connPool(sql2,arr2,(err,rows) => {
            res.json(rows)
        });
    },

    // 用户信息完善
    addAdopt(req,res){
        let user_id = req.body.user_id
        let experience = req.body.experience
        let merry = req.body.merry
        let live = req.body.live
        let status = req.body.status
        let time = moment().format('YYYY-M-D');
        let reason = req.body.reason
        let kind = req.body.kind
        let number = req.body.number
        let remark = req.body.remark
        let demand = req.body.demand
        let species = req.body.species
        let address = req.body.address
        let arr = [user_id,experience,merry,live,status,time,reason,kind,number,remark,demand,species,address]
        let sql = 'insert into user_adopt(user_id,experience,merry,live,status,time,reason,kind,number,remark,demand,species,address) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,arr,(err,rows) => {
            // console.log('成功插入')
            res.json(rows)
        });
    },

    // 充钱
    addMoney(req,res){
        let user_id = req.body.user_id
        let money = req.body.money
        let arr = [money,user_id]
        let sql = 'update user set money=? where user_id=?'
        func.connPool(sql,arr,(err,rows)=>{
            res.json(rows)
        })
    },

    // 发布送养
    sendRaise(req,res){
        let user_id = req.body.user_id
        let user_name = req.body.user_name
        let kind = req.body.kind
        let pets_id = req.body.pets_id
        let time = moment().format('YYYY-M-D');
        let reason = req.body.reason
        let status = req.body.status
        let species = req.body.species
        let doc_id = req.body.doc_id
        let number = req.body.number
        let address = req.body.address
        let telephone = req.body.telephone
        let sql = 'insert into user_raise(user_id,user_name,pets_id,time,kind,reason,status,number,species,doc_id,address,telephone) values(?,?,?,?,?,?,?,?,?,?,?,?)'
        let arr = [user_id,user_name,pets_id,time,kind,reason,status,number,species,doc_id,address,telephone]
        func.connPool(sql,arr,(err,rows)=>{
            res.json(rows)
        })
    },

    // 发布送养上传图片
    sendImages(req,res){
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

    // 查询最大值
    selectMaxPets(req,res){
        let sql = 'select max(pets_id) maxid from pets_info'
        func.connPool(sql,(err,rows)=>{
            res.json(rows)
        })
    },

    // 新增pets_info
    insertInfo(req,res){
        let kind = req.body.kind
        let pets_id = req.body.pets_id
        let pets_name = req.body.pets_name
        let reason = req.body.reason
        let species = req.body.species
        let doc_id = req.body.doc_id
        let color = req.body.color
        let pet_age = req.body.pet_age
        let pet_gender = req.body.pet_gender
        let health = req.body.health
        let medical_history = req.body.medical_history
        let condition = req.body.condition
        let video_id = req.body.video_id
        let arr = [pets_id,kind,species,color,pet_age,pet_gender,health,medical_history,condition,reason,pets_name,doc_id,video_id]
        let sql = 'insert into pets_info(pets_id,kind,species,color,pet_age,pet_gender,health,medical_history,conditions,reason,pets_name,doc_id,video_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,arr,(err,rows)=>{
            res.json(rows)
        })
    },

    // 修改用户信息
    updateImage(req,res){
        let fileName = req.file.filename
        let user_id=req.body.user_id
        let user_name = req.body.user_name
        let telephone = req.body.telephone
        let address = req.body.address
        let password = req.body.password
        let created_time = moment().format('YYYY-M-D');
        let url  = `http://image.jt.com/uploads/${created_time}/${fileName}`
        let sql2 = 'update user set wechaturl=?,user_name=?,telephone=?,address=?,password=? where user_id=?'
        if(password.length>20){
            let arr = [url,user_name,telephone,address,password,user_id]
            func.connPool(sql2,arr,(err, rows) => {
                res.send({code: 200, msg: 'done',url:'url'});
            });
        }else{
            bcrypt.hash(password,10,(err,hash) =>{
                if(err)
                password = hash
                let arr = [url,user_name,telephone,address,hash,user_id]
                func.connPool(sql2,arr,(err, rows) => {
                    res.send({code: 200, msg: 'done',url:'url'});
                });
            })
        }
    },

    // 修改用户信息
    updateUserInfo(req,res){
        let user_id=req.body.user_id
        let user_name = req.body.user_name
        let telephone = req.body.telephone
        let address = req.body.address
        let password = req.body.password
        let wechaturl = req.body.wechaturl
        let sql = 'update user set wechaturl=?,user_name=?,telephone=?,address=?,password=? where user_id=?'
        if(password.length>20){
            let arr = [wechaturl,user_name,telephone,address,password,user_id]
            func.connPool(sql,arr,(err, rows) => {
                res.send({code: 200, msg: 'done',url:'url'});
            });
        }else{
            bcrypt.hash(password,10,(err,hash) =>{
                if(err)
                password = hash
                let arr = [wechaturl,user_name,telephone,address,hash,user_id]
                func.connPool(sql,arr,(err, rows) => {
                    res.send({code: 200, msg: 'done',url:'url'});
                });
            })
        }
    },


};