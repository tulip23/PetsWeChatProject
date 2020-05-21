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
				        <text class="text">修剪</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">洗护</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">大</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">50</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">30</text>
				    </uni-grid-item>
					<uni-grid-item>
					    <text class="text">中</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">40</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">20</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">小</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">30</text>
					</uni-grid-item>
					<uni-grid-item>
					    <text class="text">20</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="mytitle">服务类型</view>
			<checkbox-group @change="servicetype">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="修剪"/><view  style="margin-right: 40rpx;">修剪</view>
						<checkbox value="洗护"/><view  style="margin-right: 40rpx;">洗护</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="mytitle">体型</view>
			<checkbox-group @change="petsShape">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="大型"/><view  style="margin-right: 40rpx;">大型</view>
						<checkbox value="中型"/><view  style="margin-right: 40rpx;">中型</view>
						<checkbox value="小型"/><view  style="margin-right: 40rpx;">小型</view>
					</label>
				</view>
			</checkbox-group>
			
			<view class="two">
				<view class="icon iconfont icon-dingwei" @tap="myposition"></view>
				<input placeholder="我在哪儿呢……" v-model="myaddress" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">宠物姓名</view>
				<input type="text" v-model="pets_name"  />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">姓名</view>
				<input type="text" v-model="user_name"  />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">联系方式</view>
				<input type="text" v-model="telephone"  />
			</view>
			
			<view v-if="showPrice" class="twotags">
				<view>价格：</view>
				<view>{{price}} 元</view>
				<view>寄养 </view>
				<view>{{days}}</view>
				<view> 天</view>
			</view>
			
			<view class="wechat" v-if="pay" @tap="payfor">
				<view class="icon iconfont icon-weixin" style="color: #09BB07;"></view>
				<view>微信支付</view>	
			</view>
			
		</view>
	</view>
</template>

<script>
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
export default{
	data(){
		const currentDate = this.getDate({
		    format: true
		})
		return{
			userId:'',
			telephone:'',
			address:'',
			service:'',
			shape:'',
			myaddress:'',
			acData:'',
			price:'',
			showPrice:false,
			pets_name:'',
			pay:false,
			user_name:''
		}
	},
	onLoad(options) {
		this.userId = options.user_id
		console.log(options)
		this.myaddress = options.address
		console.log(this.userId,options)
		this.init()
	},
	watch:{
		kind(val){
			this.isShow()
		},
		shape(val){
			this.isShow()
		},
	},
	methods:{
		// 定位
		myposition(){
				uni.chooseLocation({
				    success: (res)=> {
						this.myaddress = res.address
				    }
			})
		},
		
		// 服务类型
		servicetype(e){
			this.service = e.detail.value
			console.log(this.service)
		},
		
		// 体型
		petsShape(e){
			this.shape = e.detail.value
			console.log(this.shape)
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
					console.log(this.acData,"acdata")
				}
			})
		},
		
		isShow(){
			if(this.servicetype.length==0 || this.shape.length==0){
				this.showPrice = false
				this.pay = false
			}else{
				this.showPrice = true
				this.pay = true
				if(this.kind == '修剪'){
					if(this.shape == '大型'){
						// 大狗
						this.price = 50 * this.days
					}else if(this.shape =='中型'){
						this.price = 40 * this.days
						}else{
							this.price = 30
						}
				}else{
					if(this.shape == '大型'){
						this.price = 30 * this.days
						}else if(this.shape == '中型' || this.shape == '小型'){
							this.price = 20 * this.days
						}
					}
				}
			},
			
			// 微信支付
			payfor(){
				
			}
	},
	components:{
		uniGrid,
		uniGridItem
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
.twotags>view:nth-child(3){
	margin-left: 40rpx;
}
.twotags>view:nth-child(4){
	margin: 0 10rpx;
}
.wechat{
	display: flex;
	flex-wrap: nowrap;
	line-height: 50rpx;
	justify-content: center;
	margin-top: 20rpx;
}
.wechat>view:nth-child(2){
	padding-top: 8rpx;
	margin-left: 10rpx;
}
</style>
