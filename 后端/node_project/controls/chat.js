let sql = require('../sql/sql');
let mysql = require('mysql');
// let db = require('../configs/db');
// let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
let multer = require('multer');
let path = require('path');
var express = require('express')()
var http = require('http').Server(express); 

// 小程序宠物信息页面渲染
module.exports = {
    // 帖子页面渲染
    talk(req, res) {
        func.connPool((err,rows) => {
            res.sendFile(__dirname + '/index.html')
        });
    },

    io(socket){
        console.log('a user connected');
      }
};