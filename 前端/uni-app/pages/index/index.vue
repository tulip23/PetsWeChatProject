<template>
	<view>
		<!-- 头部搜索框 -->
		<view class="content" @tap="gotoSearch">
			<uni-nav-bar rightIcon="search" color="black">
				<input placeholder="搜索爱宠" style="border: none;"/>
			</uni-nav-bar>
		</view>
		
		<swiper class="index-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item>
				<image src="http://image.jt.com/dogs/doge2.jpg" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://image.jt.com/cats/cat1.jpg" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://image.jt.com/mouses/timg111.jpg" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="http://image.jt.com/rabit/timg4.jpg" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		
		<!-- 收养/送养tab切换 -->
		<!-- tab切换 -->
		<view class="tabcontain">
			<view class="uni-tab-bar">
				<scroll-view scroll-x class="uni-swiper-tab">
					<block v-for="(tabs,index) in twotabBars" :key="tabs.id">
						<view class="tabdiv" :class="{'active':twoIndex == index}"
						@tap="twotap(index)">
						{{tabs.name}}
						</view>
					</block>
				</scroll-view>			
			</view>			
		</view>

		<!-- ------------送养tab切换--------------- -->
		<view class="uni-tab-bar" v-if="twoIndex == 0">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tab,index) in tabBars" :key="tab.id">
					<view class="swiper-tab-list" :class="{'active':tabIndex == index}"
					@tap="tabtap(index)">
					{{tab.name}}
					</view>
				</block>
			</scroll-view>			
		</view>
		
		<!-- ------------收养tab切换--------------- -->
		<view class="uni-tab-bar" v-if="twoIndex == 1">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tab,index) in adoptBars" :key="tab.id">
					<view class="swiper-tab-list" :class="{'active':adoptIndex == index}"
					@tap="adopttap(index)">
					{{tab.name}}
					</view>
				</block>
			</scroll-view>			
		</view>

		<!-- -------------------送养--------------------- -->
		<view class="raise" v-if="twoIndex == 0">
			
			<view v-if="tabIndex == 0">
				<!-- 这是送养的全部动物 -->
				<raiseAll></raiseAll>
			</view>
			
			<view v-if="tabIndex == 1">
				<!-- 这是送养的狗子 -->
				<raiseDog></raiseDog>
			</view>
			<view v-if="tabIndex == 2">
				<!-- 这是送养的猫 -->
				<raiseCats></raiseCats>
			</view>
			
			<view v-if="tabIndex == 3">
				<!-- 这是送养的鼠 -->
				<raiseMouse></raiseMouse>
			</view>
			<view v-if="tabIndex == 4">
				<!-- 这是送养的兔 -->
				<raiseRabit></raiseRabit>
			</view>			
		</view>
		
		<!-- ---------------------------领养---------------------- -->
		<view v-if="twoIndex == 1">
			<view v-if="adoptIndex == 0">
				<!-- 这是领养全部的动物 -->
				<adoptAll></adoptAll>
			</view>
			
			<view v-if="adoptIndex == 1">
				<!-- 这是领养的狗子 -->
				<adoptDog></adoptDog>
			</view>
			
			<view v-if="adoptIndex == 2">
				<!-- 这是送养的猫 -->
				<adoptCat></adoptCat>
			</view>
			
			<view v-if="adoptIndex == 3">
				<!-- 这是送养的鼠 -->
				<adoptMouse></adoptMouse>
			</view>
			
			<view v-if="adoptIndex == 4">
				<!-- 这是送养的兔 -->
				<adoptRabit></adoptRabit>
			</view>			
		</view>
		
	</view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import tag from "@/components/uni-tag/uni-tag.vue"
import indexList from "@/components/uni-indexed-list/uni-indexed-list.vue"
import raiseAll from "@/components/raise/raiseAll.vue"
import raiseDog from "@/components/raise/raiseDog.vue"
import raiseCats from "@/components/raise/raiseCats.vue"
import raiseMouse from "@/components/raise/raiseMouse.vue"
import raiseRabit from "@/components/raise/raiseRabit.vue"
import adoptDog from "@/components/adopt/adoptDog.vue"
import adoptCat from "@/components/adopt/adoptCat.vue"
import adoptMouse from "@/components/adopt/adoptMouse.vue"
import adoptRabit from "@/components/adopt/adoptRabit.vue"
import adoptAll from "@/components/adopt/adoptAll.vue"		
export default {
	data() {
		return {			
			time:'',
			twotabBars:[
				{name:'送养',id:'raise'},
				{name:'领养',id:'adopt'}
			],
			tabBars:[
				{name:'全部',id:'all'},
				{name:'狗',id:'dogs'},
				{name:'猫',id:'cats'},
				{name:'鼠',id:'mouses'},
				{name:'兔',id:'rabits'}
			],
			adoptBars:[
				{name:'全部',id:'all'},
				{name:'狗',id:'dogs'},
				{name:'猫',id:'cats'},
				{name:'鼠',id:'mouses'},
				{name:'兔',id:'rabits'}
			],
			tabIndex: 0,
			twoIndex:0,
			adoptIndex:0
		}
	}, 
	methods: {
		// 送养/收养tab切换
		twotap(index){
			this.twoIndex = index
		},
		
		// 送养tab切换
		tabtap(index){
			this.tabIndex = index
		},
		
		// 收养tab切换
		adopttap(index){
			this.adoptIndex = index
		},
		
		// 跳转至搜索页面
		gotoSearch(){
			uni.navigateTo({
				url:'../search/search'
			})
		}
	
	},
	
	components:{
	    uniNavBar,
		tag,
		indexList,
		raiseAll,
		raiseDog,
		raiseCats,
		raiseMouse,
		raiseRabit,
		adoptAll,
		adoptDog,
		adoptCat,
		adoptMouse,
		adoptRabit
	}
}
</script>

<style scoped>
.index-swiper{
	padding: 10px;
}
.index-swiper image{
	width: 100%;
}
.content{
	width: 95%;
	margin: 0 auto;
	border: none;
}
.list1{
	width: 94%;
	margin: 5px 10px;
	background-color: #fdfdfd;
	border-bottom: 1px #f9f9f9 solid;
	border-top: 1px #f9f9f9 solid;
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
	left: 60px;
}
.list4{
	position: absolute;
	top: 0;
	left: 86px;
}
.list6 image{
	width: 48%;
	margin: 0 3px;
}
.textimg{
	position: relative;
}
.list7{
	position: relative;
}
.list8{
	position: absolute;
	top: 192px;
	left: 220px;
}
.move{
	position: absolute;
	top: 9px;
	left: 20px;
}
.swiper-tab-list{
	color: #969696;
	font-weight: bold;
}
.uni-tab-bar .active{
	color: #f67001;
}
.active .swiper-tab-line{
	border-bottom: #f67001 solid 1px;
	width: 70upx;
	margin: auto;
	border-top: 6upx solid #f67001;
}
.uni-swiper-tab{
	border-bottom:  1upx solid #FFFFFF;
}
.tabdiv{
	display: inline-block;
	width: 48%;
	text-align: center;
	color: #969696;
	font-weight: bolder;
	font-size: 16px;
}
.tabdiv .active{
	color: #f67001;
	font-weight: bold;
}
.tabcontain{
	width: 94%;
	margin: 20px auto;
	box-shadow:2px 2px 10px 2px rgba(0,0,0,0.3);
	overflow: hidden;
}
</style>
