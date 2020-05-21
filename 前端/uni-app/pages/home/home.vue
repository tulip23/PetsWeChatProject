<template>
	<view>
		<view class="unlogin" v-if="showView">
			<view class="header">
				<image src="http://image.jt.com/wechat/unlogin.png" mode="widthFix" lazy-load></image>
				<view @tap="gotoLogin">登录</view>
			</view>
			
			<view class="containerBox-icon" @tap="stopSwitch">
				<view class="icon iconfont icon-xiaoxi"></view>
				<view class="icon iconfont icon-Reply"></view>
				<view class="icon iconfont icon-pinglun1"></view>
				<view class="icon iconfont icon-fatie"></view>
				<view class="icon iconfont icon-lingqian"></view>
			</view>
			<view class="containerBox" @tap="stopSwitch">
				<view>送/领</view>
				<view>服务</view>
				<view>帖子</view>
				<view>发帖</view>
				<view>零钱</view>
			</view>
			<uni-list @tap="stopSwitch">
				<uni-list-item title="发布送养" @tap="stopSwitch"></uni-list-item>
				<uni-list-item title="发布领养" @tap="stopSwitch"></uni-list-item>
			</uni-list>
		</view>

		<view v-else v-for="(item,index) in userInfo" :key="index">
			<view class="loginDiv">
				<image v-if="item.wechaturl" :src="item.wechaturl" @tap='updateUser'></image>
				<image v-else src="http://image.jt.com/wechat/unlogin.png" mode="widthFix" lazy-load></image>
				<view style="padding-bottom: 10px;">{{item.user_name}}</view>
			</view>
			<view class="containerBox-icon">
				<view class="icon iconfont icon-xiaoxi" @tap='myRaise'></view>
				<view class="icon iconfont icon-Reply" @tap='myAdopt'></view>
				<view class="icon iconfont icon-pinglun1" @tap='myComments'></view>
				<view class="icon iconfont icon-fatie" @tap="sendPost"></view>
				<view class="icon iconfont icon-lingqian" style="color: orange;" @tap="addMoney"></view>
			</view>
			<view class="containerBox">
				<view @tap='myRaise'>送/领</view>
				<view @tap='myAdopt'>服务</view>
				<view @tap='myComments'>帖子</view>
				<view @tap="sendPost">发帖</view>
				<view @tap="addMoney">零钱</view>
			</view>
			<uni-list>
				<uni-list-item title="发布送养" @tap="gotoRaise"></uni-list-item>
				<uni-list-item title="发布领养" @tap="gotoAdopt"></uni-list-item>
				<view>
					<uni-list-item title="领养签到" @tap="adoptRecord"></uni-list-item>
				</view>
			</uni-list>
			
		</view>	
		<view class="logoutCss" v-if="showBtn">
			<button @tap="bindLogin">退出登录</button>
		</view>
		
		<!-- 弹窗 -->
		<uni-popup ref="popup" type="center">
			<view class="pop">
				<view class="icon iconfont icon-lingqian"></view>
				<view>剩余零钱</view>
				<view>￥ {{money}}</view>
				<input v-model="moneys" />
				<button @tap='add'>充钱</button>
			</view>
		</uni-popup>
		
		<!-- 换头像 -->
		<uni-popup ref="changeImage" type="center">
			<view class="popImage">
				<view @tap='chooseImage'>换头像</view>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<view class="icon iconfont icon-shanchu" @tap="del(index)"></view>
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
									</block>
									<view class="uni-uploader__input-box" v-if="imageList.length != 1">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="twocon">
					<view style="margin: 10rpx auto;width: 70px;">换昵称</view>
					<input placeholder="请输入昵称" v-model="upUser.user_name" />
				</view>
				<view class="twocon">
					<view style="margin: 10rpx auto;width: 70px;">绑定手机</view>
					<input placeholder="请输入手机号" v-model="upUser.telephone" />
				</view>
				<view class="twocon">
					<view style="margin: 10rpx auto;width: 70px;">输入密码</view>
					<input placeholder="请输入密码" type="password" v-model="upUser.password" />
				</view>
				<view class="twocon" @tap='getAddress'>
					<view style="margin: 10rpx auto;width: 70px;">地址</view>
					<input placeholder="请输入密码" v-model="upUser.address" />
				</view>
				
				<!-- 绑定手机号 -->
				<button class="btn" @tap='uploads'>保存</button>
			</view>
		</uni-popup>

	</view>
</template>

