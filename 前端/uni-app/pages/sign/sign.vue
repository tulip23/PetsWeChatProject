<template>
	<view>
		<view class="uploadCss">
			<button @tap="submitVedio" type="primary">上传</button>
			<button @tap="record" class="signCss" :disabled="disabled">{{sign}}</button>
		</view>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">请选择要上传的单个视频/可预览</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file" v-if="src">
								<view class="uploader_video">
									<view class="icon iconfont icon-shanchu" @tap="delectVideo"></view>
									<video :src="src" class="video"></video>
								</view>
							</view>
							<view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
								<view class="uni-uploader__input" @tap="chooseVideo"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
var sourceType = [
	['camera'],
	['album'],
	['camera', 'album']
]
export default{
	data(){
		return{
			src:"",//视频存放
			sourceTypeIndex: 2,
			sourceType: ['拍摄', '相册', '拍摄或相册'],
			cameraIndex: 0,
			VideoOfImagesShow:true,
			doc_id:'',
			disabled:true,
			sign:'签到',
			userId:'',
			cameraList: [{
				value: 'back',
				name: '后置摄像头',
				checked: 'true'
				},
				{
					value: 'front',
					name: '前置摄像头'
				}],
			maxid:''
		}
	},
	computed: mapState(['hasLogin','uerInfo']),  
	onLoad() {
		this.init()
	},
	methods:{
		// 页面初始化
		init(){
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					this.userId = res.data.user_id
					this.tok = res.data.token
					console.log(this.userId,this.tok)
					uni.request({
						url: 'http://localhost:8383/api/uploadVideo/uploadNumber',  
						data:{  
							'adopt_id':this.userId,
						},
						method:"POST",
						success: (e) => {
							console.log(e.data[0].maxid,'返回的信息')
							this.maxid = e.data[0].maxid
						}  
					})
				} 
			})
		},
		
		...mapMutations(['login']),
		
		// 选择上传的视频
		chooseVideo(){
			uni.chooseVideo({
				maxDuration:10,
				count: 1,
				camera: this.cameraList[this.cameraIndex].value,
				sourceType: sourceType[this.sourceTypeIndex],
				success: (res) => {
					console.log(JSON.stringify(res.tempFilePath),'视频')
					this.src = res.tempFilePath;
					console.log(this.src)
				}
			})
		},
		
		// 删除选中的视频
		delectVideo(){
			uni.showModal({
				title:"提示",
				content:"是否要删除此视频",
				success:(res) =>{
					if(res.confirm){
						this.src = ''
					}
				}
			})
		},
		
		// 上传视频		
		submitVedio(){
			uni.uploadFile({
				url:'http://localhost:8383/api/uploadVideo/uploadVideo',
				name:'logo',
				filePath:this.src,
				formData:{
					adopt_id:this.userId,
					number:this.maxid
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes,"结果")
					this.disabled = false
				},
				fail: (uploadFileRes) => {
					console.log(uploadFileRes)
				}
			})
		},
		
		// 签到
		record(){
			this.sign = '已签到'
			this.disabled = true
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
	top: 5upx;
	color: white;
	z-index: 999;
}
.uni-uploader__file{
	position: relative;
}
.inputPost{
	width: 80%;
	margin: 20rpx;
}

.uni-uploader__file,.uploader_video{
    position: relative;
    z-index: 1;
    width: 200upx;
    height: 200upx;
}
.uni-uploader__img {
    width: 200upx;
    height: 200upx;
}
.video{
    width: 100%;
    height: 100%;
}
.uploadCss{
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	margin: 20rpx;
}
.uploadCss button{
	width: 150rpx;
	font-size: 30rpx;
}
.signCss{
	background-color: orange;
}
</style>
