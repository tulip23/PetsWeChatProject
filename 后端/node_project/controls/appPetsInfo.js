let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');
let moment = require('moment');

// 小程序宠物信息页面渲染
module.exports = {
    // 加载帖子
    fontPetsInfo(req, res) {
        let sql = 'select * from user_raise inner join user on user_raise.user_id=user.user_id order by time DESC'
        let comments=[]
        let sql2='select * from images_url where doc_id=?'
        var promise=new Promise((resolve, reject)=>{
            func.connPool(sql,(err,rows) => {
                rows.forEach((item)=>{
                    item.time = moment(item.time).format("YYYY-MM-DD")
                })
                comments=rows
                resolve(comments)
            });
        }).then(data=>{
            data.forEach((e,index)=>{
                data[index]['children']=[]
                if(e.doc_id==null){
                    e.doc_id=-1
                }
                func.connPool(sql2,e.doc_id,async (err,rows) => {
                    data[index]['children']=(rows)
                    if(index==(data.length-1)){
                        // 查询用户信息
                        res.json(data)                      
                    }
                });
            })
        })
    },

    // 收养信息
    adoptInfo(req, res) {
        let sql = 'select user.user_id,user_adopt.id,wechaturl,user_name,kind,reason,user.address,status,number,time from user_adopt,user where user_adopt.user_id=user.user_id order by time DESC'
        func.connPool(sql,(err,rows) => {
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.time
                item.time = moment(day).format("YYYY-MM-DD")
            });
            res.json(rows)
        });
    },

    // 宠物详细信息
    petsDetail(req, res) {
        let pets_id = req.body.pets_id
        let sql = 'select * from pets_info,video_url where pets_info.video_id=video_url.doc_id and pets_id=?'
        func.connPool(sql,pets_id,(err,rows) => {
            res.json(rows)
        });
    },

        // 领养宠物详细信息
    adoptDetail(req, res){
        let user_id = req.body.user_id
        let id = req.body.id
        let arr = [user_id,id]
        let sql = 'select user_adopt.id id,wechaturl,user_name,live,experience,merry,demand,remark,telephone,user.address from user,user_adopt where user.user_id=user_adopt.user_id and (user_adopt.user_id=? and user_adopt.id=?)'
        func.connPool(sql,arr,(err,rows) => {
            res.json(rows)
        });
    },

    // 搜索页的查询
    searchPets(req, res){
        let keyword = req.body.keyword
        let returndatas = {}
        returndatas.dataone = []
        returndatas.datatwo = []
        // console.log(keyword,"啥")
        let sql1 = "select ua.id,wechaturl,user_name,live,experience,merry,demand,remark,telephone,u.address,reason,number,u.user_id from user_adopt ua,user u where ua.user_id=u.user_id and (ua.kind=? or ua.species=? or ua.reason like concat('%',?,'%'))"
        let sql2 = "select * from user_raise ra,user u where ra.user_id=u.user_id and (ra.kind=? or ra.species=? or ra.reason like concat('%',?,'%'))"
        // 领养宠物
        let sql3 = 'select *  from images_url where doc_id=?'
        func.connPool(sql1,[keyword,keyword,keyword],(err,rows) => {
            // res.json(rows)
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.time
                item.time = moment(day).format("YYYY-MM-DD")
            });
            returndatas.dataone = rows
        });
        // 送养宠物
        func.connPool(sql2,[keyword,keyword,keyword],(err,rows) => {
            rows.forEach((item) => {
                // 日期格式转化
                let day = item.time
                item.time = moment(day).format("YYYY-MM-DD")
            });
            returndatas.datatwo = rows
            returndatas.datatwo.forEach((e,index)=>{
                returndatas.datatwo[index]['children']=[]
                if(e.doc_id==null){
                    e.doc_id=-1
                }
                func.connPool(sql3,e.doc_id,async (err,rows) => {
                    returndatas.datatwo[index]['children']=(rows)
                    if(index==(returndatas.datatwo.length-1)){
                        // 查询用户信息
                        res.json(returndatas)                      
                    }
                });
            })
        });
    },

    // 申请领养接口
    demandAdopt(req,res){
        let adopt_id = req.body.adopt_id
        let raise_id = req.body.raise_id
        let time = moment().format("YYYY-MM-DD")
        let pets_id = req.body.pets_id
        let user_name = req.body.user_name
        let telephone = req.body.telephone
        let address = req.body.address
        console.log(req.body.address)
        let age = req.body.age
        let merry = req.body.merry
        let live = req.body.live
        let experience = req.body.experience
        let gender = req.body.gender
        let status = req.body.status
        let arr = [adopt_id,raise_id,time,pets_id,user_name,telephone,address,age,merry,live,experience,gender,status]
        let sql = 'insert into adopt_record(adopt_id,raise_id,time,pets_id,user_name,telephone,address,age,merry,live,experience,gender,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
        func.connPool(sql,arr,(err,rows)=>{
        })
    },

    // 点击浏览量增加
    addMyNumber(req,res){
        let id = req.body.id
        let number = req.body.number
        let sql = 'update user_raise set number=? where id=?'
        let arr = [number,id]
        func.connPool(sql,arr,(err,rows)=>{
            // console.log('修改成功')
        })
    },

    // 点击领养量增加
    addAdoptNumber(req,res){
        let id = req.body.id
        let number = req.body.number
        let sql = 'update user_adopt set number=? where id=?'
        let arr = [number,id]
        func.connPool(sql,arr,(err,rows)=>{
        })
    }
};