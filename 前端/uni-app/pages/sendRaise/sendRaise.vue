<template>
	<view>
		<view style="margin: 10px;">
			<view class="headtitle">宠物信息</view>
			<view class="mytitle">宠物名:</view>
			<input type="text" v-model="pets_name" />
			<view class="mytitle">类型:</view>
			<input type="text" v-model="kind" />
			<view class="mytitle">品种:</view>
			<input type="text"  v-model="species"/>
			<view class="mytitle">颜色:</view>
			<input type="text"  v-model="color"/>
			<view class="mytitle">年龄:</view>
			<input type="text" v-model="pet_age"/>
			<view class="mytitle">性别:</view>
			<input type="text" v-model="pet_gender" />
			<view class="mytitle">健康状态:</view>
			<input type="text" v-model="health" />
			<view class="mytitle">有无病史:</view>
			<input type="text" v-model="medical_history" />
			<view class="mytitle">上传图片:</view>
			<view class="threeimg">
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
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" mode="widthFix"></image>
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
			</view>
			
			<view class="mytitle">上传视频:</view>
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
			
			<view class="headtitle">用户信息</view>
			<view class="mytitle">姓名</view>
			<input type="text" v-model="user_name" />
			<view class="mytitle">联系方式</view>
			<input type="text" v-model="telephone" />
			<view class="mytitle">地址</view>
			<input type="text" v-model="address" @tap="myposition" />
			<view class="mytitle">原因</view>
			<input type="text" v-model="reason" />
			<view class="mytitle">条件</view>
			<input type="text" v-model="condition" />

			<button class="logoutCss" @tap='uploadimage'>提交</button>
		</view>
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
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
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
			doc_id:'',
			pets_name:'',
			status:'送养中',
			reason:'',
			pets_id:'',
			kind:'',
			species:'',
			number:0,
			user_name:'',
			telephone:'',
			address:'',
			pet_age:'',
			pet_gender:'',
			health:'',
			medical_history:'',
			condition:'',
			color:'',
			// 上传视频
			VideoOfImagesShow:true,
			cameraList: [{
				value: 'back',
				name: '后置摄像头',
				checked: 'true'
				},
				{
					value: 'front',
					name: '前置摄像头'
				}],
			cameraIndex: 0,
			src:'',
			videoId:''
		}
	},
	onLoad(options) {
		this.userId = options.user_id
		console.log(this.userId,"user_id")
	},
	created() {
		this.init()
		this.maxVdeio()
	},
	methods:{
		// 判断用户信息是否全
		init(){
			uni.request({
				url:'http://localhost:8383/api/appsendAdopt/selectMaxPets',
				success: (res) => {
					this.maxid = parseFloat(res.data[0].maxid)+parseFloat(1)
					console.log(this.maxid)
				}
			})
		},
		
		// 最大的doc_id
		maxVdeio(){
			uni.request({
			 	url:'http://localhost:8383/api/uploadVideo/selectMaxVideo',
			 	success: (res) => {
			 		this.videoId = parseFloat(res.data[0].maxid)+parseFloat(1)
			 		console.log(this.videoId)
			 	}
			})
		},
		
		// 定位
		myposition(){
				uni.chooseLocation({
				    success: (res)=> {
						this.address = res.address
				    }
			})
		},
		
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
			uni.uploadFile({
				url:'http://localhost:8383/api/appsendAdopt/sendImages',
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
		//上传图片+发表送养
		async uploadimage(){
			if(this.imageList.length==0){
				this.doc_id = null
				this.sendText('http://localhost:8383/api/appsendAdopt/sendRaise')
				this.sendDetail('http://localhost:8383/api/appsendAdopt/insertInfo')
			}else{
				uni.request({
					// 查询doc_id的最大值
					url:'http://localhost:8383/api/posts/selectPost',
					success: (res) => {
						this.doc_id=res.data[0].doc_id
						this.sendText('http://localhost:8383/api/appsendAdopt/sendRaise')
						this.sendDetail('http://localhost:8383/api/appsendAdopt/insertInfo')
						this.submitVedio()
						let arr=[]
						console.log(this.imageList)
						for (let k in this.imageList){
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
		// 新增raise表
		sendText(url){
			uni.request({
				url:url,
				method:'POST',
				data:{
					user_id:this.userId,
					user_name:this.user_name,
					kind:this.kind,
					pets_id:this.maxid,
					reason:this.reason,
					status:this.status,
					species:this.species,
					doc_id:this.doc_id,
					number:0,
					address:this.address,
					telephone:this.telephone
				}
			})
		},
		
		// 新增详细信息
		sendDetail(url){
			uni.request({
				url:url,
				method:'POST',
				data:{
					kind:this.kind,
					pets_id:this.maxid,
					pets_name:this.pets_name,
					reason:this.reason,
					species:this.species,
					doc_id:this.doc_id,
					color:this.color,
					pet_age:this.pet_age,
					pet_gender:this.pet_gender,
					health:this.health,
					medical_history:this.medical_history,
					condition:this.condition,
					video_id:this.videoId
				}
			})
		},
		
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
				url:'http://localhost:8383/api/uploadVideo/uploadRaiseVideo',
				name:'logo',
				filePath:this.src,
				formData:{
					doc_id:this.videoId
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
		
	},
	components:{
		uniList,
		uniListItem
	}
}
</script>

<style scoped>
.mytitle{
	margin-top: 20px;
	display: block;
}
input{
	border: 1px #d1d1d1 solid;
	width: 100%;
	position: relative;
}
checkbox-group{
	height: 20px;
}
.logoutCss{
	width: 100px;
	font-size: 12px;
	margin-top: 50px;
}
.headtitle{
	width: 100%;
	height: 30px;
	line-height: 30px;
	color: white;
	background-color: #ffd33f;
	text-align: center;
}
.threeimg{
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	
}
.threeimg image{
	width: 100%;
	margin-right: 10px;
	position: relative;
}
.uni-uploader__file{
	position: relative;
}
.icon-shanchu{
	position: absolute;
	right: 0;
	top: 10;
	color: red;
	z-index: 100;
}
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
</style>
