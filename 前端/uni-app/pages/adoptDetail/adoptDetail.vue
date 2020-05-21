<template>
	<view>
		<view v-for="(item,index) in userInfo" :key="index" class="bigbox">
			<view class="bimage">
				<image :src="item.wechaturl"></image>
			</view>
			<view class="username">{{item.user_name}}</view>
			
			<!-- 详细信息 -->
			<view>
				<view class="containerDiv" >
					<uni-tag :text="item.merry" type="success" size="small"></uni-tag>
					<uni-tag :text="item.live" type="success" size="small"></uni-tag>
					<uni-tag :text="item.experience" type="success" size="small"></uni-tag>
				</view>
			</view>
			
			<!-- 领养条件 -->
			<view class="twobig">
				<view class="titleBox">宠物要求</view>
				<view class="textbox">{{item.demand}}</view>
				<view class="titleBox">备注</view>
				<h2 class="textbox">{{item.remark}}</h2>
				<view class="titleBox">联系方式</view>
				<view class="textbox">{{item.telephone}}</view>
				<view class="titleBox">地址</view>
				<view class="textbox">{{item.address}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>	
export default{
	data(){
		return{
			User:{},
			user_id:'',
			userInfo:[],
			id:''
		}
	},
	onLoad(option) {
		this.user_id = option.user_id
		this.id = option.id
		this.init()
    },
	methods:{
		init(){
			uni.request({
					url: 'http://localhost:8383/api/appPetsInfo/adoptDetail',
					method:'POST',
					data:{
						user_id:this.user_id,
						id:this.id
					}
				}).then(data => {
					var [error, res]  = data;
					this.userInfo = res.data
				})
		}
	}

}
</script>

<style>
.containerDiv{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	margin: 0 10px;
	box-shadow:2px 2px 10px 2px rgba(0,0,0,0.3);
	height: 30px;
	padding-top: 10px;
	margin-top: 10px;
}	
.icon .icon-pinzhong{
	color: orange;
}
.fontposition{
	transform: translate(-15px,15px);
}
.fontposition1{
	transform: translate(-20px,15px);
}
#fontStyle{
	transform: translateY(-10px);
}
.bimage image{
	width: 200upx;
	height: 200upx;
	border-radius: 50%;
	margin: 0 auto;
}
.bimage{
	display: flex;
	justify-content: center;
	padding-top: 10px;
	background-color: #ffd33f;
}
.twobig{
	margin: 20px 10px;
}
.titleBox{
	font-size: 14px;
	color: orange;
	border-left: 6px solid orange;
	padding-left: 12px;
}
.textbox{
	margin-bottom: 10px;
	padding-left: 20px;
}
.btn{
	width: 100px;
	background-color: orange;
	font-size: 14px;
	margin-bottom: 20px;
	color: white;
}
.message{
	font-size: 16px;
	color: orange;
	text-align: center;
	margin: 10px;
}
.username{
	font-size: 16px;
	color: white;
	text-align: center;
	padding: 10px 0;
	background-color: #ffd33f;
}
</style>
