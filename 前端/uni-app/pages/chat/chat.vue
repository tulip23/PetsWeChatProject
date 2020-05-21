<template>
	<view>
		<!-- 好友 -->
		<view class="user-chat-list"> 
			<image src="http://image.jt.com/wechat/doge1.jpg" mode="widthFix" lazy-load></image>
			<view class="user-chat-list-body">
				<!-- <text>随便啦</text> -->
				<image src="http://image.jt.com/wechat/head.jpg" mode="widthFix"></image>
			</view>
		</view>
		<!-- 自己 -->
		<view class="user-chat-me">
			<view class="user-chat-me-body">
				<!-- <text>随便啦</text> -->
				<image src="http://image.jt.com/wechat/doge1.jpg" mode="widthFix"></image>
			</view>
			<image src="http://image.jt.com/wechat/head.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 底部输入框 -->
		<userChatBottom @submit="submit"></userChatBottom>
	</view>
</template>

<script>
import userChatBottom from "@/components/userChat/userChatBottom.vue"
export default{
	data(){
		return{
		}
	},
	onLoad(option){
		this.userInfo = option
		this.init()
	},
	methods:{
		init(){
			this.user_id= this.userInfo.user_id
			uni.request({
					url: 'http://localhost:8383/api/appPetsInfo/adoptDetail',
					method:'POST',
					data:{
						user_id:this.user_id
					}
				}).then(data => {
					var [error, res]  = data;
					this.userInfo = res.data
				})
		},
		
		// 发送文字按钮
		submit(data){
			// 发送逻辑
			console.log('当前输入的是',data)
		}
	},
	components:{
		userChatBottom,
	}
}
</script>
<style>
.user-chat-list{
	position: relative;
	display: flex;
	justify-content: flex-start;
	margin: 20upx;
}
.user-chat-list>image{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	flex-shrink: 0;
	position: relative;
}
.user-chat-list-body{
	margin-top: 15upx;
	background: #F4F4F4;
	padding: 25upx;
	margin-left: 20upx;
	margin-right: 20upx;
	width: auto;
	display: inline-block;
	transform: translateY(-5px);
	border-radius: 3px;
}
.user-chat-list-body:after{
	position: absolute;
	left: -30upx;
	right: 0;
	content: '';
	width: 0;
	height: 0;
	border: 16upx solid #F4F4F4;
	top: 30upx;
	border-color: transparent #F4F4F4 transparent transparent;
}
.user-chat-list-body>image{
	max-width: 150upx;
	max-height: 200upx;
}
.user-chat-me{
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin: 20upx;
}
.user-chat-me>image{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	position: relative;
}
.user-chat-me-body{
	width: auto;
	display: inline-block;
	background: #F4F4F4;
	padding: 25upx;
	margin-right: 10px ;
}
.user-chat-me-body>image{
	max-width: 150upx;
	max-height: 200upx;
}
.user-chat-me-body:after{
	position: absolute;
	right: 90upx;
	border-color: transparent transparent transparent #F4F4F4;
	content: '';
	width: 0;
	height: 0;
	border: 16upx solid #F4F4F4;
	border-color: transparent transparent transparent #F4F4F4;
} 
</style>
