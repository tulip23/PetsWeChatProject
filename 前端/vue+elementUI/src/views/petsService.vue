<template>
    <div id="user">
        <div class="tableheader">宠物护理信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchService">
                <el-form-item label="关键字">
                    <el-input v-model="searchService.keyword" placeholder="请输入用户编号/手机号/宠物名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchService)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_id" label="用户编号"></el-table-column>
                    <el-table-column prop="user_name" label="用户名"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="pets_name" label="宠物名"></el-table-column>
                    <el-table-column prop="shape" label="体型"></el-table-column>
                    <el-table-column prop="service" label="选择服务"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="address" label="地址" width="250"></el-table-column>
                    <el-table-column prop="service_time" label="服务时间" width="120"></el-table-column>
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
            searchService:{
                keyword:''
            },
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,

        }
    },
    created(){
        this.initPets()
    },
    methods:{
        // 页面渲染
        initPets(){
            this.func.ajaxPost(this.api.searchServicePets,
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
            that.initPets(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.initPets(this.size)
        },

        // 搜索领养信息
        search(searchService){
            this.func.ajaxPost(this.api.searchServiceInfo,
            {keyword:searchService.keyword},res => {
            this.myData.list = res.data;
        });
        },

        // 清空查询条件，刷新页面
        reset(){
            this.searchService = {}
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
/deep/  input{
    width: 280px;
}
/deep/ .pagination-wrapper input{
    width: 30px;
}
</style>