<script>
import uniBadge from "@/components/uni-badge/uni-badge.vue"
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
import {mapState,mapMutations} from 'vuex'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
var sourceType = [
	['camera'],
	['album'],
	['camera', 'album']
]
var sizeType = [
	['compressed'],
	['original'],
	['compressed', 'original']
]
export default {
	data() {
		return {
			userId:'',
			tok:{},
			userInfo:{
				user_name:'',
				wechaturl:''
			},
			showView:true,
			showBtn:false,
			money:'',
			moneys:'',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2],
			userName:'',
			ifShow:false,
			upUser:{
				user_name:'',
				telephone:'',
				password:'',
				address:'',
				wechaturl:''
			},
			myFlag:false
		}
	},
	computed: mapState(['hasLogin','uerInfo']),  
	onLoad() {
		this.init()
		this.mysign()
	},
	methods: {
		...mapMutations(['login']),
		bindLogin() {
			if (this.hasLogin){  
				this.logout()
				this.showView = true
				this.imageList = []
			}else{
				uni.navigateTo({  
					url: '/pages/index/index'  
				})  
			}  
		},
		gotoLogin(){
			uni.navigateTo({
				url:'../mylogin/mylogin'
			})
		},
		
		// 发送送养
		gotoRaise(){
			uni.navigateTo({
				url:'../sendRaise/sendRaise?user_id='+this.userId
			})
		},
		
		// 发布领养
		gotoAdopt(){
			uni.navigateTo({
				url:'../sendAdopt/sendAdopt?user_id='+this.userId
			})
		},
	
		// 判断是否已登录
		init(){
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.userId = res.data.user_id
					this.tok = res.data.token
					// console.log(this.userId,this.tok)
					uni.request({
						url: 'http://localhost:8383/api/applogin/loginUser',  
						data:{  
							'user_id':this.userId,
							'to':this.tok
						},
						header:{
							'token':'123456'
						}, 
						method:"POST",
						success: (e) => {
							this.userInfo = e.data
							this.upUser.user_name = this.userInfo[0].user_name
							this.upUser.telephone = this.userInfo[0].telephone
							this.upUser.password = this.userInfo[0].password
							this.upUser.address = this.userInfo[0].address
							this.upUser.wechaturl = this.userInfo[0].wechaturl
							this.imageList = this.imageList.concat(this.upUser.wechaturl)
							if(this.userInfo[0].money != null){
								this.money = this.userInfo[0].money
							}else{
								this.money = 0
							}
							
						}  
					}),
					 this.showView = false
					 this.showBtn = true
				} 
			})
		},
		
		// // 判断是否有领养记录
		mysign(){
			uni.getStorage({
				key:'uerInfo',
				success:(res)=>{
					this.login(res.data);
					this.userId = res.data.user_id
					uni.request({
						url:'http://localhost:8383/api/uploadVideo/signRecord',
						method:'POST',
						data:{
							adopt_id:this.userId
						},
						success: (res) => {
							if(res.data.length == 0){
								this.ifShow = false
							}else{
								this.ifShow = true
							}
						}
					})
				}
			})
		},
			
		 stopSwitch(){
			 uni.showToast({
			 	title:'请先登录',
				icon:'none'
			 })
		 },
		...mapMutations(['logout']),
		
		// 跳转至发帖页面
		sendPost(){
			uni.navigateTo({
				url:'../sendPost/sendPost?user_id='+this.userId
			})
		},
		
		// 打开遮罩
		addMoney(){
			this.$refs.popup.open()
		},
		
		// 充钱
		add(){
			this.money = parseFloat(this.money) + parseFloat(this.moneys)
			uni.request({
				url:'http://localhost:8383/api/appsendAdopt/addMoney',
				method:'POST',
				data:{
					user_id:this.userId,
					money:this.money
				},
				success: (res) => {
					this.moneys = ''
				}
			})
			this.$refs.popup.close()
		},
		
		// 修改头像
		updateUser(){
			this.$refs.changeImage.open()
		},
		
		// 选择图片
		chooseImage: async function() {
			if (this.imageList.length === 1) {
				return;	
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[this.countIndex],
				success: (res) => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					this.myFlag = true
				},
			})
		},
		// 预览图片
		previewImage: function(e) {
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.imageList
			})
		},
		
		// 删除选中的图片
		del(index){
			uni.showModal({
			    title: '提示',
			    content: '是否要删除该图片',
			    success: (res)=> {
			        if (res.confirm) {
						this.imageList.splice(index,1)
			        }
			    }
			});
		},
		
		// 修改头像
		async uploads(){
			if(this.myFlag == false){
				uni.request({
					url:'http://localhost:8383/api/appsendAdopt/updateUserInfo',
					method:'POST',
					data:{
						user_id:this.userId,
						user_name:this.upUser.user_name,
						telephone:this.upUser.telephone,
						address:this.upUser.address,
						password:this.upUser.password,
						wechaturl:this.upUser.wechaturl
					},
					success: (res) => {
						let page = getCurrentPages().pop();  //跳转页面成功之后
						if (!page) return;  
						page.onLoad(); //如果页面存在，则重新刷新页面
						this.$refs.changeImage.close()
						this.imageList = []
					}
				})
			}else{
				uni.uploadFile({
					url:'http://localhost:8383/api/appsendAdopt/updateImage',
					name:'logo',
					filePath:this.imageList.toString(),
					formData:{
						user_id:this.userId,
						user_name:this.upUser.user_name,
						telephone:this.upUser.telephone,
						address:this.upUser.address,
						password:this.upUser.password
						},
					success: (uploadFileRes) => {
						let page = getCurrentPages().pop();  //跳转页面成功之后
						if (!page) return;  
						page.onLoad(); //如果页面存在，则重新刷新页面
						this.$refs.changeImage.close()
						this.imageList = []
					},
					fail: (uploadFileRes) => {
						console.log(uploadFileRes,'失败了')
					}
				})
			}
		},
		
		// 跳转至我的领养页面
		myAdopt(){
			uni.navigateTo({
				url:'../myService/myService?user_id='+this.userId
			})
		},
		
		// 跳转至我的送养页面
		myRaise(){
			uni.navigateTo({
				url:'../myRaise/myRaise?user_id='+this.userId
			})
		},
		
		// 跳转至我的评论页面
		myComments(){
			uni.navigateTo({
				url:'../myPost/myPost?user_id='+this.userId
			})
		},
		
		// 获取地址
		getAddress(){
			uni.chooseLocation({
				    success: (res)=> {
						this.upUser.address = res.address
						console.log(this.upUser.address,"地址")
				    }
			})
		},
		
		// 跳转至签到页面
		adoptRecord(){
			if(this.ifShow == false){
				uni.showToast({
					title:'您没有领养记录',
					icon:'none'
				})
			}else{
				uni.navigateTo({
					url:'../sign/sign'
				})
			}

		},
	},
	components:{
		uniBadge,
		uniList,
		uniListItem,
		uniPopup
	}
}
</script>

