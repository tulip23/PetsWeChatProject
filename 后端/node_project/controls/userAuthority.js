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

module.exports = {
    // 查看用户权限
    fetchAll(req, res) {
        pool.getConnection((err, conn) => {
            conn.query(sql.queryAll, 'user', (err, rows) => {
                // 查询的结果存储在rows中
                res.json(rows);
            });
        });
    },

    // 删除用户
    deleteUser(req, res) {
        // POST方法获取浏览器传来的参数
        let user_id = req.body.user_id;
        func.connPool(sql.delUser, ['user', user_id], rows => {
            res.send({status: 200, msg:'删除成功',rows});
        });

    },

    // 添加用户
    addUser (req, res) {
        // 获取入参
        let user_id = req.body.user_id;
        let user_name = req.body.user_name;
        let account = req.body.account;
        let role = req.body.role;
        let password = req.body.password;
        // 密码加盐
        bcrypt.hash(password,10,(err,hash) =>{
            if(err)
            password = hash
            let arr = [user_id, user_name, account,hash,role];
            func.connPool(sql.addUser, arr, rows => {
                res.json({status: 200, msg: '新增成功'});
            });
        })

    },

    // 查询权限用户
    searchKeyword(req,res){
        let user_name = req.body.keyword;
        let user_id = req.body.keyword;
        let account = req.body.keyword;
        let role = req.body.role;
        if(!req.body.keyword){
            let arr=[role];
            let sql = 'select * from user where role=?'
            func.connPool(sql,arr,(err,rows) => {
                res.json(rows);
            });
        }else{
            let sql = 'select * from user where (user_id=? or user_name=? or account=?) and (role=? or ? is null)'
            let arr=[user_id,user_name,account,role,role];
            func.connPool(sql,arr,(err,rows) => {
                console.log(rows,'返回的消息')
                res.json(rows);
            });
        }
    },

    // 编辑用户权限信息
    updateUser(req,res){
        let user_id = req.body.user_id;
        let user_name = req.body.user_name;
        let account = req.body.account;
        let role = req.body.role;
        let password = req.body.password;
        let sql = 'update user set user_name=?,account=?,password=?,role=? where user_id=?'
        if(password.length>20){
            let arr = [user_name,account,password,role,user_id]
            func.connPool(sql,arr,(err, rows) => {
                res.send({code: 200, msg: '编辑成功'});
            });
        }else{
            bcrypt.hash(password,10,(err,hash) =>{
                if(err)
                password = hash
                let arr = [user_name,account,hash,role,user_id]
                func.connPool(sql,arr,(err,rows) => {
                    res.json({status: 200, msg: '编辑成功'});
                });
            })
        }  



        
    },

    // 分页查询
    changePage(req,res){
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

    // 登录
    login (req, res) {
        let user_name = req.body.keyword;
        let account = req.body.keyword;
        let telephone = req.body.keyword
        let pass = req.body.password;
        let sql = 'select * from user where user_name=? or account=? or telephone=?'
        let arr = [user_name,account,telephone]
        func.connPool(sql,arr,(err,rows) => {
            if(rows.length ==0){
                // 查询结果返回空，用户名/账号不存在
                res.json({status: 400, msg: '用户或账号不存在'});
            }else{
                let password = rows[0].password;
                bcrypt.compare(req.body.password,password,(err,sure) => {
                    if(rows[0].role  === '超级管理员' || rows[0].role  === '普通管理员'){
                        if (sure) {
                            let user = {
                                user_id: rows[0].user_id,
                                user_name: rows[0].user_name,
                                account:rows[0].account,
                                role: rows[0].role,
                                wechaturl:rows[0].wechaturl,
                                role:rows[0].role,
                            };
                            req.session.login = user;
                            res.json({status: 200, msg: '登录成功', user: user});
                        }else{
                            res.json({status: 400, msg: '密码错误'});
                        }
                    }else{
                        // 非管理员不能登录
                        res.json({status: 400, msg: '没有权限登录'});
                    }
                });
            }
        });
    },

    // 退出登录
    logout (req, res) {
        req.session.login = null;
        res.json({status: 200, msg: '退出登录'});
    },

    // 查看用户权限
    checkRoles(req,res){
        let account = req.body.keyword
        let telephone = req.body.keyword
        let arr = [telephone,account]
        let sql = 'select role from user where telephone=? or account=?'
        func.connPool(sql,arr,(err,rows) => {
            res.json(rows)
        });
    },

    // 上传图片
    uploadPhoto(req,res){
        let fileName = req.file.filename
        console.log(fileName,doc_id)
        let doc_id=req.body.doc_id

        let created_time = moment().format('YYYY-M-D');
        let url  = `http://image.jt.com/uploads/${created_time}/${fileName}`
        let sql2 = 'insert into images_url(doc_id,created_time,url) values(?,?,?)'
        let arr = [doc_id,created_time,url]
        func.connPool(sql2,arr,(err, rows) => {
            res.send({code: 200, msg: 'done',url:'url'});
        });
    },

    // 个人用户信息
    myInfo(req,res){
        let user_id = req.body.user_id;
        let sql = 'select * from user where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            res.json(rows);
        });

    },

    // 编辑个人信息
    updateMyself(req,res){
        user_id = req.body.user_id;
        let user_name = req.body.user_name;
        let account = req.body.account;
        let password = req.body.password;
        let telephone = req.body.telephone
        let address = req.body.address
        let age = req.body.age
        let gender = req.body.gender
        let sql = 'update user set user_name=?,account=?,password=?,telephone=?,address=?,age=?,gender=? where user_id=?'
        if(password.length>20){
            let arr = [user_name,account,password,telephone,address,age,gender,user_id]
            func.connPool(sql,arr,(err, rows) => {
                res.send({code: 200, msg: '编辑成功'});
            });
        }else{
            bcrypt.hash(password,10,(err,hash) =>{
                if(err)
                password = hash
                let arr = [user_name,account,hash,telephone,address,age,gender,user_id]
                func.connPool(sql,arr,(err,rows) => {
                    res.json({status: 200, msg: '编辑成功'});
                });
            })
        }   
    },

    // 用户的记录
    searchAllInfo(req,res){
        let user_id = req.body.user_id
        let sql1 = 'select * from adopt_record where adopt_id=?'
        let sql2 = 'select * from pets_keep where user_id=?'
        let sql3 = 'select * from pets_service where user_id=?'
        let sql4 = 'select * from trace_record where adopt_id=?'
        let comments = []
        comments.children1 = []
        comments.children2 = []
        comments.children3 = []
        comments.children4 = []
        var promise=new Promise((resolve, reject)=>{
            func.connPool(sql1,user_id,(err,rows) => {
                comments.children1 = rows
                resolve(comments)
            });
        }).then(data=>{
            func.connPool(sql2,user_id,(err,rows) => {
                comments.children2 = rows
            });
        }).then(data=>{
            func.connPool(sql3,user_id,(err,rows) => {
                comments.children3 = rows
            });
        }).then(data=>{
            func.connPool(sql4,user_id,(err,rows) => {
                comments.children4 = rows
                res.send({data:[comments.children1,comments.children2,comments.children3,comments.children4]})
            });
        })
    },

    // 根据权限删用户
    searchAllRoles(req,res){
        let user_id = req.body.user_id
        let sql1 = 'select * from posts where user_id=?'
        let sql2 = 'select * from comments where user_id=?'
        let comments = []
        comments.children1 = []
        comments.children2 = []
        var promise=new Promise((resolve, reject)=>{
            func.connPool(sql1,user_id,(err,rows) => {
                comments.children1 = rows
                resolve(comments)
            });
        }).then(data=>{
            func.connPool(sql2,user_id,(err,rows) => {
                comments.children2 = rows
                res.send({data:[comments.children1,comments.children2]})
            });
        })
    }
};