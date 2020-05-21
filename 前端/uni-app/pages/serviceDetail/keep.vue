<template>
	<view>
		<view class="total">
			<view>
				<view>寄养价格 元/天</view>
				<uni-grid :column="3" :show-border="true"  :square="false" style="text-align: center;">
				    <uni-grid-item>
				        <text class="text"></text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">狗</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">猫</text>
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
			<view class="mytitle">宠物种类</view>
			<checkbox-group @change="petsKind">
				<view style="display: flex;flex-wrap: nowrap;">
					<label class="checkBox">
						<checkbox value="狗"/><view  style="margin-right: 40rpx;">狗</view>
						<checkbox value="猫"/><view  style="margin-right: 40rpx;">猫</view>
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
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						寄养起始日期
					</view>
					<view class="uni-list-cell-db" v-model="beginTime">
						<picker mode="date" :value="startdate" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startdate}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						寄养结束日期
					</view>
					<view class="uni-list-cell-db" v-model="endTime">
						<picker mode="date" :value="enddate" :start="startDate" :end="endDate" @change="bindDateChange2">
							<view class="uni-input">{{enddate}}</view>
						</picker>
					</view>
				</view>
			</view>
			
			<view class="two">
				<view class="icon iconfont icon-dingwei" @tap="myposition"></view>
				<input placeholder="我在哪儿呢……" v-model="myaddress" />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">宠物名</view>
				<input type="text" v-model="pets_name"  />
			</view>
			
			<view style="transform: translateY(-40rpx);">
				<view class="mytitle">名字</view>
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
export default{
	data(){
		const currentDate = this.getDate({
		    format: true
		})
		return{
			userId:'',
			startdate: currentDate,
			enddate: this.tomorrow,
			telephone:'',
			address:'',
			kind:'',
			shape:'',
			myaddress:'',
			acData:'',
			price:'',
			showPrice:false,
			days:'',
			tomorrow:'',
			pay:false,
			user_name:'',
			pets_name:'',
			money:''
		}
	},
	onLoad(options) {
		this.userId = options.user_id
		this.myaddress = options.address
		console.log(this.userId,this.address)
		this.init()
	},
	watch:{
		kind(val){
			this.isShow()
		},
		shape(val){
			this.isShow()
		},
		startdate(val){
			this.isShow()
		},
		enddate(val){
			this.isShow()
		}
	},
	computed: {
	        startDate() {
	            return this.getDate('start');
	        },
	        endDate() {
	            return this.getDate('end');
	        }
	    },
	methods:{
		bindDateChange(e){
			this.startdate = e.target.value
			console.log(this.startdate,"起始时间")
		},
		
		bindDateChange2(e){
			this.enddate = e.target.value
			console.log(this.enddate,"结束时间")
			var begin = Date.parse(this.startdate)
			var end = Date.parse(this.enddate)
			this.days = (end - begin)/(1*24*60*60*1000)
			console.log(this.days,"间隔多少天")
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		
		// 定位
		myposition(){
				uni.chooseLocation({
				    success: (res)=> {
						this.myaddress = res.address
				    }
			})
		},
		
		// 种类
		petsKind(e){
			this.kind = e.detail.value
			console.log(this.kind)
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
					this.money =this.acData[0].money
					console.log(this.money,"money")
				}
			}),
			// 获取明天的日期
			this.tomorrow = new Data()
			this.tomorrow.setTime(this.tomorrow.getTime()+24*60*60*1000);
			this.tomorrow = this.tomorrow.getFullYear()+"-" + (this.tomorrow.getMonth()+1) + "-" + this.tomorrow.getDate();
		},
		
		isShow(){
			if(this.kind.length==0 || this.shape.length==0 || this.startdate.length==0 || this.enddate.length==0){
				this.showPrice = false
				this.pay = false
			}else{
				this.showPrice = true
				this.pay = true
				if(this.kind == '狗'){
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
				this.$refs.popup.open()
			},
			
			// 给钱
			wechatpay(){
				if(this.money < this.price){
					uni.showToast({
						title:'余额不足',
						icon:'none'
					})
				}else{
					this.money = this.money - this.price
					uni.request({
						url:'http://localhost:8383/api/appService/insertKeep',
						method:'POST',
						data:{
							user_id:this.userId,
							money:this.money,
							user_name:this.user_name,
							telephone:this.telephone,
							pets_name:this.pets_name,
							price:this.price,
							address:this.address,
							kind:this.kind,
							shape:this.shape,
							begin_time:this.startdate,
							end_time:this.enddate
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
