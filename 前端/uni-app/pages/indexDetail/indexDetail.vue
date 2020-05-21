<template>
	<view>
		<view v-for="(item,index) in petsInfo" :key="index" class="bigbox">
			<view style="display: flex;justify-content: center;">
				<video v-if="item.url" :src="item.url" controls="true" enable-progress-gesture="true" enable-play-gesture="true"></video>	
			</view>
			
			<!-- 详细信息 -->
			<view>
				<view class="containerDiv" >
					<view class="icon iconfont icon-pinzhong" style="color:orange;font-size:35px;" id="fontStyle"></view>				 <view class="fontposition1">{{item.species}}</view>
					<view class="icon iconfont icon-yanse" style="color:orange;font-size:25px;"></view>
					<view class="fontposition">{{item.color}}</view>
					<view v-if="item.pet_gender=='雄'" class="icon iconfont icon-male2" style="color:orange;font-size:22px;"></view>
					<view v-if="item.pet_gender=='雌'" class="icon iconfont icon-nanxing" style="color:orange;font-size:20px;margin-top: 5px;"></view>
					<view class="fontposition">{{item.pet_gender}}</view>
					<view class="icon iconfont icon-birthday" style="color:orange;font-size:25px;"></view>
					<view class="fontposition">{{item.pet_age}}</view>
				</view>
			</view>
			
			<!-- 领养条件 -->
			<view class="twobig">
				<view class="titleBox">它的故事</view>
				<view class="textbox">{{item.reason}}</view>
				<view class="titleBox">领养条件</view>
				<h2 class="textbox">{{item.conditions}}</h2>
				<view class="titleBox">身体状况</view>
				<view class="textbox">{{item.health}}</view>
				<view class="titleBox">有无病史</view>
				<view class="textbox">{{item.medical_history}}</view>
				<view class="titleBox">领养流程</view>	
				<image src="http://image.jt.com/wechat/title.jpg" mode="widthFix"></image>			
			</view>
			
			<view>
				<button class="btn" @tap="gotoAdopt">申请领养</button>
			</view>
		</view>
	</view>
</template>

<script>
import api from '../../api.js'
import {mapState,mapMutations} from 'vuex'
export default{
	data(){
		return{
			petsID:{},
			pets_id:'',
			petsInfo:[],
			user_id:'',
			userId:''
		}
	},
	computed: mapState(['hasLogin','uerInfo']),  
	onLoad(option) {
		this.pets_id = option.pets_id
		this.user_id = option.user_id
		this.init()
    },
	
	methods:{
		...mapMutations(['login']),
		init(){
			this.pets_id = this.pets_id
			uni.request({
					url:'http://localhost:8383/api/appPetsInfo/petsDetail',
					method:'POST',
					data:{
						pets_id:this.pets_id
					}
				}).then(data => {
					var [error, res]  = data;
					this.petsInfo = res.data
				})
		},
		
		// 跳转至申请领养页面
		
		gotoAdopt(){
			uni.getStorage({
				key:'uerInfo',
				success:(res)=>{
					this.login(res.data);
					this.userId = res.data.user_id
					uni.navigateTo({
						url:'../demandAdopt/demandAdopt?user_id='+this.user_id+'&pets_id='+this.pets_id
					})
				},
				fail: (res) => {
					uni.showToast({
						title:'请登录再操作',
						icon:'none'
					})
				}
			})

		}
	}

}
</script>

<style scoped>
.containerDiv{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	margin: 0 10px;
	box-shadow:2px 2px 10px 2px rgba(0,0,0,0.3);
	height: 50px;
	overflow: hidden;
}
.bigbox{
	overflow: hidden;
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
.bimage{
	width: 94%;
	height: 200px !important;
	margin: 0 10px;
}
.twobig{
	margin: 10px;
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
</style>
