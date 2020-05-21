<template>
    <div class="login">
        <template v-if="isShow">
            <div class="admin"><h1>爱宠小窝后台管理系统</h1></div>
            <div class="tableDiv">
                <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
                    <el-form-item prop="keyword">
                        <div>
                            <el-input type="text" v-model="loginForm.keyword" auto-complete="off" placeholder="account/telephone">
                                <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="password" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="btnDiv">
                            <el-button @click="resetForm('loginForm')">重置</el-button>
                            <el-button type="info" @click="submitForm('loginForm')">提交</el-button>
                            <el-button class="forgetBtn" @click="forgetPassword">{{isShow?'忘记密码':'返回上一级'}}</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        
        <template v-else>
            <div class="admin"><h1>找回密码</h1></div>
            <div class="tableDiv">
                <el-form :model="newInfo" :rules="rules" ref="newInfo" label-width="100px" class="login-form">
                    <el-form-item prop="phone">
                        <div class="two">
                            <el-input type="text" v-model="newInfo.phone" auto-complete="off" placeholder="telephone">
                                <i slot="prefix" class="el-icon-phone"></i>
                            </el-input>
                        </div>
                        <div class="getNumber" @click="getCheckNum">{{!codeTime?'获取验证码':codeTime+'s'}}</div>
                    </el-form-item>
                    
                    <el-form-item prop="checkNumber">
                        <el-input v-model="newInfo.checkNumber" auto-complete="off" placeholder="check number">
                            <i slot="prefix" class="el-icon-chat-dot-square"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="myPassword">
                        <el-input v-model="newInfo.myPassword" auto-complete="off" placeholder="new password" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="surePassword">
                        <el-input v-model="newInfo.surePassword" auto-complete="off" placeholder="sure password" show-password>
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="btnDiv">
                            <el-button @click="resetInfo('newInfo')">重置</el-button>
                            <el-button type="info" @click="changePass('newInfo')">提交</el-button>
                            <el-button class="forgetBtn" @click="forgetPassword">{{isShow?'忘记密码':'返回上一级'}}</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </template>
        
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                keyword: '',
                password: ''
            },
            newInfo:{
                phone:'',
                myPassword:'',
                surePassword:'',
                checkNumber:''
            },
            rules: {
                keyword: [{required: true, message: '请输入账号/手机号', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
                checkNumber: [{required: true, message: '请输入验证码', trigger: 'blur'}],
                surePassword: [{required: true, message: '请输入确认密码', trigger: 'blur'}],
                myPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}]
            },
            isShow:true,
            codeTime:0,
            randomNumber:'',
            userInfo:{}
        };
    },
    
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.func.ajaxPost(this.api.userLogin, this.loginForm, res => {
                        if (res.data.status === 200) {
                            // console.log(res.data.status,"status")
                            let store = this.$store.commit('user', res.data.user);
                            this.userInfo = res.data.user
                            // window.localStorage.setItem(this.userInfo,JSON.stringify(this.userInfo))
                            // console.log(window.localStorage.getItem(this.userInfo),'用户登录信息')
                            this.$router.push({path:'../admin',query:{keyword:this.loginForm.keyword}});
                        }else{
                            this.$message({type:"error",message:res.data.msg,duration:3000});
                        }
                    });
                }
            });
        },
        
        // 登录条件置空
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 找回密码/登录页面切换
        forgetPassword(){
            this.isShow = !this.isShow
            this.loginForm.keyword = '',
            this.loginForm.password = '',
            this.newInfo.phone = '',
            this.newInfo.myPassword = '',
            this.newInfo.surePassword = '',
            this.newInfo.checkNumber = ''
        },

		// 验证手机号码
		isPhone(){
			// 验证手机号合法性
			var mPattern = /^1[34578]\d{9}$/;
			return mPattern.test(this.newInfo.phone)
		},
		
		// 获取验证码
		getCheckNum(){
            let that = this
			if(this.codeTime>0){
				that.$message({
                    type:'error',
                    message:'不能重复获取',
                    duration:2000
                })
				return;
			}
			// 验证手机号合法性
			var mPattern = /^1[34578]\d{9}$/;
			if(!this.isPhone()){
				that.$message({
                    type:'error',
                    message:'请输入正确的手机号',
                    duration:2000
                })
				return;
			}
			// 请求服务器，发送验证码到手机  发送成功，开启倒计时
			this.codeTime = 60
            this.func.ajaxPost(this.api.sendMessage,
            {
                phone: this.newInfo.phone
            }, res => {
                        console.log(res,"返回的信息")
                        this.randomNumber = res.data.randomNumber
                    });
			let timer = setInterval(()=>{
				this.codeTime--;
				if(this.codeTime<1){
					clearInterval(timer);
					this.codeTime = 0
				}
			},1000)
        },
        
        // 重置修改密码信息
        resetInfo(formName){
            this.$nextTick(()=>{
                this.$refs[formName].resetFields();
            })
        },

        // 修改密码
        changePass(formName){
            let that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!this.isPhone()){
                        that.$message({
                            type:'error',
                            message:'请输入正确的手机号',
                            duration:2000
                        })
			        }else if(this.newInfo.checkNumber != this.randomNumber){
                        that.$message({
                        type:'error',
                        message:'验证码出错',
                        duration:2000
                        })
                    }else if(this.newInfo.myPassword != this.newInfo.surePassword){
                        that.$message({
                            type:'error',
                            message:'输入密码不一致',
                            duration:2000
                        })
                    }else{
                        this.func.ajaxPost(this.api.forgetPassword,
                        {
                            telephone:this.newInfo.phone,
                            password:this.newInfo.myPassword
                        }, res => {
                            this.$nextTick(()=>{
                                that.$message({
                                    type:'success',
                                    message:'修改成功',
                                    duration:2000,
                                    })
                                that.forgetPassword()
                            })
                        });
                    }
                }
            });
        }
    },


    created () {
        if (this.$store.state.user) {
            this.$router.push('/admin');
        }
    },

}
</script>
<style scoped>
/deep/ .el-input__inner{
        width: 420px;
        height: 65px;
        padding-left: 10px;
        font-size: 20px;
        background-color: #283443;
        border-color: #3e4957;
        outline: none;
        color:#889aa4;
        padding-left: 70px;
    }
  /deep/ .el-input__icon,.el-icon-chat-dot-square,.el-icon-phone{
      margin-top: 10px;
      margin-left: 10px;
      font-size: 30px;
  }
  .el-icon-chat-dot-square,.el-icon-phone{
      transform: translateY(5px);
  }
.login{
    background-color: #2d3a4b;
    width: 100%;
    height: 100%;
    position: fixed;
}
.admin{
    display: flex;
    justify-content: center;
    color: #eeeeee;
    padding-top: 100px;
}
.tableDiv{
    padding-top: 50px;
    display: flex;
    justify-content: center;
    transform: translateX(-50px);
} 
.btnDiv{
    display: flex;
    justify-content: center;
}
.forgetBtn{
    background-color: #2d3a4b;
    border: 1px solid #2d3a4b;
    color: white;
    font-size: 16px;
}
.two{
    position: relative;
}
.getNumber{
    position: absolute;
    left: 440px;
    top: 5px;
    z-index: 100;
    width: 100px;
    background-color: navajowhite;
    text-align: center;
    padding: 5px 0;
}
.getNumber:hover{
    cursor: pointer;
}
</style>