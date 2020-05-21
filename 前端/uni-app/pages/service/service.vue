<template>
	<view>
		<view class="imageCss">
			<image src="http://image.jt.com/wechat/problem.png" style="margin: 20rpx; border-radius: 50rpx;" mode="widthFix"></image>
			<image src="http://image.jt.com/wechat/second.jpg" style="width: 50%;" mode="widthFix"></image>
		</view>
		
		<view class="two">
			<view class="icon iconfont icon-dingwei" @tap="myposition"></view>
			<input placeholder="我在哪儿呢……" v-model="myaddress" />
		</view>
		
		<view class="iconCss" style="margin-top: 40rpx;">
			<view @tap="keep" class="icon iconfont icon-jiaju"></view>
			<view @tap="wash" class="icon iconfont icon-yiliao"></view>
			<view @tap="hospital" class="icon iconfont icon-xizao"></view>
		</view>
		<view class="textCss">
			<view @tap="keep">寄养</view>
			<view @tap="wash">洗护</view>
			<view @tap="hospital">医疗</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				myaddress:'',
				userId:'',
				tok:''
			}
		},
		onLoad() {
			this.init()
		},
		computed: mapState(['hasLogin','uerInfo']), 
		methods: {
			...mapMutations(['login']),
			// 我的位置
			myposition(){
				uni.chooseLocation({
				    success: (res)=> {
						this.myaddress = res.address
						console.log(this.myaddress,"地址")
				    }
			})
		},
		
		// 初始化页面
		init(){
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.userId = res.data.user_id
					this.tok = res.data.token
				}
			})
		},
		
		// 寄养
		keep(){
			uni.navigateTo({
				url:'../serviceDetail/keep?user_id='+this.userId+'&address='+this.myaddress
			})
		},
		
		// 洗护+造型
		wash(){
			uni.navigateTo({
				url:'../serviceDetail/wash?user_id='+this.userId+'&address='+this.myaddress
			})
		},
		
		// 医疗
		hospital(){
			uni.navigateTo({
				url:'../serviceDetail/hospital?user_id='+this.userId+'&address='+this.myaddress
			})
		}
	}
}
</script>

<style scoped>
.imageCss{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
}
.imageCss image{
	width: 80%;
}
.iconCss,.textCss{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	margin: 0;
	padding: 0;
}
.two{
	display: flex;
	flex-wrap: nowrap;
	margin: 30rpx 0;
}
.two input{
	width: 70%;
	border: 2rpx solid #EEEEEE;
	padding: 10rpx 20rpx;
}
.two view{
	margin-left:70rpx;
	font-size: 70rpx;
	color: orange;
	transform: translateY(-20rpx);
}
</style>
