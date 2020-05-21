<template>
	<view>
		<view class="total">			
			<view class="two">
				<view class="icon iconfont icon-dingwei" @tap="myposition"></view>
				<input placeholder="我在哪儿呢……" v-model="address" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">姓名</view>
				<input type="text" v-model="user_name" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">联系方式</view>
				<input type="text" v-model="telephone" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">住址</view>
				<input type="text" v-model="address" @tap="myposition"/>
			</view>
					
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">年龄</view>
				<input type="text" v-model="age" />
			</view>	
				
			<view class="mytitle">性别</view>
			<checkbox-group @change="genderChose">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="男"/><view style="margin-right: 40rpx;">男</view>
						<checkbox value="女"/><view style="margin-right: 40rpx;">女</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="mytitle">婚姻状态</view>
			<checkbox-group @change="merryChose">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="单身"/><view style="margin-right: 40rpx;">单身</view>
						<checkbox value="已婚"/><view style="margin-right: 40rpx;">已婚</view>
						<checkbox value="热恋中"/><view style="margin-right: 40rpx;">热恋中</view>
					</label>
				</view>
			</checkbox-group>
				
			<view class="mytitle">居住情况</view>
			<checkbox-group @change="liveChose">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="自住房"/><view style="margin-right: 40rpx;">自住房</view>
						<checkbox value="合租"/><view style="margin-right: 40rpx;">合租</view>
						<checkbox value="整租房"/><view style="margin-right: 40rpx;">整租房</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="mytitle">有无经验</view>
			<checkbox-group @change="experienceChose">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="有"/><view style="margin-right: 40rpx;">有</view>
						<checkbox value="无"/><view style="margin-right: 40rpx;">无</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="btn">
				<button @tap="apply">发起申请</button>
			</view>
			
		</view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default{
	data(){
		return{
			user_id:'',
			telephone:'',
			address:'',
			user_name:'',
			gender:'',
			pets_id:'',
			live:'',
			experience:'',
			age:'',
			merry:'',
			myid:'',
			status:'申请中'
		}
	},
	onLoad(options) {
		this.user_id = options.user_id
		this.pets_id = options.pets_id
		this.init()
	},
	computed: mapState(['hasLogin','uerInfo']), 
	methods:{
		...mapMutations(['login']),
		// 定位
		myposition(){
			uni.chooseLocation({
				success: (res)=> {
					this.address = res.address
				}
			})
		},
		
		// 居住类型
		liveChose(e){
			this.live = e.detail.value
		},
		
		// 性别
		genderChose(e){
			this.gender = e.detail.value
		},
		
		// 婚姻状况
		merryChose(e){
			this.merry = e.detail.value
		},
		
		// 有无经验
		experienceChose(e){
			this.experience = e.detail.value
		},
		
		// 点击发起申请
		apply(){
			console.log(this.address)
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.myid = res.data.user_id
					this.tok = res.data.token
					uni.request({
						url:'http://localhost:8383/api/appPetsinfo/demandAdopt',
						method:'POST',
						data:{
							raise_id:this.user_id,
							pets_id:this.pets_id,
							user_name:this.user_name,
							telephone:this.telephone,
							address:this.address,
							merry:this.merry,
							gender:this.gender,
							live:this.live,
							age:this.age,
							experience:this.experience,
							adopt_id:this.myid,
							status:this.status
						}
					})
					uni.switchTab({
						url:'../home/home'
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.mytitle{
	margin-top: 40rpx;
	position: relative;
}
.testCss{
	display: flex;
	flex-wrap: nowrap;
}
.checkBox{
	display: flex;
	flex-wrap: nowrap;
	margin-right: 40rpx;
}
.keeptitle{
	width: 100%;
	margin: 0 auto;
	line-height: 50rpx;
	background-color: orange;
	text-align: center;
	margin-top: 10rpx;
	color: white;
}
.total{
	width: 90%;
	margin: 0 auto;
}
.uni-list{
	margin-top: 20rpx;
}
.two{
	display: flex;
	flex-wrap: nowrap;
	margin: 30rpx 0;
}
.two input{
	width: 80%;
	border: 2rpx solid #EEEEEE;
	padding: 10rpx 20rpx;
}
.two view{
	font-size: 70rpx;
	color: orange;
	transform: translateY(-20rpx);
}
input{
	border: 2rpx #d1d1d1 solid;
	width: 70%;
	padding: 5rpx;
	padding-left: 10rpx;
}
.mytitle{
	margin-top: 40rpx;
	position: relative;
}
.btn{
	margin: 20rpx 0;
}
.btn button{
	width: 100px;
	background-color: orange;
	font-size: 14px;
	margin-bottom: 20px;
	color: white;
}
</style>
