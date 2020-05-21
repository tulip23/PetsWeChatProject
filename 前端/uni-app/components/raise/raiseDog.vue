<template>
	<view>
		<!-- 收养狗子列表 -->
		<view class="list1" v-for="(item, index) in dogsRaise" :key="index" v-if="item.kind == '狗' && item.status == '送养中'" @tap="gotoDetail(item)">
			<view class="list2">
				<image :src="item.wechaturl" mode="widthFix" lazy-load></image>
			</view>
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
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import tag from "@/components/uni-tag/uni-tag.vue"
export default{
	data(){
		return{
			dogsRaise:[{
				user_name:'啥子哟'
			}],
			time:'',
			myNumber:'',
			id:''
		}
	},
	created() {
		this.init()
	},
	methods: {
		init(){
			// 调用后台接口，请求数据
			uni.request({
					url: 'http://localhost:8383/api/appPetsInfo/fontPetsInfo'
				}).then(data => {
					var [error, res]  = data;
					this.dogsRaise = res.data
				}).catch((Error)=>{
					console.log((error))
				})
		},	
		
		// 跳转至详情页面
		gotoDetail(item){
			let petsId = item.pets_id
			let userId = item.user_id
			this.myNumber = item.number ++
			this.id = item.id
			console.log('dianji',this.myNumber ,this.id)
			uni.request({
				url:'http://localhost:8383/api/appPetsInfo/addMyNumber',
				method:'POST',
				data:{
					id:this.id,
					number:this.myNumber
				},
			})
			uni.navigateTo({
				url:'../../pages/indexDetail/indexDetail?pets_id='+petsId+'&user_id='+userId
			})
		},
	},
	components:{
	    uniNavBar,
		tag
	}
}
</script>

<style scoped>
.list1{
	width: 94%;
	margin: 5px 10px;
	background-color: #fdfdfd;
	border-bottom: 1px #f9f9f9 solid;
	border-top: 1px #f9f9f9 solid;
	position: relative;
	overflow: hidden;
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
.statusCss{
	position: absolute;
	width: 50px;
	top: 0px;
	left: 150px;
}
</style>
