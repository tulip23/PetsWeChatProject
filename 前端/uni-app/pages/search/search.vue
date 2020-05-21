<template>
	<view>
		<view class="content">
			<uni-nav-bar leftIcon="search" color="black">
				<input placeholder="搜索爱宠" @input="inputChange"/>
			</uni-nav-bar>
		</view>
		<view class="textbox" @tap="forward">
			返回
		</view>
		
		<!-- 领养宠物列表 -->
		<view v-if="inputValue">
			<view class="returnTitle" v-if="adoptList.length != 0">这是领养部分</view>
			<view class="list1" v-for="(item,index) in adoptList" :key="index">
				<view class="list2">
					<image :src="item.wechaturl" mode="widthFix" lazy-load @tap="userInfo(item)"></image>
				</view>
				<view @tap="gotoDetail(item)">
					<view class="list3">
						<view class="icon iconfont icon-yonghu" style="font-size: 15px;"></view>
						<view class="icon iconfont icon-dingwei" style="font-size: 20px;color: orange; transform: translate(-3px,-8px);" ></view>	
					</view>
					<view class="list4">
						{{item.user_name}}
						</br>
						<view style="margin-top: 4px;">{{item.address}}</view>
						<view class="statusCss">
							<uni-tag :text="item.status" type="warning" size="small" circle></uni-tag>
						</view>
					</view>
					<view class="textimg">
						<view class="list5" style="margin-left: 2px;">
							{{item.reason}}
						</view>	
					</view>
					<view class="list7" >
						<view class="icon iconfont icon-chakan" style="font-size: 20px;"></view>
						<view style="color: #a0a19b;" class="move">
							{{item.number}}
							<view style="transform: translate(160px,-19px);">发布时间：{{item.time}}</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		
		<!-- 送养宠物列表 -->
		<view v-if="inputValue">
			<view class="returnTitle" v-if="raiseList.length != 0">这是送养部分</view>
			<view class="list1" v-for="(item,index) in raiseList" :key="index">
				<view class="list2">
					<image :src="item.wechaturl" mode="widthFix" lazy-load @tap="getuserInfo(item)"></image>
				</view>
				<view @tap="gotoRaise(item)">
					<view class="list3">
						<view class="icon iconfont icon-yonghu" style="font-size: 15px;"></view>
						<view class="icon iconfont icon-dingwei" style="font-size: 20px;color: orange; transform: translate(-3px,-8px);" ></view>	
					</view>
					<view class="list4">
						{{item.user_name}}
						</br>
						<view style="margin-top: 4px;">{{item.address}}</view>
						<view class="statusCss">
							<uni-tag :text="item.status" type="warning" size="small" circle></uni-tag>
						</view>
					</view>
					<view class="textimg">
						<view class="list5" style="margin-left: 2px;">
							{{item.reason}}
						</view>
						<view class="list6">
							<image v-for="(items,index) in item.children" :key='index' v-if="items.url != null" :src="items.url" mode="widthFix"></image>
						</view>				
					</view>
					<view class="list7" >
						<view class="icon iconfont icon-chakan" style="font-size: 20px;"></view>
						<view style="color: #a0a19b;" class="move">
							{{item.number}}
							<view style="transform: translate(160px,-19px);">发布时间：{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="inputValue">
			<view v-if="raiseList.length == 0 && adoptList.length == 0" class="showTitle">
				没有符合条件的数据
			</view>
		</view>
	</view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default{
	data(){
		return{	
			inputValue:'',
			searchpets:{
				keyword:''
			},
			adoptPets:[],
			raisePets:[],
			adoptNull:'收养',
			raiseNull:'领养',
			// userId:''
		}
	},
	
	methods: {
		// 返回上一级
		forward(){
			uni.navigateBack({
				delta:1
			}),
			this.inputValue = ''
		},
		
		// 实时搜索功能
		inputChange(e){
			this.inputValue = e.detail.value
			if(this.inputValue.length != 0){
				uni.request({
					url:'http://localhost:8383/api/appPetsInfo/searchPets',
					method:'POST',
					data:{
						keyword:this.inputValue
					}
				}).then(data => {
						this.adoptPets = data[1].data.dataone
						this.raisePets = data[1].data.datatwo	
					})
				}else{
					this.adoptPets = []
					this.raisePets = []
				}

		},
		// 跳转至详情页面
		gotoRaise(item){
			let petsId = item.pets_id
			let userId = item.user_id
			console.log(userId,'用户的信息')
			uni.navigateTo({
				url:'../../pages/indexDetail/indexDetail?pets_id='+petsId+'&user_id='+userId
			})
		},
		getuserInfo(item){
			console.log(item)
			let userId = item.user_id
			console.log(userId)
			uni.navigateTo({
				url:'../../pages/chat/chat?user_id='+userId
			})
		},
		
		// 跳转至详情页面
		gotoDetail(item){
			let UserId = item.user_id
			let id = item.id
			uni.navigateTo({
				url:'../../pages/adoptDetail/adoptDetail?user_id='+UserId+'&id='+id
			})
		},
		
		// 跳转至聊天页
		userInfo(item){
			console.log(item)
			let userId = item.user_id
			console.log(userId)
			uni.navigateTo({
				url:'../../pages/chat/chat?user_id='+userId
			})
		}
		
		
	},
	computed:{
		// 领养部分
		adoptList(){
			var arr = this.adoptPets
			return arr
		},
		raiseList(){
			var list = this.raisePets
			return list
		}
	},
	
	components:{
		uniNavBar
	}
}
</script>

<style scoped>
.content{
	width: 95%;
	margin-left: 10px;
	border: none;
}
.textbox{
	position: absolute;
	left: 280px;
	top: 15px;
}
.list1{
	width: 94%;
	margin: 5px 10px;
	background-color: #fdfdfd;
	border-bottom: 1px #f9f9f9 solid;
	border-top: 1px #f9f9f9 solid;
	position: relative;
}
.list2 image{
	width: 100upx;
	height: 100upx;
	border-radius:50%;
}
.list3{
	position: absolute;
	top: -3px;
	left: 60px;
}
.list4{
	position: absolute;
	top: 0;
	left: 86px;
}
.list6 image{
	width: 48%;
	margin: 0 3px;
}
.textimg{
	position: relative;
}
.list7{
	position: relative;
}
.list8{
	position: absolute;
	top: 192px;
	left: 220px;
}
.move{
	position: absolute;
	top: 9px;
	left: 20px;
}
.returnTitle{
	color: orange;
	font-size: 20px;
	text-align: center;
	margin: 10px;
	overflow: hidden;
}
.showTitle{
	text-align: center;
	font-size: 20px;
	color: orange;
	margin: 10px;
}
.statusCss{
	position: absolute;
	width: 50px;
	top: 0px;
	left: 150px;
}
</style>
