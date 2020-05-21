<template>
	<view>
		<!-- 忘记密码 -->
		<template>
			<view class="tel">
				<input placeholder="手机号" v-model="phone" />
			</view>
			<view class="test">
				<input placeholder="请输入验证码" @input="mypassword" v-model="checkNum" />
			</view>
			<view class="get" @tap="getCheckNum()">
				<text>{{!codeTime?'获取验证码':codeTime+'s'}}</text>
			</view>
			<view class="tel2">
				<input type="password" placeholder="输入新密码" v-model="newphone" />
			</view>
			<view class="tel2">
				<input type="password" placeholder="确认密码" v-model="surephone" />
			</view>
			
			<button @tap='sure'>确定</button>
		</template>
	</view>
</template>

<script>
export default{
	data(){
		return{
			surephone:'',
			newphone:'',
			checkNum:'',
			phone:'',
			randomNumber:'',	
		}
	},
	methods:{
		// 获取验证码
		getCheckNum(){
			if(this.codeTime>0){
				uni.showToast({
					title: '不能重复获取',
					icon:"none"
				});
				return;
			}
			this.checkNum = ''
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
			// 请求服务器，发送验证码到手机 发送成功，开启倒计时
			this.codeTime = 60
			uni.request({
				url:'http://localhost:8383/api/applogin/sendMessage',
				method:'POST',
				data:{
					phone:this.phone
				},
				success: (res) => {
					console.log(res,'返回的信息')
					this.randomNumber = res.data.randomNumber
				}
			})
			let timer = setInterval(()=>{
				this.codeTime--;
				if(this.codeTime<1){
					clearInterval(timer);
					this.codeTime = 0
				}
			},1000)
		},
		
		// 验证手机号码
		isPhone(){
			// 验证手机号合法性
			var mPattern = /^1[34578]\d{9}$/;
			return mPattern.test(this.phone)
		},
		
		// 输入密码
		mypassword(e){
			this.passValue = e.detail.value
		},
		
		// 确认修改密码
		sure(){
			if(this.checkNum != this.randomNumber){
				uni.showToast({
					title:'验证码出错',
					icon:'none'
				})
			}else if(this.newphone != this.surephone){
				uni.showToast({
					title:'密码不一致',
					icon:'none'
				})
			}else{
				uni.request({
					url:'http://localhost:8383/api/applogin/forgetPassword',
					method:'POST',
					data:{
						phone:this.phone,
						password:this.surephone
					},
					success: (res) => {
						uni.showToast({
							title:'修改成功',
							duration:3000,
							success() {
								uni.navigateBack({
									delta:1
								})
							}
						})
					}
				})
			}
		}
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
.test{
	position: relative;
}
.test input{
	padding-left: 10px;
	width: 60%;
	position: relative;	
}
.get{
	position: absolute;
	right: 10px;
	font-size: 14px;
	top: 38px;
	z-index: 100;	
	background-color: #F0F0F0;
	color: #808080;
	padding: 6px;
	width: 80px;
	text-align: center;
}
.tel2{
	width: 94%;
	margin: 10px;
	border-bottom: 1px solid #f0f0f0;
	padding-bottom: 5px;
	font-size: 14px;
	margin-top: 20px;
}
.tel2 input{
	padding-left: 10px;
	width: 80%;
}
</style>
