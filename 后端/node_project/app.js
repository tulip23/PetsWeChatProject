let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');


let port = process.env.PORT || 8383;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// 阿里云短信验证
const SMSClient = require('@alicloud/sms-sdk')


// 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 })

app.use(session({
    secret: 'dogs',
    cookie: {maxAge: 3600000},
    resave: false,
    saveUninitialized: true,
}));


app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});

// var logMaster = require('log-master');
// logMaster.split({ //切割，目前唯一的功能
//   "from": { //源文件夹，可多选。
//     "app": "./"
//   },
//   "Suffix": [".log"], //要切割的文件类型，可多选。默认 [".log"]
//   "to": "./splitLog", //目标文件夹,log都会到这里。
//   "Interval": 1000 * 60 * 60 * 24, //切割时间间隔，默认一天。
//   "timeFormat": "yyyy年MM月dd日HH时mm分ss秒", //时间格式(生成的文件夹名),默认为yyyy年MM月dd日HH时mm分ss秒
//   "startTime": "23:59" //开始时间，默认零点,精确到秒的话就："00:00:00"
// });

var timeout = require("connect-timeout");
//在加载路由之前
app.use(timeout('3s'))    //如果3s还没有响应，req.timedout将返回true
app.use(function(req, res, next) {
    setTimeout(function() {
        if (req.timedout) {
            res.send(503);
        }
    }, 5 * 1000);

    next();    //继续执行
})
