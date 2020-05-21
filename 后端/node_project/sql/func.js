let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);
let log = require('../log/logger')

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
                if (err) {
                    console.log(err,'错误');
                }
                conn.release();
                cb(err, rows);
                // log.info("释放资源")
                
                // pool.releaseConnection(conn)
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};