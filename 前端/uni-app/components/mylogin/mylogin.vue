<template>
	<view>
		<image src="http://image.jt.com/wechat/login2.png" mode="widthFix" lazy-load></image>
		<view>
			<!-- 手机密码登录 -->
			<template v-if="!status">
				<view class="tel">
					<input placeholder="手机号" v-model="userData" />
				</view>
				<view class="password">
					<input type="password" placeholder="请输入密码" @input="mypassword"  v-model="password" />
				</view>
				<view class="forget" @tap="resetPass()" v-if="passValue.length == 0">
					<text>忘记密码？</text>
				</view>
			</template>
			
			<!-- 验证码登录 -->
			<template v-else> 
				<view class="tel">
					<input placeholder="手机号" v-model="phone" />
				</view>
				<view class="test">
					<input type="password" placeholder="请输入验证码" @input="mypassword" v-model="checkNum" />
				</view>
				<view class="get" @tap="getCheckNum()">
					<text>{{!codeTime?'获取验证码':codeTime+'s'}}</text>
				</view>
			</template>

			<view class="loginBtn">
				<button :disabled="disabled" @tap="submit">登录</button>
			</view>
			<view class="yanzheng" @tap="changeStatus">
				<text>{{status?'账号密码登录':'验证码登录'}}</text>
			</view>
			
			<!-- 第三方登录 -->
			<view class="other">
				<view class="line1"></view>
					第三方登录
				<view class="line2"></view>
			</view>

			<otherLogin></otherLogin>
			<view class="agree">注册即代表您同意《爱宠小窝用户协议》</view>
		</view>
	</view>
</template>

<script>
import otherLogin from "@/components/home/other-login.vue"	
export default {
	data() {
		return {
			passValue:'',
			controls:true,
			// false为账号密码登录，true为验证码登录
			status:false,
			userData:'',
			password:'',
			phone:'',
			checkNum:'',
			disabled:true,
			codeTime:0
		}
	},
	watch:{
		userData(val){
			this.onBtnChange()
		},
		password(val){
			this.onBtnChange()
		},
		phone(val){
			this.onBtnChange()
		},
		checkNum(val){
			this.onBtnChange()
		}
	},
	methods: {
		resetPass(){
			console.log('忘记密码')
		},
		
		// 输入密码
		mypassword(e){
			this.passValue = e.detail.value
		},
		
		// 登录状态切换
		changeStatus(){
			this.initInput()
			this.status = !this.status
		},
		
		//微信登录 
		wechatLogin(){
			console.log('wechat')
		},
		
		// 验证手机号码
		isPhone(){
			// 验证手机号合法性
			var mPattern = /^1[34578]\d{9}$/;
			return mPattern.test(this.phone)
		},
		
		// 获取验证码
		getCheckNum(){
			if(this.codeTime>0){
				uni.showToast({
					title: '不能重复获取',
					icon:"none"
				});
				return;
			}
			// 验证手机号合法性
			var mPattern = /^1[34578]\d{9}$/;
			console.log(mPattern.test(this.phone))
			if(!this.isPhone()){
				uni.showToast({
					title: '请输入正确的手机号',
					icon:"none"
				});
				return;
			}
			// 请求服务器，发送验证码到手机
			// 发送成功，开启倒计时
			this.codeTime = 10
			let timer = setInterval(()=>{
				this.codeTime--;
				if(this.codeTime<1){
					clearImmediate(timer);
					this.codeTime = 0
				}
			},1000)
		},
		
		// 改变按钮状态
		onBtnChange(){
			if( (this.userData && this.password) || (this.phone && this.checkNum) ){
				this.disabled = false;
				return;
			}
			this.disabled = true
		},
		
		// 初始化表单
		initInput(){
			this.userData = ''
			this.password = ''
			this.phone = ''
			this.checkNum = ''
		},
		
		// 登录
		submit(){
			// 账号密码登录
			if(!this.status){
				return
			}
			// 验证码登录
			// 验证手机号合法性
			if(!this.isPhone()){
				uni.showToast({
					title: '请输入正确的手机号',
					icon:"none"
				});
				return;
			}
		}
	},
	components:{
		otherLogin
	}
}
</script>

<style scoped>
.tel,.password,.test{
	width: 94%;
	margin: 10px;
	border-bottom: 1px solid #f0f0f0;
	padding-bottom: 5px;
	font-size: 14px;
}
.tel input{
	padding-left: 10px;
	width: 80%;
}
.password input{
	padding-left: 10px;
	width: 80%;
	position: relative;
},
.test input{
	padding-left: 10px;
	width: 60%;
	position: relative;	
},
.forget{
	position: absolute;
	right: 10px;
	font-size: 14px;
	top: 180px;
	z-index: 100;
}
.loginBtn{
	margin: 0 10px;
}
.loginBtn button{
	background-color: #F8F8F8;
}
.yanzheng{
	text-align: center;
	font-size: 14px;
	margin: 20px;
	color: #808080;
}
.wechat{
	text-align: center;
	font-size: 30px;
	color: #09BB07;
}
.other{
	width: 100%;
	text-align: center;
	color: #808080;
	position: relative;
}
.line1{
	position: absolute;
	width: 80px;
	border-top: 1px solid #808080;
	position: absolute;
	top: 10px;
	left: 30px;
}
.line2{
	position: absolute;
	width: 80px;
	top: 10px;
	right: 30px;
	border-top: 1px solid #808080;
}
.agree{
	text-align: center;
	color: #808080;
}
.get{
	position: absolute;
	right: 10px;
	font-size: 14px;
	top: 171px;
	z-index: 100;	
	background-color: #F0F0F0;
	color: #808080;
	padding: 6px;
	width: 80px;
	text-align: center;
}
</style>
