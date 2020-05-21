<template>
	<view>
		<view class="total">
			<view>
				<view>价格</view>
				<uni-grid :column="3" :show-border="true"  :square="false" style="text-align: center;">
				    <uni-grid-item>
				        <text class="text"></text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">绝育</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">疫苗</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">狗 雌/雄</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">2000/1500</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">200</text>
				    </uni-grid-item>
					<uni-grid-item>
					    <text class="text">猫 雌/雄</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">1000/500</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">110</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="mytitle">服务类型</view>
			<checkbox-group @change="servicetype">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="绝育"/><view  style="margin-right: 40rpx;">绝育</view>
						<checkbox value="疫苗"/><view  style="margin-right: 40rpx;">疫苗</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="mytitle">动物</view>
			<checkbox-group @change="petkind">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="狗"/><view  style="margin-right: 40rpx;">狗</view>
						<checkbox value="猫"/><view  style="margin-right: 40rpx;">猫</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="mytitle">宠物性别</view>
			<checkbox-group @change="petgender">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="雌"/><view  style="margin-right: 40rpx;">雌</view>
						<checkbox value="雄"/><view  style="margin-right: 40rpx;">雄</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="two">
				<view class="icon iconfont icon-dingwei" @tap="myposition"></view>
				<input placeholder="我在哪儿呢……" v-model="address" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">宠物姓名</view>
				<input type="text" v-model="pets_name" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">姓名</view>
				<input type="text" v-model="user_name" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">联系方式</view>
				<input type="text" v-model="telephone" />
			</view>
			
			<view v-if="showPrice" class="twotags">
				<view>价格：</view>
				<view>{{price}} 元</view>
			</view>
			
			<view class="wechat" v-if="pay" @tap="payfor">
				<view class="icon iconfont icon-weixin" style="color: #09BB07;"></view>
				<view>微信支付</view>	
			</view>
			
			<!-- 底部弹出 -->
			<uni-popup ref="popup" type="center">
				<view class="popcss">
					<view>请输入支付密码</view>
					<view>￥{{price}}</view>
					<view class="three">
						<view>支付方式</view>
						<view>
							<view class="icon iconfont icon-lingqian"></view>
							<view>零钱 ></view>
						</view>
					</view>
					<button @tap="wechatpay">支付</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	data(){
		return{
			userId:'',
			telephone:'',
			address:'',
			service:'',
			acData:{},
			price:'',
			showPrice:false,
			pets_name:'',
			pay:false,
			user_name:'',
			gender:'',
			kind:'',
			money:''
		}
	},
	onLoad(options) {
		this.userId = options.user_id
		this.address = options.address
		this.init()
	},
	watch:{
		service(val){
			this.isShow()
		},
		kind(val){
			this.isShow()
		},
		gender(val){
			this.isShow()
		}
	},
	methods:{
		// 定位
		myposition(){
				uni.chooseLocation({
				    success: (res)=> {
						this.address = res.address
				    }
			})
		},
		
		// 服务类型
		servicetype(e){
			this.service = e.detail.value
		},
		
		// 类型
		petkind(e){
			this.kind = e.detail.value
		},
		
		// 动物性别
		petgender(e){
			this.gender = e.detail.value
		},
		
		// 页面初始化
		init(){
			uni.request({
				url:'http://localhost:8383/api/appsendAdopt/initUser',
				method:'POST',
				data:{
					user_id:this.userId
				},
				success: (res) => {
					this.acData = res.data
					this.money = this.acData[0].money
				}
			})
		},
		
		isShow(){
			if(this.service.length==0 || this.kind.length==0 || this.gender.length==0){
				this.showPrice = false
				this.pay = false
			}else{
				this.showPrice = true
				this.pay = true
				if(this.service == '绝育'){
					if(this.kind == '狗' && this.gender == '雌'){
						// 大狗
						this.price = 2000
					}else if(this.kind =='狗' && this.gender == '雄'){
						this.price = 1500
						}else if(this.kind == '猫' && this.gender == '雌'){
							this.price = 1000
						}else{
							this.price = 500
						}
				}else{
					if(this.kind == '狗'){
						this.price = 200
						}else if(this.kind == '猫'){
							this.price = 110
						}
					}
				}
			},
			
			// 微信支付弹窗
			payfor(){
				this.$refs.popup.open()
			},
			
			// 微信支付
			wechatpay(){
				if(this.money < this.price){
					uni.showToast({
						title:'余额不足',
						icon:'none'
					})
				}else{
					this.money = this.money - this.price
					uni.request({
						url:'http://localhost:8383/api/appService/updateMoney',
						method:'POST',
						data:{
							user_id:this.userId,
							money:this.money,
							user_name:this.user_name,
							telephone:this.telephone,
							service:this.service,
							gender:this.gender,
							pets_name:this.pets_name,
							price:this.price,
							address:this.address,
							kind:this.kind
						}
					})
					uni.showToast({
						title:'交易成功'
					})
					this.$refs.popup.close()
					uni.switchTab({
						url:'../home/home'
					})
				}
			}
	},
	components:{
		uniGrid,
		uniGridItem,
		uniPopup
	},
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
	width: 70%;
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
.twotags{
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	font-size: 30rpx;
}
.twotags>view:nth-child(1){
	color: red;
}
.wechat{
	display: flex;
	flex-wrap: nowrap;
	line-height: 50rpx;
	justify-content: center;
	margin-top: 20rpx;
	text-align: center;
}
.wechat>view:nth-child(2){
	padding-top: 8rpx;
	margin-left: 10rpx;
}
.popcss{
	width:600rpx;
	height: 400rpx;
	margin: 20rpx auto;
	background-color: white;
	text-align: center;
	padding-right: 50rpx;
}
.popcss>view:nth-child(1){
	margin-top: 40rpx;
}
.popcss>view:nth-child(2){
	margin-top: 20rpx;
	font-weight: 600;
	font-size: 20px;
}
.three{
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
}
.three>view:nth-child(2){
	display: flex;
	flex-wrap: nowrap;
}
.icon-lingqian{
	color: orange;
	transform: translateY(-10rpx);
	margin: 0 10rpx;
}
.popcss button{
	margin-top: 30rpx;
	width: 200rpx;
	font-size: 30rpx;
}
</style>
