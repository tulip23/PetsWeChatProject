<template>
    <div id="user">
        <div class="tableheader">宠物领养信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchKeepPets">
                <el-form-item label="关键字">
                    <el-input v-model="searchKeepPets.keyword" placeholder="请输入用户编号/手机号" class="inputtest"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchKeepPets)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_id" label="领养人编号"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="kind" label="品种"></el-table-column>
                    <el-table-column prop="species" label="种类"></el-table-column>
                    <el-table-column prop="live" label="居住类型"></el-table-column>
                    <el-table-column prop="merry" label="婚姻状况"></el-table-column>
                    <el-table-column prop="experience" label="有无经验"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="reason" label="领养原因"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="time" label="发布时间" width="220"></el-table-column>
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

        }
    },
    created(){
        this.initPets()
    },
    methods:{
        // 页面渲染
        initPets(){
            this.func.ajaxPost(this.api.searchRisePets,
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
        search(searchKeepPets){
            this.func.ajaxPost(this.api.searchRiseInfo,
            {keyword:searchKeepPets.keyword},res => {
            this.myData.list = res.data;
            this.myData.total = 10
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
</style>