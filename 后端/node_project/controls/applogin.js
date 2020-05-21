let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');
const JwtUtil = require('../controls/jwt');
let bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
const SMSClient = require('@alicloud/sms-sdk');
const accessKeyId = 'LTAI4FitAFMzatwKfwiEUSZr'
const secretAccessKey = 'zjhv74bI76717OrSzQrEflumnTwErS'
const stringRandom = require('string-random');
let smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
})

// 小程序宠物信息页面渲染
module.exports = {
    // 登录
    appLogin(req, res) {
        var keyword = req.body.keyword
        var password = req.body.password
        let sql = 'select * from user where account=? or telephone=?'
        let arr = [keyword,keyword,password]
        func.connPool(sql,arr,(err,rows) => {
            if(rows.length ==0){
                // 查询结果返回空，用户名/账号不存在
                res.json({status: 400, msg: '手机号或账号不存在'});

            }else{
                let pass = rows[0].password;
                bcrypt.compare(req.body.password,pass,(err,sure) => {
                    if (sure) {
                        // 登陆成功，添加token验证
                        let user_id = rows[0].user_id.toString();
                        // 将用户id传入并生成token
                        let jwt = new JwtUtil(user_id);
                        let token = jwt.generateToken();
                        let user_name = rows[0].user_name;
                        let wechaturl = rows[0].wechaturl
                        res.json({status: 200, msg: '登录成功', token: token,user_id:user_id,user_name:user_name,wechaturl:wechaturl});
                        // console.log('登录成功')
                    }else{
                        res.json({status: 403, msg: '密码错误'});
                    }
                });
            }
        });

    },

    // 验证登录
    verifyLogin(req, res) {
        // 登录界面不需要
        if(req.url != 'http://localhost:8383/api/applogin/appLogin'){
            var token = req.body.to
            var user_id = req.body.user_id
            let jwt = new JwtUtil(token);
            let result = jwt.verifyToken();
            if(result == 'err'){
                res.send({status: 403, msg: '登录已过期,请重新登录'});
            }else{
                let sql = 'select * from user where user_id=?'
                func.connPool(sql,user_id,(err,rows) => {
                    res.json(rows)
                });
            }
        }else{
            next()
        }

    },

    // 我的页面数据渲染
    loginUser(req,res){
        let token = req.body.to
        let user_id = req.body.user_id
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        if(result == 'err'){
            res.send({status: 403, msg: '登录已过期,请重新登录'});
        }else{
            let sql = 'select * from user where user_id=?'
            func.connPool(sql,user_id,(err,rows) => {
                res.json(rows)
            });
        }
    },

    // 微信登录+注册
    chatLogin(req,res){
        let user_id = req.body.user_id
        let user_name = req.body.user_name
        let wechaturl = req.body.url
        let sql = 'insert into user(user_id,user_name,wechaturl) values(?,?,?)'
        let arr = [user_id,user_name,wechaturl]
        func.connPool(sql,arr,(err,rows)=>{
            let jwt = new JwtUtil(user_id);
            let token = jwt.generateToken();
            res.json({status: 200, msg: '登录成功', token: token,user_id:user_id,user_name:user_name,wechaturl:wechaturl});
        })
    },

    // 微信登录
    welogin(req, res){
        let user_id = req.body.user_id
        let sql = 'select * from user where user_id=?'
        func.connPool(sql,user_id,(err,rows) => {
            // 登陆成功，添加token验证
            let user_id = rows[0].user_id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(user_id);
            let token = jwt.generateToken();
            let user_name = rows[0].user_name;
            let wechaturl = rows[0].wechaturl
            res.json({status: 200, msg: '登录成功', token: token,user_id:user_id,user_name:user_name,wechaturl:wechaturl});
        });
    },

    // 查询最大的user_id
    selectMaxId(req,res){
        let sql = 'select max(user_id) maxid from user'
        func.connPool(sql,(err,rows) => {
            res.json(rows)
        });
    },

    // 查找用户是否存在
    selectUser(req,res){
        let user_name = req.body.user_name
        let sql = 'select * from user where user_name=?'
        func.connPool(sql,user_name,(err,rows) => {
            res.json(rows)
        });
    },

    // 发送短信验证码
    sendMessage(req,res){
        let phone = req.body.phone
        let randomNumber = stringRandom(5, { letters: false })
        //发送短信
        smsClient.sendSMS({
            PhoneNumbers: req.body.phone,
            SignName: '爱宠小窝',
            TemplateCode: 'SMS_185810029',
            TemplateParam: '{"code":'+randomNumber+'}' //可选:模板中的变量替换JSON串,目前不用
        }).then(function (res) {
            let {Code} = res
            if (Code === 'OK') {
                //处理返回参数
                // console.log(res)
            }
        }, function (err) {
            // console.log(err)
        })
        res.json({data:req.body,randomNumber:randomNumber})
    },

    // 短信登录
    messageLogin(req, res) {
        var telephone = req.body.phone
        let sql = 'select * from user where telephone=?'
        func.connPool(sql,telephone,(err,rows) => {
            // 登陆成功，添加token验证
            let user_id = rows[0].user_id.toString();
            // 将用户id传入并生成token
            let jwt = new JwtUtil(user_id);
            let token = jwt.generateToken();
            let user_name = rows[0].user_name;
            let wechaturl = rows[0].wechaturl
            res.json({status: 200, msg: '登录成功', token: token,user_id:user_id,user_name:user_name,wechaturl:wechaturl});
        });
    },

    // 忘记密码
    forgetPassword(req,res){
        let telephone = req.body.telephone
        let password = req.body.password
        bcrypt.hash(password,10,(err,hash) =>{
            if(err)
            password = hash
            console.log(hash,'加盐后的密码')
            let arr = [hash,telephone]
            func.connPool(sql.updatePassword,arr,(err,rows) => {
                res.json({status: 200, msg: '修改成功'});
            });
        })
        
    }
};