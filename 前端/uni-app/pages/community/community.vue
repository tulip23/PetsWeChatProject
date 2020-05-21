<template>
	<view>
		<view class="list1" v-for="(item, index) in allPost" :key="index" @tap="bro(item,index)">
			<view class="list2" @tap="userInfo(item)">
				<image :src="item.wechaturl" mode="widthFix" lazy-load></image>
			</view>
			<view class="list3">
				<view class="icon iconfont icon-yonghu" style="font-size: 15px;"></view>
				<view class="icon iconfont icon-dingwei" style="font-size: 20px;color: orange; transform: translate(-8rpx,-10px);" ></view>	
			</view>
			<view class="list4">
				{{item.user_name}}
				</br>
				<view style="margin-top: 4px;">{{item.address}}</view>
				<view class="sendtime">发布时间：{{item.created}}</view>
			</view>
			<view class="textimg">
				<view class="list5">
					{{item.content}}
				</view>	
			</view>
			<view class="contImg">
				<image v-for="(items,index) in item.children" :key='index' v-if="items.url != null" :src="items.url" mode="widthFix"></image>
			</view>
			<view class="list7">
				<view class="icon iconfont icon-chakan" style="font-size: 20px;"></view>
				<view style="color: #a0a19b;" class="move">
					{{item.browse}}
				</view>
					<view class="icon iconfont icon-dianzan" @tap="good(index,item)" :class="{'active':item.good==1}" style="font-size: 16px; transform: translateX(200rpx);"></view>
					<view class="likenumber">{{item.likeNumber}}</view>
					<view class="icon iconfont icon-pinglun" style="font-size: 16px; transform: translateX(60rpx);" @tap="gotoComment(item)"></view>
					<view class="icon iconfont icon-zhuanfa" style="font-size: 16px;"></view>
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
			allPost:[],
			postid:'',
			like:'',
			goods:'',
			allImages:[{url:'',doc_id:''}],
			d_id:'',
			myid:'',
			number:''
		}
	},
	created() {
		this.adopt()
	},
	methods: {
		adopt(){
			uni.request({
					url: 'http://localhost:8383/api/posts/allPosts'
				}).then(res => {
					this.allPost = res[1].data
				})
		},	
		
		// 浏览数增加
		bro(item,index){
			item.browse = item.browse+1
			this.postid = item.post_id
			this.number = item.browse
			uni.request({
				url:'http://localhost:8383/api/appComments/addBrowse',
				method:'POST',
				data:{
					post_id:this.postid,
					browse:this.number
				}
			})
		},
		
		// 跳转至详情页面
		gotoDetail(item){
			let UserId = item.user_id
			uni.navigateTo({
				url:'../../pages/adoptDetail/adoptDetail?user_id='+UserId
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
		},
		
		// 点赞
		good(index,item){
			// 1表示点赞  2表示不点赞
			if(this.allPost[index].good==1){
				this.allPost[index].good = 2
				this.allPost[index].likeNumber --
				this.like = this.allPost[index].likeNumber
			}else{
				this.allPost[index].good = 1
				this.allPost[index].likeNumber ++
				this.like = this.allPost[index].likeNumber
			}
			this.postid = item.post_id
			uni.request({
					url: 'http://localhost:8383/api/posts/addLike',
					method:'POST',
					data:{
						likeNumber:this.like,
						post_id:this.postid,
						good:this.allPost[index].good,
					}
				}).then(data => {
				})
		},
		
		// 跳转至评论页面
		gotoComment(item){
			this.postid = item.post_id
			uni.navigateTo({
				url:'../comment/comment?post_id='+this.postid
			})
		}
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
	margin: 10px 20rpx;
	background-color: #fdfdfd;
	border-bottom: 2rpx #f9f9f9 solid;
	border-top: 2rpx #f9f9f9 solid;
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
	left: 120rpx;
}
.list4{
	position: absolute;
	top: 0;
	left: 172rpx;
}
.sendtime{
	transform: translate(190rpx,-100rpx);
}
.list5{
	margin-left: 4rpx;
	margin-top: 20rpx;
}
.list6 image{
	width: 48%;
	margin: 0 6rpx;
}
.textimg{
	position: relative;
}
.list7{
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
}
.list9{
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	z-index: 100;
	transform: translate(100rpx,-40rpx);
}
.list9 view{
	margin: 20rpx;
}
.move{
	position: absolute;
	top: 22rpx;
	left: 50rpx;
}	
.active{
	color: red;
}
.likenumber{
	transform: translate(100rpx,10rpx);
}
.contImg{
	width: 100%;
	display: flex;
	flex-wrap: unset;
}
.contImg image{
	width: 50%;
	margin-right: 10rpx;
}
</style>
