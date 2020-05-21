let sql = require('../sql/sql');
let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let func = require('../sql/func');
let bodyParser = require('body-parser');

module.exports = {
    // 宠物信息页面渲染/分页
    petsInfo(req, res) {
        // 当前页默认为1
        let pages={};
        pages.list={}
        // pages
        pages.current=req.body.current || 1//当前页
        pages.size= 7
        pages.pages= 0//总行数
        pages.total= 0//总页数
        let sql1='select count(*) row from pets_info'
        let sql2='select * from pets_info,video_url where pets_info.video_id=video_url.doc_id order by pets_id ASC limit ?,?'
        let sql3 = "select url from video_url where doc_id=?"
        func.connPool(sql1,(err,rows) => {
            pages.total= rows[0].row
            pages.pages= Math.floor((parseInt(pages.total) + parseInt(pages.size) -1) / parseInt(pages.size));
        });
        func.connPool(sql2,[(pages.current-1)*pages.size,pages.size],(err,rows) => {
            pages.list=rows
            res.json(pages)   
        });
    },

    // 宠物信息查询功能
    searchPetsInfo(req,res){
        let pet_name = req.body.keyword;
        let pets_id = req.body.keyword;
        let kind = req.body.kind;
        if(!req.body.keyword){
            let arr=[kind];
            let sql = 'select * from pets_info,video_url where pets_info.video_id=video_url.doc_id and kind=?'
            func.connPool(sql,arr,(err,rows) => {
                res.json(rows);
            });
        }else{
            let arr=[pets_id,pet_name,kind,kind];
            let petsSql = 'select * from pets_info,video_url where pets_info.video_id=video_url.doc_id and (pets_id=? or pets_name=?) and(kind=? or ? is null)'
            func.connPool(petsSql,arr,(err,rows) => {
                res.json(rows);
            });
        }
    },

        // 编辑宠物信息
        updatePetsInfo(req,res){
            let pets_id = req.body.pets_id;
            let pets_name = req.body.pets_name;
            let kind = req.body.kind;
            let species = req.body.species;
            let color = req.body.color;
            let pet_age = req.body.pet_age;
            let pet_gender = req.body.pet_gender;
            let health = req.body.health;
            let arr = [pets_id,pets_name,kind,species,color,pet_age,pet_gender,health,pets_id]
            let sql = 'update pets_info set pets_id=?,pets_name=?,kind=?,species=?,color=?,pet_age=?, pet_gender=?,health=? where pets_id=?' 
            func.connPool(sql,arr,(err,rows) => {
                res.json({status: 200, msg: '编辑成功'});
            });
        },

        // 删除宠物
        deletePets(req, res) {
            // POST方法获取浏览器传来的参数
            let pets_id = req.body.pets_id;
            func.connPool(sql.delPets, ['pets_info', pets_id], rows => {
                res.send({status: 200, msg:'删除成功',rows});
            });

        },

        // 新增宠物信息
        addPetsInfo(req,res){
            let pets_id = req.body.pets_id;
            let pet_name = req.body.pet_name;
            let kind = req.body.kind;
            let species = req.body.species;
            let color = req.body.color;
            let pet_age = req.body.pet_age;
            let pet_gender = req.body.pet_gender;
            let health = req.body.health;
            let pet_character = req.body.pet_character;
            let arr = [pets_id,pet_name,kind,species,color,pet_age,pet_gender,health,pet_character]
            func.connPool(sql.addPets,arr,(err,rows) => {
                res.json({status: 200, msg: '新增成功'});
            });
        },

        // 编辑宠物病史
        updatePetMedical(req,res){
            let medical_history = req.body.medical_history;
            let pets_id = req.body.pets_id;
            let sql = 'update pets_info set medical_history=? where pets_id=?' 
            func.connPool(sql,[medical_history,pets_id],(err,rows) => {
                res.json({status: 200, msg: '编辑成功'});
            });
        },


};