<style scoped>
.header{
	justify-content: center;
	width: 100%;
	text-align: center;
}
.header image{
	width: 150upx;
	height: 150upx;
	margin: 10px;
	border-radius: 50%;
}
.loginDiv{
	justify-content: center;
	width: 100%;
	text-align: center;	
	background-color: #ffd33f;
}
.loginDiv image{
	width: 150upx;
	height: 150upx;
	margin: 10px;
	border-radius: 50%;
}
.containerBox{
	display: flex;
	width: 100%;
	margin-bottom: 10px;
	justify-content: space-around;
}
.containerBox-icon{
	display: flex;
	width: 100%;
	margin-top: 10px;
	justify-content: space-around;
}
.containerBox-badge{
	display: flex;
	width: 100%;
	margin-top: 10px;
	justify-content: space-around;	
}
.logoutCss{
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 20px;
}
.logoutCss button{
	width: 100px;
	font-size: 12px;
	background-color: white;
}
.pop,.popImage{
	width:600rpx;
	height: 400rpx;
	margin: 20rpx auto;
	background-color: white;
	text-align: center;
	padding-right: 50rpx;
}
.pop button{
	width: 150rpx;
	font-size: 12px;
	background-color: white;
	height: 70rpx;
}
.pop>view:nth-child(1){
	padding-top: 20rpx;
	color: orange;
	font-size: 20px;
}
.pop input{
	border: 1px solid #EEEEEE;
	width: 50%;
	margin: 20rpx auto;
	padding: 10rpx;
}
.pop>view:nth-child(2){
	padding-top: 10rpx;
	font-weight: 600;
}
.icon-shanchu{
	position: absolute;
	right: 0;
	top: -10;
	color: red;
}
.uni-uploader__file{
	position: relative;
}
.popImage{
	height: 900rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.popImage input{
	width: 100%;
	margin-left: 40rpx;
	border: #C0C0C0 1px solid;
	padding: 5rpx 0;
}
.cell-pd {
	padding: 22rpx 30rpx;
}
.list-pd {
	margin-left: 50rpx;
}
.btn{
	background-color: white;
	font-size: 12px;
	width: 100px;
	height: 35px;
	line-height: 35px;
}
.twocon{
	 display: flex; 
	 flex-wrap: nowrap;
	 margin-top: 10px;
}
</style>
