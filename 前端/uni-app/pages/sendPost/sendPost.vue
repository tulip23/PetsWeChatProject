<template>
	<view>
		<textarea placeholder="说一句话吧~" class="inputPost" v-model="inputContent"></textarea>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">请选择两张图片/可预览</view>
						<view class="uni-uploader-info">{{imageList.length}}/2</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="icon iconfont icon-shanchu" @tap="del(index)"></view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
								</view>
							</block>
							<view class="uni-uploader__input-box">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<button @tap="uploadimage">发表</button>
	</view>
</template>

<script>
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
export default{
	data(){
		return{
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2],
			userId: '',
			inputContent:'',
			maxid:'',
			doc_id:''
		}
	}, 
	onLoad(options) {
		this.userId = options.user_id
	},
	methods:{
		// 选择图片
		chooseImage: async function() {
			if (this.imageList.length === 2) {
				return;	
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 2 ? 2 - this.imageList.length : this.count[this.countIndex],
				success: (res) => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
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
		
		// 循环上图
		async uploads(url,doc_id){ 
			console.log(doc_id+"aaa")
			uni.uploadFile({
				url:'http://localhost:8383/api/posts/uploadImage',
				name:'logo',
				filePath:url,
				formData:{
					doc_id:doc_id,
					},
				success: (uploadFileRes) => {
					console.log(uploadFileRes,"结果")
				},
				fail: (uploadFileRes) => {
					console.log(uploadFileRes)
				}
			})
		},
		//上传图片+评论 
		 async uploadimage(){
			if(this.imageList.length==0){
				this.doc_id = null
				this.sendText('http://localhost:8383/api/posts/sendComment')
				uni.switchTab({
					url:'../home/home'
				})
			}else{
				uni.request({
					url:'http://localhost:8383/api/posts/selectPost',
					success: (res) => {		
						this.doc_id=res.data[0].doc_id
						this.sendText('http://localhost:8383/api/posts/sendComment')
						let arr=[]
						console.log(this.imageList)
						for (let k in this.imageList) {
							arr[k] = this.uploads(this.imageList[k],this.doc_id)
						}
						uni.switchTab({
							url:'../home/home'
						})
						return arr;
					}
				})
			}
		},
		sendText(url){
			uni.request({
				url:url,
				method:'POST',
				data:{
					user_id:this.userId,
					content:this.inputContent,
					browse:0,
					good:2,
					likeNumber:0,
					doc_id:this.doc_id
				},
				success: (res) => {
					uni.navigateTo({
						url:'../home/home'
					})
				}
			})
			
		}
		
	}
}
</script>

<style scoped>
.cell-pd {
	padding: 22rpx 30rpx;
}

.list-pd {
	margin-top: 50rpx;
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
.inputPost{
	width: 80%;
	margin: 20rpx;
}
</style>
