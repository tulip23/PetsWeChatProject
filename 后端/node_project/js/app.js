const express = require("express");
const app = express();
const mysql = require("mysql");


// 创建连接
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"mypets",
    multipleStatements: true
})
connection.connect()

// 解决跨域请求问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 })

// 把 address 改成你自己定的地址，就是连接访问的那个地址
app.get('/getUser',function(req,res){
    res.status(200)
    const {page,pageNum} = req.params;
    const sql = 'select * from user'; // 写你需要的sql代码，你要是不会写那我就真的没办法了
    connection.query(sql,function(req,result){
        if(req){
            console.log('[SELECT ERROR] - ', req.message);
            return;
        }
        res.json(result); 
    }); 
})  

var server = app.listen(8081,'127.0.0.1', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("地址为 http://%s:%s", host, port);
})

// 插入数据
// var addsql = "insert into user(user_id,user_name,account,password,role) values(?,?,?,?,?)";
// var addsqlParams = ['u01','不鸭','u00001','a12345','超级管理员'];

// db.query(addsql,addsqlParams,function (err, result) {
//     if(err){
//      console.log('[INSERT ERROR] - ',err.message);
//      return;
//     }
// });
