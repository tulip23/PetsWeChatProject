<template>
	<view>
		<!-- 回复的内容 -->
		<view class="list1">
			<view class="list2">
				<image :src="sendItem.wechaturl" mode="widthFix" lazy-load></image>
			</view>
			<view class="list3">
				<view class="icon iconfont icon-yonghu" style="font-size: 15px;"></view>
				<view class="icon iconfont icon-icon-test1" style="font-size: 17px; transform: translateY(-8px);"></view>
			</view>
			<view class="list4">
				{{sendItem.user_name}}
				</br>
				<view style="margin-top: 4px;">{{sendItem.createdTime}}</view>
			</view>
			<view class="textimg">
				<view class="list5">
					{{sendItem.comment_text}}
				</view>	
			</view>
		</view>
		
		<!-- 第三层回复 -->
		<view style="margin-bottom: 40px;">
			<view class="commentCss" v-for="(item,index) in comments" :key="index">
				<view class="three">
					<view class="myName">{{item.children[0].user_name}}</view>
					<view class="resCss">回复</view>
					<view class="myName" v-if="item.responseName == Null">{{sendItem.user_name}}</view>
					<view class="myName" v-else>{{item.responseName}}</view>
				</view>
				<view class="userComment"> : {{item.comment_text}}</view>
				<view class="list9">
					<view class="icon iconfont icon-pinglun" style="font-size: 16px;" @tap="sendComment(item)"></view>
					<view class="comTime">{{item.createdTime}}</view>
				</view>
			</view>
		</view>
		
		<!-- 评论弹窗 -->
		<view class="sendComments">
			<button @tap="open">评论{{sendItem.user_name}}</button>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="commentPop">
				<input :placeholder="commenName" v-model="mysend" />
				<button @tap="submit">发送</button>
			</view>
		</uni-popup>
		
		<!-- 写回复 -->
		<uni-popup ref="responce" type="bottom">
			<view class="commentPop">
				<input type="text" :placeholder="resName" v-model="mysends" />
				<button @tap="submitRes">发送</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default{
	data(){
		return{
			sendItem:{
				user_id:'',
				user_name:'',
				wechaturl:'',
				createdTime:'',
				comment_text:'',
				id:'',
				post_id:'',
			},
			mysend:'',
			userId:'',
			comments:'',
			mysends:'',
			resName:'',
			commenName:'',
			sendName:''
		}
	},
	computed: mapState(['hasLogin','uerInfo']),  
	onLoad(option) {
		this.sendItem.user_id = option.user_id
		this.sendItem.user_name = option.user_name
		this.sendItem.comment_text = option.comment_text
		this.sendItem.wechaturl = option.wechaturl
		this.sendItem.createdTime = option.createdTime
		this.sendItem.id = option.id
		this.sendItem.post_id = option.post_id
		this.init()
	},
	methods:{
		...mapMutations(['login']),
		
		// 页面渲染
		init(){
			uni.request({
					url: 'http://localhost:8383/api/appComments/myComments',
					method:'POST',
					data:{
						parent_id:this.sendItem.id
					}
				}).then(data => {
					var [error, res]  = data;
					this.comments = res.data
				})
		},
		// 打开弹层
		open(){
			this.parent_id=null
			this.commenName = '评论  '+this.sendItem.user_name
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
								post_id:this.sendItem.post_id,
								comment_text:this.mysend,
								parent_id:this.sendItem.id,
								user_id:this.userId
							}
						}).then(data => {
							this.init()
						})
						this.$refs.popup.close()
						this.mysend = ''
				},
			})
		},
		
		// 回复第三个人
		sendComment(item){
			this.resName = '回复  '+item.children[0].user_name
			this.sendName = item.children[0].user_name
			this.$refs.responce.open()
		},
		
		// 回复第三个人
		submitRes(){
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.userId = res.data.user_id
					this.tok = res.data.token
					uni.request({
							url: 'http://localhost:8383/api/appComments/addOthers',
							method:'POST',
							data:{
								post_id:this.sendItem.post_id,
								comment_text:this.mysends,
								parent_id:this.sendItem.id,
								user_id:this.userId,
								responseName:this.sendName
							}
						}).then(data => {
							this.init()
						})
						this.$refs.responce.close()
						this.mysends = ''
				},
			})
		},
		
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
	overflow: hidden;
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
.sendComments{
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: white;
	z-index: 10;
}
.sendComments button{
	font-size: 14px;
	width: 100px;
}
.commentCss{
	margin-top: 10px;
	margin-left: 10px;
	position: relative;
	padding-bottom: 10px;
	border-bottom: 1px solid #CCCCCC;
}
.responce{
	margin-left: 60px;
	width: 75%;
	background-color: #EEEEEE;
	transform: translateY(-20px);
	color: #007AFF;
	padding: 5px 0 5px 5px;
}
.comTime{
	position: absolute;
	left: 230px;
	top: 42px;
	width: 150px;
}
.myName{
	color: #007AFF;
}
.resCss{
	margin: 0 10rpx;
}
.three{
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
}
.icon-pinglun{
	transform: translateX(180px);
}
</style>
