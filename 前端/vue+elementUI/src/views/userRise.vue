<template>
    <div id="user">
        <div class="tableheader">宠物送养信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchUserRise">
                <el-form-item label="关键字">
                    <el-input v-model="searchUserRise.keyword" placeholder="用户编号/手机号/宠物编号/宠物名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="search(searchUserRise)">查询</el-button>
                    <el-button type="info" @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_id" label="送养人编号"></el-table-column>
                    <el-table-column prop="user_name" label="送养人姓名"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式" width="120"></el-table-column>
                    <el-table-column prop="address" label="地址" width="150"></el-table-column>
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="pets_id" label="宠物编号"></el-table-column>
                    <el-table-column prop="pets_name" label="宠物名"></el-table-column>
                    <el-table-column prop="kind" label="品种"></el-table-column>
                    <el-table-column prop="species" label="种类"></el-table-column>
                    <el-table-column prop="pet_gender" label="宠物性别"></el-table-column>
                    <el-table-column prop="pet_age" label="宠物年龄"></el-table-column>
                    <el-table-column prop="health" label="健康状况"></el-table-column>
                    <el-table-column prop="medical_history" label="有无病史"></el-table-column>
                    <el-table-column prop="time" label="领养时间" width="150"></el-table-column>
                    <el-table-column label="送养原因">
                        <template slot-scope="scope">
                            <el-button type="text" @click="look(scope.$index,scope.row)"><u>查看</u></el-button>
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

            <!-- 查看送养原因 -->
            <el-dialog :visible.sync="openLook" :before-close="handleClose" width="40%" custom-class="customWidth">
                <div class="contain">
                    <span class="reasonTitle" style="font-size:20px; font-weight:600">送养宠物{{myName}}原因</span>
                    <span class="reasonDiv">{{reason}}</span>
                    <br>
                    <el-button style="margin:10px;" type="info" @click="openLook = false">关闭</el-button>
                </div>

            </el-dialog>
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
            searchUserRise:{
                keyword:''
            },
            openLook:false,
            reason:'',
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
            myName:''
        }
    },
    created(){
        this.initPets()
    },
    methods:{
        // 页面渲染
        initPets(){
            this.func.ajaxPost(this.api.searchUserRaise,
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
        search(searchUserRise){
            this.func.ajaxPost(this.api.searchUserInfo,
            {keyword:searchUserRise.keyword},res => {
            this.myData.list = res.data;
        });
        },

        // 清空查询条件，刷新页面
        reset(){
            this.searchUserRise = {}
            this.initPets()
        },

        // 关闭弹窗
        handleClose(done) {
            done()
        },

        // 查看领养原因
        look(index,row){
            this.openLook = true;
            this.myName = row.pets_name
            this.reason = row.reason;
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
/deep/ input{
    width: 300px;
}
/deep/ .pagination-wrapper input{
    width: 30px;
}
.Reason{
    display: flex;
    justify-content: center;
    width: 100%;
}
.reasonTitle{
    display: inline-block;
    width: 100%;
}
.reasonDiv{
    display: inline-block;
    width: 80%;
    height: 60%;
    border: black solid 1px;
    margin-top: 40px;
    padding-top: 10px
}
.contain{
    width: 100%;
    height: 300px;
    text-align: center;
}
</style>