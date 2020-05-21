const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
    // 创建token类
    class Jwt {
        constructor(data){
            this.data = data
        }


    // 生成token
    generateToken(){
        var token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
        return token
    }

    // 校验token
    verifyToken(){
        let token = this.data;
        let res;
        try {
            let result = jwt.verify(token,'shhhhh');
            let {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}
module.exports = Jwt