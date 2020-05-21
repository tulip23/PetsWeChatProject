<template>
    <div id="user">
        <div class="tableheader">领养宠物追踪信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchKey">
                <el-form-item label="关键字">
                    <el-input placeholder="请输入用户编号" v-model="searchKey.keyword"><i slot="suffix" class="el-icon-search"></i></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchKey)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column label="签到视频" width="200px">
                        <template slot-scope="scope">
                            <video v-if="scope.row.video" :src="scope.row.video" controls class="myvideo"></video>
                        </template>
                    </el-table-column>
                    <el-table-column prop="adopt_id" label="领养人编号"></el-table-column>
                    <el-table-column prop="number" label="签到次数"></el-table-column>
                    <el-table-column prop="time" label="签到时间"></el-table-column>
                </el-table>
                <!-- 分页相关 -->
                <div class="pagination-wrapper">
                    <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" 
                             :current-page.sync="myData.current"  layout="prev, pager, next, jumper" 
                            :total="myData.total"
                            :page-size="7">
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
                list:[
                    {
                        raise_id:'u01',
                        pets_id:'鸭仔',
                        time:'超管'
                    }
                ],
                current: 1, 
                size: 3,
                total: 3,
                pages: 1,
                video:''
            },
            searchKey:{
                keyword:''
            },
            //   分页相关
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
        }
    },
    created(){
        this.fetchList()
    },

    methods:{
        // 页面数据渲染
        fetchList(){
            this.func.ajaxPost(this.api.tracePets,
            {
                current: this.current,
                size: this.size
                },res => {
                    this.myData = res.data;
            });
        },
        
        // 分页相关函数
        handleCurrentChange(val) {
            let that = this
            this.current = val
            that.fetchList(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.fetchList(this.size)
        },

        // 关闭弹窗
        handleClose(done) {
            done()
        },

        // 查询宠物信息
        search(searchKey){
            this.func.ajaxPost(this.api.myRecord,
            {  
                keyword:searchKey.keyword,
                role:searchKey.role
            }
            ,res => {
                this.myData.list = res.data;
            });
        },

        // 将查询条件清空
        reset(){
            this.searchKey = {},
            this.fetchList()
        },
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
/deep/ input{
    width: 250px;
}
.choseBox{
    display: flex;
    justify-content: center
}
.pagination-wrapper {
    float: right;
    padding: 10px;
}
img{
    width: 60px;
    height: 60px;
}
/deep/ .pagination-wrapper input{
    width: 30px;
}
.myvideo{
    width: 150px;
    height: 150px;
}
</style>