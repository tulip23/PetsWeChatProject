<template>
    <div id="user" v-if="isLogin">
        <div class="tableheader">宠物寄养信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchKeepPets">
                <el-form-item label="关键字">
                    <el-input v-model="searchKeepPets.keyword" placeholder="请输入用户名/编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchKeepPets)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_id" label="用户编号"></el-table-column>
                    <el-table-column prop="user_name" label="用户名"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="begin_time" label="开始时间" width="220"></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" width="220"></el-table-column>
                    <el-table-column prop="shape" label="体型"></el-table-column>
                    <el-table-column prop="kind" label="品种"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="price" label="寄养价格"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                </el-table>
                <!-- 分页相关 -->
                <div class="pagination-wrapper">
                    <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" 
                             :current-page.sync="myData.current" layout="prev, pager, next, jumper" 
                            :total="myData.total"
                            :page-size="myData.size">
                    </el-pagination>
                </div>
            </el-main>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import func from '../public/func';
import api from '../public/api';
export default {
    data(){
        return{
            myData:{
                list:[{}],
                current: 1, 
                size: 3,
                total: 3,
                pages: 1
            },
            searchKeepPets:{
                keyword:''
            },

            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
            isLogin:false
        }
    },
    created(){
        this.initPets()
        this.iflogin()
    },
    methods:{
        // 页面渲染
        initPets(){
            this.func.ajaxPost(this.api.searchKeepPets,
            {
                current:this.current,
                size:this.size
            },res => {
                this.myData = res.data;
            });
        },

        // 判断是否登录
        iflogin(){
            if(this.$store.state.user != null){
                this.isLogin = true
            }else{
                this.isLogin = false
            }
        },
        
        // 分页相关函数
        handleCurrentChange(val) {
            let that = this
            this.current = val
            that.initPets(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.initPets(this.size)
        },

        // 搜索用户信息
        search(searchKeepPets){
            this.func.ajaxPost(this.api.searchKeepInfo,
            {keyword:searchKeepPets.keyword},res => {
            this.myData.list = res.data;
        });
        },

        // 清空查询条件，刷新页面
        reset(){
            this.searchKeepPets = {}
            this.initPets()
        }
    }
}
</script>
<style scoped>
.tableheader{
    line-height: 60px;
    font-size: 20px;
    padding-left: 50px;
    background-color: #fafafa;
}
#containerDiv{
    margin: 20px 20px;
}
.pagination-wrapper {
    float: right;
    padding: 10px;
}
/deep/ .pagination-wrapper input{
    width: 30px;
}
</style>