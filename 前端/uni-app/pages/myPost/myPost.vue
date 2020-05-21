<template>
	<view>
		<template>
			<view class="myraise">我的发帖记录</view>
			<view v-if="this.postRocord.length != 0">
				<uni-grid :column="3" :show-border="true" :square="false" style="text-align: center;">
					<!-- 标题 -->
					<uni-grid-item>
						<text class="text">时间</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">内容</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">删除</text>
					</uni-grid-item>
					<!-- 值 -->
					<template v-if="postRocord.length != 0" v-for="(item) in postRocord">
						<uni-grid-item>
							<text class="text">{{item.created}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.content}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="del" @tap='delPost(item)'>删除</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else class='myCss'>没有发帖记录</view>
		</template>
		
		<template>
			<view class="myraise">我的评论记录</view>
			<view v-if="this.commentsRocord.length != 0">
				<uni-grid :column="3" :show-border="true" :square="false" style="text-align: center;">
					<!-- 标题 -->
					<uni-grid-item>
						<text class="text">时间</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">内容</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">删除</text>
					</uni-grid-item>
					<!-- 值 -->
					<template v-if="commentsRocord.length != 0" v-for="(item) in commentsRocord">
						<uni-grid-item>
							<text class="text">{{item.createdTime}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.comment_text}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="del" @tap='delComments(item)'>删除</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else class='myCss'>没有评论记录</view>
		</template>
	</view>
</template>

<script>
export default{
	data(){
		return{
			user_id:'',
			postRocord:'',
			delContent:'',
			post_id:'',
			commentsRocord:'',
			delCom:'',
			del_id:'',
			id:''
		}
	},
	onLoad(option) {
		this.user_id = option.user_id
		this.init()
		this.coments()
	},
	methods:{
		// 页面初始化
		init(){
			uni.request({
				url:'http://localhost:8383/api/appMyRaise/postRecord',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.postRocord = res.data
				}
			})
		},
		
		// 我的评论记录
		coments(){
			uni.request({
				url:'http://localhost:8383/api/post/initComments',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.commentsRocord = res.data
				}
			})
		},
		
		// 删除帖子
		delPost(item){
			this.delContent = item.content
			this.post_id = item.post_id
			uni.showModal({
			    title: '提示',
			    content: '您确定删除帖子  '+this.delContent +'  吗?',
			    success: (res)=>{
			        if (res.confirm) {
						// 调用接口删除数据
						uni.request({
							url:'http://localhost:8383/api/post/delPost',
							method:'POST',
							data:{
								post_id:this.post_id
							},
							success:(res)=> {
								uni.showToast({
									title:'删除成功',
									icon:'success'
								})
								this.init()
							}
						})
			        }else if (res.cancel) {
			            uni.showToast({
							title:'取消删除',
			            	icon:'none'
			            })
			        }
			    }
			});
		},
		
		// 删除评论
		delComments(item){
			this.delCom = item.comment_text
			this.id = item.id
			uni.showModal({
			    title: '提示',
			    content: '您确定删除评论  '+this.delCom +'  吗?',
			    success: (res)=>{
			        if (res.confirm) {
						// 调用接口删除数据
						uni.request({
							url:'http://localhost:8383/api/post/delComments',
							method:'POST',
							data:{
								id:this.id
							},
							success:(res)=> {
								uni.showToast({
									title:'删除成功',
									icon:'success'
								})
								this.coments()
							}
						})
			        }else if (res.cancel) {
			            uni.showToast({
							title:'取消删除',
			            	icon:'none'
			            })
			        }
			    }
			});
		}
	}
}
</script>

<style scoped>
.myCss{
	margin-left: 20px;
}
.myraise{
	margin: 10rpx;
	font-weight: 600;
}
.del{
	color: #007AFF;
}
</style>
