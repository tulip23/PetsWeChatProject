let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
let multer = require('multer');
let path = require('path');

// 小程序宠物信息页面渲染
module.exports = {
    // 领养打卡签到
    uploadVideo(req,res){
        let fileName = req.file.filename
        let time = moment().format('YYYY-M-D');
        let adopt_id = req.body.adopt_id
        let number = req.body.number
        let video  = `http://image.jt.com/videos/${time}/${fileName}`
        let sql1 = 'insert into trace_record(adopt_id,time,video,number) values(?,?,?,?)'
        let arr = [adopt_id,time,video,number]
        func.connPool(sql1,arr,(err, rows) => {
            res.send({code: 200, msg: 'done',url:'url'});
        })
    },

    // 查询最大的number
    uploadNumber(req,res){
        let adopt_id = req.body.adopt_id
        let sql = 'select ifnull(max(number),0)+1 maxid from trace_record where adopt_id=?'
        func.connPool(sql,adopt_id,(err, rows) => {
            res.send(rows);
        })
    },

    // 查询用户是否有领养记录
    signRecord(req,res){
        let adopt_id = req.body.adopt_id
        let sql = 'select * from adopt_record where adopt_id=?'
        func.connPool(sql,adopt_id,(err, rows) => {
            res.send(rows);
        })
    },

    // 查找最大的video_url编号
    selectMaxVideo(req,res){
        let sql = 'select max(doc_id) maxid from video_url'
        func.connPool(sql,(err,rows)=>{
            console.log(rows,'最多的')
            res.json(rows)
        })
    },

    // 上传发布送养的视频
    uploadRaiseVideo(req,res){
        let fileName = req.file.filename
        let created_time = moment().format('YYYY-M-D');
        let doc_id = req.body.doc_id
        let url  = `http://image.jt.com/videos/${created_time}/${fileName}`
        let sql = 'insert into video_url(doc_id,created_time,url) values(?,?,?)'
        let arr = [doc_id,created_time,url]
        func.connPool(sql,arr,(err, rows) => {
            res.send({code: 200, msg: 'done',url:'url'});
        })
    }
};