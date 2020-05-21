<template>
	<view>
		<view style="margin: 20px;">
			<view class="mytitle">我的身份</view>
			<checkbox-group @change="checkboxChange">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="女"/><view  style="margin-right: 40rpx;">麻麻</view>
						<checkbox value="男"/>粑粑
					</label>	
				</view>
			</checkbox-group>
			
			<view class="mytitle">养宠经验</view>
			<checkbox-group @change="experiences">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="有经验"/><view  style="margin-right: 40rpx;">有</view>
						<checkbox value="无经验"/>无
					</label>	
				</view>
			</checkbox-group>
			
			<view class="mytitle">婚姻状况</view>
			<checkbox-group @change="merrys">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="单身"/><view  style="margin-right: 40rpx;">单身</view>
						<checkbox value="恋爱中"/><view  style="margin-right: 40rpx;">恋爱中</view>
						<checkbox value="已婚"/>已婚
					</label>	
				</view>
			</checkbox-group>
			
			<view class="mytitle">住房情况</view>
			<checkbox-group @change="house">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="自住房"/><view  style="margin-right: 40rpx;">自住房</view>
						<checkbox value="整租房"/><view  style="margin-right: 40rpx;">整租房</view>
						<checkbox value="合租"/>合租
					</label>	
				</view>
			</checkbox-group>
			
			<view class="mytitle">宠物种类</view>
			<checkbox-group @change="pets">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="狗"/><view  style="margin-right: 40rpx;">狗</view>
						<checkbox value="猫"/><view  style="margin-right: 40rpx;">猫</view>
						<checkbox value="鼠"/><view  style="margin-right: 40rpx;">鼠</view>
						<checkbox value="兔"/>兔
					</label>	
				</view>
			</checkbox-group>
			
			<!-------------------- 输入框 --------------- -->
			<view class="mytitle">品种</view>
			<input type="text" v-model="adopt.species"  />
			
			<view class="mytitle">年龄</view>
			<input type="text" v-model="adopt.age" />
			<view class="testCss">
				<view class="icon iconfont icon-dingwei" style="color: orange; transform: translateY(30rpx);" id="myicon" @tap="getaddress"></view>
				<view class="mytitle">地址</view>
			</view>
			<input type="text" v-model="myaddress" />
			<view class="mytitle">联系方式</view>
			<input type="text" v-model="adopt.telephone" />
			<view class="mytitle">领养原因</view>
			<input type="textarea" v-model="adopt.reason" />
			<view class="mytitle">要求</view>
			<input type="textarea" v-model="adopt.demand" />
			<view class="mytitle">备注</view>
			<input type="textarea" v-model="adopt.remark" />
			<button class="logoutCss" @tap="submitData">提交</button>
		</view>
	</view>
</template>

<script>
export	default{
	data(){
		return{
			adopt:{
				user_id:'',
				gender:'',
				experience:'',
				merry:'',
				live:'',
				kind:'',
				species:'',
				age:'',
				address:'',
				telephone:'',
				reason:'',
				demand:'',
				remark:''
			},
			myaddress:'',
			userid:'',
			acData:{},
		}
	},
	onLoad(options) {
		this.userid = options.user_id
		this.init()
	},
	methods:{
		// 获取位置
		getaddress(){
			// 我的位置
			uni.chooseLocation({
				success: (res)=> {
					this.myaddress = res.address
				}
			})
		},
		
		// 初始化页面
		init(){
			uni.request({
				url:'http://localhost:8383/api/appsendAdopt/initUser',
				method:'POST',
				data:{
					user_id:this.userid
				},
				success: (res) => {
					this.acData = res.data
				}
			})
		},
		
		// 调用接口发布收养
		submitData(){
			this.acData.forEach((item)=>{
				if(item.gender!='' || item.address!='' || item.telephone!=''){
					// 用户信息已全
					uni.request({
						url:'http://localhost:8383/api/appsendAdopt/addAdopt',
						method:'POST',
						data:{
							user_id:this.userid,
							experience:this.adopt.experience,
							merry:this.adopt.merry,
							live:this.adopt.live,
							status:'领养中',
							reason:this.adopt.reason,
							kind:this.adopt.kind,
							number:0,
							remark:this.adopt.remark,
							demand:this.adopt.demand,
							species:this.adopt.species,
							address:this.myaddress
						},
						success: (res) => {
							console.log('成功插入')
							uni.switchTab({
								url:'../index/index'
							})
						}
					})
				}else{
					// 新用户
					uni.request({
						url:'',
						method:'POST',
						data:{
							user_id:this.userid,
							address:this.myaddress,
							telephone:this.adopt.telephone,
							gender:this.adopt.gender,
							age:this.adopt.age,
							experience:this.adopt.experience,
							merry:this.adopt.merry,
							live:this.adopt.live,
							status:'领养中',
							reason:this.adopt.reason,
							kind:this.adopt.kind,
							number:0,
							remark:this.adopt.remark,
							demand:this.adopt.demand,
							species:this.adopt.species
						},
						success: (res) => {
							console.log('成功插入')
							uni.switchTab({
								url:'../index/index'
							})
						}
					})
				}
			})
		},
		
		// 性别
		checkboxChange(e){
			this.adopt.gender = e.detail.value
		},
		
		// 养宠经验
		experiences(e){
			this.adopt.experience = e.detail.value
		},
		
		// 住房情况
		house(e){
			this.adopt.live = e.detail.value
		},
		
		// 婚姻状况
		merrys(e){
			this.adopt.merry = e.detail.value
		},
		
		// 宠物类型
		pets(e){
			this.adopt.kind = e.detail.value
		}
	}
}
</script>

<style scoped>
.mytitle{
	margin-top: 40rpx;
	position: relative;
}
input{
	border: 2rpx #d1d1d1 solid;
	width: 100%;
	padding: 5rpx;
	padding-left: 10rpx;
}
checkbox-group{
	height: 40rpx;
}
.logoutCss{
	width: 200rpx;
	font-size: 12px;
	margin-top: 100rpx;
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
</style>
