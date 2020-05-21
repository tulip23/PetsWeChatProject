<template>
    <div id="user">
        <div class="tableheader">用户信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchUser">
                <el-form-item label="关键字">
                    <el-input v-model="searchUser.keyword" placeholder="请输入用户名/id/手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchUser)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column label="用户头像" width="100px">
                        <template  slot-scope="scope">
                            <img :src="scope.row.wechaturl" alt="这是图片">
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_id" label="用户编号"></el-table-column>
                    <el-table-column prop="user_name" label="用户名"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="address" label="住址"></el-table-column>
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
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
            searchUser:{
                keyword:''
            }

        }
    },
    created(){
        this.initUser()
    },
    methods:{
        // 页面渲染
        initUser(){
            this.func.ajaxPost(this.api.userInfo,
            {
                current:this.current,
                size:this.size
            },res => {
                this.myData = res.data;
            });
        },

        // 分页相关函数
        handleCurrentChange(val) {
            let that = this
            this.current = val
            that.initUser(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.initUser(this.size)
        },

        // 搜索用户信息
        search(searchUser){
            this.func.ajaxPost(this.api.searchUser,
            {keyword:searchUser.keyword},res => {
            this.myData.list = res.data;
            this.myData.total = 7
        });
            
        },

        // 清空查询条件，刷新页面
        reset(){
            this.searchUser = {}
            this.initUser()
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
img{
    width: 60px;
    height: 60px;
}
</style>