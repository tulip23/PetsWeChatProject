<template>
	<view>
		<template>
			<view class="myraise">服务的记录</view>
			<view v-if="petsService.length != 0">
				<uni-grid :column="5" :show-border="true" :square="false" style="text-align: center;" v-if="petsService.length != 0">
					<!-- 标题 -->
					<uni-grid-item>
						<text class="text">宠物名</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">服务</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">时间</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">价格</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">状态</text>
					</uni-grid-item>
					<!-- 值 -->
					<template v-for="(item) in petsService">
						<uni-grid-item>
							<text class="text">{{item.pets_name}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.service}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.service_time}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.price}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.status}}</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else class="myCss">
				没有服务记录
			</view>
		</template>
		
		<!-- 寄养记录 -->
		<template>
			<view class="myraise">寄养的记录</view>
			<view v-if="petsKeep.length != 0">
				<uni-grid :column="5" :show-border="true" :square="false" style="text-align: center;" v-if="petsKeep.length != 0">
					<!-- 标题 -->
					<uni-grid-item>
						<text class="text">开始</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">结束</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">种类</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">价格</text>
					</uni-grid-item>
					<uni-grid-item>
						<text class="text">状态</text>
					</uni-grid-item>
					<!-- 值 -->
					<template v-for="(item) in petsKeep">
						<uni-grid-item>
							<text class="text">{{item.begin_time}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.end_time}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.kind}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.price}}</text>
						</uni-grid-item>
						<uni-grid-item>
							<text class="text">{{item.status}}</text>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
			<view v-else class="myCss">
				没有寄养记录
			</view>
		</template>
	</view>
</template>

<script>
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"	
export default{
	data(){
		return{
			user_id:'',
			petsService:{},
			user_name:'',
			petsKeep:{}
		}
	},
	onLoad(option) {
		this.user_id = option.user_id
		this.init()
	},
	methods:{
		init(){
			uni.request({
				url:'http://localhost:8383/api/appService/myUserId',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.user_name = res.data[0].user_name
					this.myRecord()
					this.myKeepRecord()
				}
			})
		},
		
		// 我的服务记录
		myRecord(){
			uni.request({
				url:'http://localhost:8383/api/appService/serviceRecord',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.petsService = res.data
				}
			})
		},
		
		myKeepRecord(){
			uni.request({
				url:'http://localhost:8383/api/appService/KeepsRecord',
				method:'POST',
				data:{
					user_id:this.user_id
				},
				success: (res) => {
					this.petsKeep = res.data
				}
			})
		}
		
	},
	components:{
		uniGrid,
		uniGridItem
	},
}
</script>

<style scoped>
.myraise{
	margin: 10rpx;
	font-weight: 600;
}
.myCss{
	margin-left: 20px;
}
</style>
