<template>
    <div id="user" v-if="isLogin">
        <div class="tableheader">社区管理管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchComments">
                <el-form-item label="关键字">
                    <el-input v-model="searchComments.keyword" placeholder="请输入用户编号" class="inputtest"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="demonstration">选择日期</span>
                    <el-date-picker
                    v-model="searchComments.days"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchComments)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_id" label="用户编号"></el-table-column>
                    <el-table-column prop="created" label="发帖时间"></el-table-column>
                    <el-table-column prop="browse" label="浏览量"></el-table-column>
                    <el-table-column prop="content" label="内容"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="del(scope.$index,scope.row)"><u>删除</u></el-button>
                        </template>
                    </el-table-column>
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
            searchComments:{
                keyword:'',
                days:''
            },
            isLogin:false,
            post_id:''
        }
    },
    created(){
        this.initPost()
        this.iflogin()
    },
    methods:{
        // 页面渲染
        initPost(){
            this.func.ajaxPost(this.api.myPost,
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
            that.initPost(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.initPost(this.size)
        },

        // 搜索领养信息
        search(searchComments){
            
            if(!searchComments.days){
                this.searchComments.days = null
            }else if(!this.searchComments.keyword){
                this.searchComments.keyword = null
            }
            console.log(this.searchComments,'发送的条件')
            this.func.ajaxPost(this.api.searchOnePost,
            {
                keyword:searchComments.keyword,
                created:searchComments.days
            },res => {
            this.myData.list = res.data;
            this.myData.total = 10
        });
        },

        // 清空查询条件，刷新页面
        reset(){
            this.searchComments = {}
            this.initPost()
        },

        // 删除帖子
        del(index,row){
            this.post_id = row.post_id
            this.$confirm('是否要删除帖子' + '  [ ' + row.content + ' ]   ' + '？', {
                type: 'el-alert--warning'
            }).then(() => {
                    func.ajaxPost(this.api.delPost,{
                        post_id:this.post_id
                        },res => {
                        if(res && res.status == 200){
                            this.myData.list.splice(index, 1);
                            this.$message({type:"success",message:"删除成功",duration:3000});
                        }else{
                            this.$message({type:"error",message:"删除失败"})
                        } 
                    })
                }).catch(() => {
                    this.$message.info('已取消操作')
                })
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
.pagination-wrapper {
    float: right;
    padding: 10px;
}
</style>