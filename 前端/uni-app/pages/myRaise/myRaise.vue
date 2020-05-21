<template>
	<view>
		<!-- 发表的送养 -->
		<template>
			<view class="myraise">发布的送养</view>
			<view v-if="raiseRecord.length != 0">
				<uni-grid :column="4" :show-border="true" :square="false" style="text-align: center;">
					<!-- 标题 -->
					<uni-grid-item>
					    <text class="text">宠物id</text>
					</uni-grid-item>
				    <uni-grid-item>
				        <text class="text">时间</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">种类</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">状态</text>
				    </uni-grid-item>
					<!-- 值 -->
					<template v-if="raiseRecord.length != 0" v-for="(item) in raiseRecord">
						<uni-grid-item>
							<text class="text">{{item.pets_id}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.time}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.species}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.status}}</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else class="myCss">
				没有送养记录
			</view>
		</template>
		
		<template>
			<view class="myraise">我的申请领养记录</view>
			<view v-if="applyRecord.length != 0">
				<uni-grid :column="4" :show-border="true" :square="false" style="text-align: center;">
				    <uni-grid-item>
				        <text class="text">宠物名</text>
				    </uni-grid-item>
				    <uni-grid-item>
				        <text class="text">申请时间</text>
				    </uni-grid-item>
					<uni-grid-item>
					    <text class="text">种类</text>
					</uni-grid-item>
				    <uni-grid-item>
				        <text class="text">状态</text>
				    </uni-grid-item>
					<!-- 值 -->
					<template v-for="(item) in applyRecord">
						<uni-grid-item>
							<text class="text">{{item.pets_name}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.time}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.kind}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.status}}</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else  class="myCss">没有申请领养记录</view>
		</template>
		
		<!-- 领养状态 -->
		<template>
			<view class="myraise">送养宠物的申请领养记录</view>
			<view v-if="myPets.length != 0">
				<uni-grid :column="4" :show-border="true" :square="false" style="text-align: center;">
					<uni-grid-item>
						<text class="text">宠物编号</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">申请人信息</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">状态</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">修改</text>
					</uni-grid-item>
					<!-- 值 -->
					<template v-for="(item) in myPets">
						<uni-grid-item>
							<text class="text">{{item.pets_id}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text" style="color: #007AFF;" @tap="openMyInfo(item)">{{item.user_name}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="statuss">{{item.status}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="changeCss" @tap="openStatus(item)">修改</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-if="myPets.length == 0" class="myCss">没有申请记录</view>
		</template>
		
		<!-- 用户信息弹窗 -->
		<uni-popup ref="myInfo" type="center">
			<view class="bigBox">
				<br>
				<view class="name">申请人 {{myName}} 的详细信息</view>
				<view class="all">
					<view>
						<span class='one'>养宠经验</span>
						<span class='two'>{{experience}}</span>
					</view>
					<view>
						<span class='one'>年龄</span>
						<span class='two'>{{age}}</span>
					</view>
					<view>
						<span class='one'>居住情况</span>
						<span class='two'>{{live}}</span>
					</view>
					<view>
						<span class='one'>婚姻状况</span>
						<span class='two'>{{merry}}</span>
					</view>
					<view>
						<span class='one'>性别</span>
						<span class='two'>{{gender}}</span>
					</view>
					<view>
						<span class='one'>住址</span>
						<span class='two'>{{address}}</span>
					</view>
					<view>
						<span class='one'>联系方式</span>
						<span class='two'>{{telephone}}</span>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 下拉框 -->
		<uni-popup ref="changePop" type="center">
			<view class="changeBtn">
				<view class="name">改变申请人 {{changeName}} 的状态</view>
				<view class="uni-form-item uni-column">
					<checkbox-group @change="chooseStatus">
						<view style="margin-top: 10px;">
							<label class="checkBox" style="display: flex;flex-wrap: nowrap; justify-content: center;">
								<checkbox value="审批通过"/><view  style="margin-right: 40rpx;">审批通过</view>
								<checkbox value="审批不通过"/><view  style="margin-right: 40rpx;">审批不通过</view>
							</label>
						</view>
					</checkbox-group>
				</view>
				<button @tap="changeStatus" class="btn">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	data(){
		return{
			user_id:'',
			raiseRecord:{},
			applyRecord:{},
			myPets:{},
			myName:'',
			experience:'',
			age:'',
			live:'',
			merry:'',
			gender:'',
			address:'',
			telephone:'',
			status:'',
			userID:'',
			index:0,
			myArray:['-----请选择-----','审批通过','审批不通过'],
			changeName:''
		}
	},
	onLoad(option) {
		this.user_id = option.user_id
		this.init()
		this.applys(),
		this.applyPets()
		this.allPost()
	},
	methods:{
		// 页面初始化--是否有送养记录
		init(){
			uni.request({
				url:'http://localhost:8383/api/appMyRaise/raiseRecord',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.raiseRecord = res.data
				}
			})
		},
		
		// 申请领养记录
		applys(){
			uni.request({
				url:'http://localhost:8383/api/appMyRaise/raiseApply',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.applyRecord = res.data
				}
			})
		},
		
		// 别人的申请记录
		applyPets(){
			uni.request({
				url:'http://localhost:8383/api/appMyRaise/applyForPets',
				method:'POST',
				data:{
					raise_id:this.user_id
				},
				success: (res) => {
					this.myPets = res.data
				}
			})
		},
		
		// 打开申请人的信息
		openMyInfo(item){
			this.myName = item.user_name
			this.userInfo = item
			this.experience = item.experience,
			this.age = item.age,
			this.live = item.live,
			this.merry = item.merry,
			this.gender = item.gender,
			this.address = item.address
			this.telephone = item.telephone
			this.$refs.myInfo.open()
		},
		
		// 打开弹窗
		openStatus(item){
			this.status = item.status
			this.userID = item.adopt_id
			this.changeName = item.user_name
			console.log(item,'这是啥')
			this.$refs.changePop.open()
		},
		
		// 下拉框的值
		chooseStatus(e){
			console.log(e,'e的值')
			this.status = e.detail.value.toString()
			console.log(this.status)
		},
		
		// 调用接口改变状态
		changeStatus(item){
			console.log(this.userID,this.status)
			uni.request({
				url:'http://localhost:8383/api/record/updateStatus',
				method:'POST',
				data:{
					adopt_id:this.userID,
					status:this.status
				},
				success: (res) => {
					this.$refs.changePop.close()
					this.applyPets()
				}
			})
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
.myraise{
	margin: 10rpx;
	font-weight: 600;
}
.myCss{
	margin-left: 20px;
}
.bigBox{
	width: 250px;
	height: 400px;
	background-color: white;
}
.name{
	width: 50%;
	margin: 0 auto;
	padding: 5px;
	background-color: #ffd33f;
	text-align: center;
	margin-top: 10px;
}
.one,.two{
	padding-bottom: 5px;
	border-bottom: 2px #C0C0C0 solid;
}
.one{
	margin: 10px;
	display: inline-block;
	width: 50px;
	text-align: center;
}
.two{
	padding-bottom: 8px;
}
.all{
	width: 100%;
	margin-top: 10px;
}
.changeBtn{
	width: 300px;
	height: 200px;
	background-color: white;
	text-align: center;
}
.changeCss{
	color: #007AFF;
}
.btn{
	width: 100px;
	margin-top: 10px;
	font-size: 16px;
	height: 40px;
	line-height: 40px;
}
</style>
