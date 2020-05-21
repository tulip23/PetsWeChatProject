<template>
	<view>
		<view>
			<view class="wechat">
				<button open-type="getUserInfo" @getuserinfo="getUserInfo">
					<view class="icon iconfont icon-weixin" style="font-size: 30px;"></view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations} from 'vuex';  
export default{
	data(){
		return{
			providerList:[],
			yonghuwx: [],
			SessionKey:'',
			OpenId:'',
			nickName:'',
			avatarUrl:'',
			gender:'',
			isCanUse: uni.getStorageSync('isCanUse')||true,
			user_id:''
		}
	},
	created() {
		this.init()
	},
	computed:{
		...mapState(['hasLogin'])
	},
	methods:{
		// 初始化
		init(){
			uni.request({
				url:'http://localhost:8383/api/applogin/selectMaxId',
				success: (res) => {
					this.user_id = parseFloat(res.data[0].maxid)+parseFloat(1)
				}
			})
		},
		
		// 微信登录获取用户信息
		getUserInfo(res){
			this.nickName = res.detail.userInfo.nickName
			this.avatarUrl = res.detail.userInfo.avatarUrl
			uni.request({
				url:'http://localhost:8383/api/applogin/chatLogin',
				method:'POST',
				data:{
					user_id:this.user_id,
					url:this.avatarUrl,
					user_name:this.nickName
				},
				success: (res) => {
					this.login(res.data)
					uni.navigateBack({
						delta:1,
						success(){
							let page = getCurrentPages().pop();  //跳转页面成功之后
							if (!page) return;  
							page.onLoad(); //如果页面存在，则重新刷新页面
						}
					})
				},
				fail: (res) => {
					console.log('拒绝授权')
				}
			})
		},
		...mapMutations(['login']),
	}
}
</script>

<style scoped>
.wechat{
	text-align: center;
	font-size: 30px;
	color: #09BB07;
}
.wechat button{
	background-color: white;
	border-top: none;
	color: #09BB07;
}
button::after{ border: none;}
</style>
