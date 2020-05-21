<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			uni.getStorage({//获得保存在本地的用户信息  
				key: 'uerInfo',  
				success:(res) => {  
					this.login(res.data);
					uni.request({// 再次校验并刷新token的有效时间  
						url: 'http://localhost:8383/api/applogin/verifyLogin', 
						data: {  
							"user_id":res.data.user_id,
							"to":res.data.token
						},  
						method: "POST",  
						success: (e) => {
							if (e.statusCode === 200 && e.data.code === 0){ 
								this.login(e.data);  
							}
						}  
					})  
				}  
			});  
		},
		methods:{
			...mapMutations(['login'])  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	 @import './common/uni.css';
	 /* 引入自定义图标库 */
	 @import './common/icon.css';
	 /* 引入动画库 */
	 @import './common/animate.css';
</style>
