<template>
	<view>
		<view class="list1" v-for="(item, index) in allComments" :key="index">
			<view class="list2">
				<image :src="item.wechaturl" mode="widthFix" lazy-load></image>
			</view>
			<view class="list3">
				<view class="icon iconfont icon-yonghu" style="font-size: 15px;"></view>
				<view class="icon iconfont icon-icon-test1" style="font-size: 17px; transform: translateY(-8px);"></view>
			</view>
			<view class="list4">
				{{item.user_name}}
				</br>
				<view style="margin-top: 4px;">{{item.created}}</view>
			</view>
			<view class="textimg">
				<view class="list5">
					{{item.content}}
				</view>	
			</view>
		</view>
		
		<!-- 评论部分 -->
		<view style="margin-bottom: 40px; overflow: hidden;">
			<view class="commentCss" v-for="(item,index) in comments" :key="index">
				<image :src="item.wechaturl"></image>
				<view>
					<view class="two">
						<view class="icon iconfont icon-yonghu" style="font-size: 15px; margin-left: 10px;"></view>
						<view style="margin-left: 10px;padding-top: 3px;">{{item.user_name}}</view>
					</view>

					<view class="userComment">{{item.comment_text}}</view>
					<view class="list9">
						<view class="icon iconfont icon-pinglun" style="font-size: 16px;" @tap="sendComment(index,item)"></view>
						<view class="comTime">{{item.createdTime}}</view>
					</view>
					<!-- 回复评论 -->
					<view v-if="item.children.length != 0" class="checkResponce" @tap='myresponce(item)'>查看回复</view>
				</view>
			</view>
		</view>
		
		<view class="sendComments">
			<button @tap="open">评论{{mycommentName}}</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="commentPop">
				<input type="text" :placeholder="comName" v-model="mysend" />
				<button @tap="submit">发送</button>
			</view>
		</uni-popup>
		<!-- 写回复 -->
		<uni-popup ref="responce" type="bottom">
			<view class="commentPop">
				<input type="text" :placeholder="resName" v-model="mysend" />
				<button @tap="submit">发送</button>
			</view>
		</uni-popup>
	</view>
</template>
/
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			postid:'',
			comments:{},
			allComments:{},
			like:'',
			id:'',
			mysend:'',
			now:'',
			userId:'',
			tok:'',
			parent_id:null,
			myid:'',
			comment_id:'',
			respance_id:'',
			open_id:'',
			cId:'',
			myname:'',
			url:'',
			mypostid:'',
			commenttext:'',
			commentTime:'',
			mycommentName:'',
			comName:'',
			resName:''
		}
	},
	computed: mapState(['hasLogin','uerInfo']),  
	onLoad(option) {
		this.postid = option.post_id
		this.init()
		this.mycomments()
		// 获取当前时间
		var aData = new Date();
		this.now = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
	},
	methods:{
		...mapMutations(['login']),
		// 页面渲染
		init(){
			uni.request({
					url: 'http://localhost:8383/api/appComments/comments',
					method:'POST',
					data:{
						post_id:this.postid
					}
				}).then(data => {
					this.comments = data[1].data
				})
		},
		
		// 评论渲染
		mycomments(){
			uni.request({
					url: 'http://localhost:8383/api/appComments/onePosts',
					method:'POST',
					data:{
						post_id:this.postid
					}
				}).then(data => {
					var [error, res]  = data;
					this.allComments = res.data
					this.mycommentName = this.allComments[0].user_name
				})
		},
		
		// 打开弹层
		open(){
			this.parent_id=null
			this.comName = '评论  '+this.mycommentName
			this.$refs.popup.open()
		},
		
		// 提交评论
		submit(){
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.userId = res.data.user_id
					this.tok = res.data.token
					uni.request({
							url: 'http://localhost:8383/api/appComments/addComments',
							method:'POST',
							data:{
								numberLike:0,
								thumbs:2,
								post_id:this.postid,
								comment_text:this.mysend,
								parent_id:this.parent_id,
								user_id:this.userId,
							}
						}).then(data => {
							this.init()
						})
						this.$refs.popup.close()
						this.$refs.responce.close()
						this.mysend = ''
				},
			})
		},
		
		// 回复评论
		sendComment(index,item){
			this.parent_id= this.comments[index].id
			this.resName = '回复  '+item.user_name
			console.log(item.user_name)
			this.$refs.responce.open()
		},
		
		// 跳转至回复页面
		myresponce(item){
			this.open_id = item.user_id
			this.cId = item.id
			this.myname = item.user_name
			this.url = item.wechaturl
			this.mypostid = item.post_id
			this.commenttext = item.comment_text
			this.commentTime = item.createdTime
			uni.navigateTo({
				url:'../myresponce/myresponce?user_id='+this.open_id+'&id='+this.cId+'&user_name='+this.myname+'&wechaturl='+this.url+'&comment_text='+this.commenttext+'&createdTime='+this.commentTime+'&post_id='+this.mypostid
			})
		},
	},
	components:{
		uniPopup
	}
}
</script>

<style scoped>
.list1{
	width: 94%;
	margin: 5px 10px;
	border-bottom: 5px #f9f9f9 solid;
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
.list5{
	margin-left: 2px;
	margin-top: 10px;
	margin-bottom: 10px;
}
.list6 image{
	width: 48%;
	margin: 0 3px;
}
.textimg{
	position: relative;
}
.list9{
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	position: absolute;
	top: 60rpx;
	left: 140rpx;
	border-bottom: 1px #CCCCCC solid;
	padding-left: 155px;
	padding-right: 20px;
	height: 50px;
}
.list9 view{
	margin: 20px;
}
.commentCss image{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
.commentCss{
	margin-top: 10px;
	margin-left: 10px;
	position: relative;
	padding-bottom: 20px;
}
.two{
	display: flex;
	flex-wrap: nowrap;
	position: absolute;
	left: 50px;
	top: 0px;
}
.userComment{
	margin-left: 60px;
	transform: translateY(-25px);
}
.responce{
	margin-left: 60px;
	width: 75%;
	background-color: #EEEEEE;
	transform: translateY(-20px);
	color: #007AFF;
	padding: 5px 0 5px 5px;
}
.active{
	color: red;
}
.comTime{
	position: absolute;
	left: 150px;
	top: -40px;
	width: 150px;
}
.sendComments{
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: white;
	z-index: 10;
}
.sendComments button{
	font-size: 14px;
	width: 150px;
}
.commentPop{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background-color: #FFFFFF;
	z-index: 400;
	display: flex;
	flex-wrap: nowrap;
}
.commentPop input{
	width: 200px;
	font-size: 14px;
	background-color: #F8F8F8;
	border-radius: 4px;
	padding: 10px;
	margin-top: 5px;
	z-index: 200;
}
.commentPop button{
	width: 100px;
	font-size: 14px;
	color: orange;
	height: 40px;
	background-color: white;
	margin-top: 5px;
	z-index: 200;
}
.checkResponce{
	font-size: 12px;
	color: #007AFF;
	transform: translateY(-20rpx);
	width: 50px;
}
</style>
