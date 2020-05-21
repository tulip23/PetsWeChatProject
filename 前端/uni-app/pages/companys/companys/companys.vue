<template>
	<view>
		<template v-if="isShow">
			<view class="tel">
				<input placeholder="手机号" v-model="userData" />
			</view>
			<view class="password">
				<input type="password" placeholder="请输入密码" @input="mypassword"  v-model="password" />
			</view>
			<view class="forget" @tap="resetPass()">
				<text>忘记密码？</text>
			</view>
			<view class="two">
				<button>登录</button>
				<text @tap="changeStatus">注册</text>
			</view>
		</template>
		<template v-else>
			<view class="info">
				<input placeholder="手机号" v-model="myData" />
			</view>
			<view class="password">
				<input type="password" placeholder="请输入密码" @input="loadpasswords"  v-model="loadpassword" />
			</view>
			<view class="password">
				<input type="password" placeholder="请输入确认密码" @input="surepassword"  v-model="surepassword" />
			</view>
			<text @tap="changeStatus">登录</text>
			<button>注册</button>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:true,
				userData:'',
				loadpassword:'',
				surepassword:''
			}
		},
		methods: {
			// 找回密码
			resetPass(){
				uni.navigateTo({
					url:'../../forgetPass/forgetPass'
				})
			},
			 
			mypassword(e){
				this.passValue = e.detail.value
			},
			
			loadpasswords(e){
				this.loadpassword = e.detail.value
			},
			
			// 切换状态
			changeStatus(){
				if(this.isShow == 'true'){
					this.isShow =='false'
				}else{
					this.isShow == 'true'
				}
			}
		}
	}
</script>

<style scoped>
.tel,.password{
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
}
.forget{
	position: absolute;
	top: 47px;
	right: 20px;
}
.two{
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
}
.two button{
	width: 100px;
}
.two text{
	width: 50px;
	font-size: 20px;
	transform: translate(-70px,5px);
}
</style>
