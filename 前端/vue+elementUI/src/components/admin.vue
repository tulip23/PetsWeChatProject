<template>
    <div>
        <div class="itemMenu">
            <el-col :span="2">   
                <el-menu
                    :default-active="this.$route.path" 
                    router mode="horizontal"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                    <template slot="title">
                        <span class="navclass"> {{item.navItem}}</span>
                    </template>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </div>

        <div class="logout">
          <!-- <router-link to="/login.vue"><button type="info">退出登录</button></router-link> -->
          <el-button type="info" @click="logoutInfo">退出登录</el-button>
        </div>

        <div class="welcome">
          <img :src="wechaturl" class="mywechat">
          <div>{{myName}} 欢迎登录~</div>
          
        </div>

        <div class="routerName" v-if="isLogin">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import func from '../public/func';
import api from '../public/api';
export default {
  name: 'App',
  data(){
    return{
      navList:[ 
          {name:'/views/user',navItem:'用户管理'},
          {name:'/views/pets',navItem:'宠物信息'},
          {name:'/views/petsKeep',navItem:'宠物寄养'},
          {name:'/views/petsRise',navItem:'宠物领养'},
          {name:'/views/userRise',navItem:'宠物送养'},
          {name:'/views/petsService',navItem:'宠物护理'},
          {name:'/views/record',navItem:'领养记录'},
          {name:'/views/trace',navItem:'领养宠物追踪'},
          {name:'/views/community',navItem:'社区'},
          {name:'/views/person',navItem:'个人信息'},
          {name:'/views/authority',navItem:'权限管理'}
        ],
        myName:'',
        my:{},
        wechaturl:'',
        isLogin:false
    }
  },
  created(){
    this.init()
  },
  computed: {
      user () {
          return this.$store.state.user;
      },
   },
  methods:{
    // 判断权限
    init(){
        if(this.$store.state.user == null){
          this.navList = []
          this.isLogin = false
        }else{
          if(this.$store.state.user.role == '超级管理员'){
            this.navList = [ 
            {name:'/views/user',navItem:'用户管理'},
            {name:'/views/pets',navItem:'宠物信息'},
            {name:'/views/petsKeep',navItem:'宠物寄养'},
            {name:'/views/petsRise',navItem:'宠物领养'},
            {name:'/views/userRise',navItem:'宠物送养'},
            {name:'/views/petsService',navItem:'宠物护理'},
            {name:'/views/record',navItem:'领养记录'},
            {name:'/views/trace',navItem:'领养宠物追踪'},
            {name:'/views/community',navItem:'社区'},
            {name:'/views/person',navItem:'个人信息'},
            {name:'/views/authority',navItem:'权限管理'}
          ],
              this.myName = this.$store.state.user.user_name
              this.wechaturl = this.$store.state.user.wechaturl
              this.isLogin = true
          }else if(this.$store.state.user.role = '普通管理员'){
            this.navList = [ 
            {name:'/views/user',navItem:'用户管理'},
            {name:'/views/pets',navItem:'宠物信息'},
            {name:'/views/petsKeep',navItem:'宠物寄养'},
            {name:'/views/petsRise',navItem:'宠物领养'},
            {name:'/views/userRise',navItem:'宠物送养'},
            {name:'/views/petsService',navItem:'宠物护理'},
            {name:'/views/record',navItem:'领养记录'},
            {name:'/views/trace',navItem:'领养宠物追踪'},
            {name:'/views/community',navItem:'社区'},
            {name:'/views/person',navItem:'个人信息'}
          ],
          this.myName = this.$store.state.user.user_name
          this.wechaturl = this.$store.state.user.wechaturl
          this.isLogin = true
          }
        }
    },

    // 退出登录
    logoutInfo(){
      this.$message({type:"success",message:"退出成功",duration:500,onClose:function(){
            window.location.href="http://localhost:8384/"
      }}); 
      
    }
  }
}
</script>

<style scoped>
.itemMenu{
    position: fixed;
    left: 0;
}
.navclass{
    display: inline-block;
    width: 120px;
    padding-left: 50px;
}
.routerName{
    position: absolute;
    left: 210px;
    width: 88%; 
} 
.el-menu-vertical-demo{
  height: 800px;
  width: 210px;
}
.logout{
  position: absolute;
  left: 1700px;
  z-index: 100;
  top: 20px;
}
.welcome{
  position: absolute;
  left: 1500px;
  z-index: 100;
  top: 25px;
}
.mywechat{
  width: 53px;
  height: 53px;
  border-radius: 50%;
  position: absolute;
  right: 140px;
  z-index: 100;
  margin-right: 10px;
  top: -14px;
}
</style>