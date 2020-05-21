
const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAI4FitAFMzatwKfwiEUSZr'//你自己在阿里云后台的accessKeyId
const secretAccessKey = 'zjhv74bI76717OrSzQrEflumnTwErS'//secretAccessKey
var sendmsg = {};
module.exports = sendmsg;

sendmsg.send = async (ctx, next) =>{
    var number="";
    for(var i=0;i<6;i++){
        number+=Math.floor(Math.random()*10)
    }
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    //发送短信
    var s = await smsClient.sendSMS({
        PhoneNumbers: '13888888888',//发送的电话号码
        SignName: '阿斯蒂芬',//认证签名
        TemplateCode: 'SMS_11111111',//模板id
        TemplateParam: '{"number":"'+number+'","product":"阿斯蒂芬"}'//特别注意，这里的参数名
    })
    if(s.Code=="OK"){
        ctx.body = {code :1,msg :number}
    }else{
        ctx.body = {code :0}
    }
    
    const sendmsg = require('../controller/sendmsg');
    //发送短信
    router.get('/sendmsg',sendmsg.send)
}
