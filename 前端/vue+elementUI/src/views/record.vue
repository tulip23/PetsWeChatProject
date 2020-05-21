<template>
    <div id="user">
        <div class="tableheader">领养信息记录管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchKey">
                <el-form-item label="关键字">
                    <el-input placeholder="请输入用户名/编号/宠物编号" v-model="searchKey.keyword" class="myinput"><i slot="suffix" class="el-icon-search"></i></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="searchKey.status" placeholder="全部">
                      <el-option v-for="item in authority"
                      :key="item.status"
                      :label="item.label"
                      :value="item.status">
                      </el-option>
                  </el-select>
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
                    <el-table-column prop="adopt_id" label="领养人编号"></el-table-column>
                    <el-table-column prop="pets_id" label="宠物编号"></el-table-column>
                    <el-table-column prop="pets_name" label="宠物名"></el-table-column>
                    <el-table-column prop="user_name" label="领养人姓名"></el-table-column>
                    <el-table-column prop="raise_id" label="送养人编号"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式" width="150"></el-table-column>
                    <el-table-column prop="address" label="地址" width="250"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="merry" label="婚姻状态"></el-table-column>
                    <el-table-column prop="live" label="居住情况"></el-table-column>
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="experience" label="有无经验"></el-table-column>
                    <el-table-column prop="time" label="领养时间"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index,scope.row)"><u>编辑</u></el-button>
                        </template>
                    </el-table-column> -->
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

            <!-- 编辑用户信息页面 -->
            <el-dialog :visible.sync="editStatus" title="审批" center :before-close="handleClose" width="30%" custom-class="customWidth">
                <div class="choseBox">
                    <div style="width:100%;text-align:center">
                        <el-select v-model="status">
                            <el-option v-for="item in choose"
                            :key="item.status"
                            :label="item.label"
                            :value="item.status">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-button type="info" @click="calcleUpdate">取消</el-button>
                        <el-button type="info" @click="sureUpdate">确认</el-button>
                    </div>
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
                list:[
                    {
                        adopt_id:'u01',
                        user_name:'鸭仔',
                        telephone:'yazai',
                        time:'',
                        address:'',
                        age:'',
                        merry:'',
                        live:'',
                        experience:'',
                        gender:'',
                        status:''
                    }
                ],
                current: 1, 
                size: 3,
                total: 3,
                pages: 1
            },
            authority:[
                {
                    status:null,
                    label:'全部'
                },
                {
                    status:'审批中',
                    label:'审批中'
                },
                {
                    status:'审批通过',
                    label:'审批通过'
                },
                {
                    status:'审批不通过',
                    label:'审批不通过'
                }
              ],
              editStatus:false,
              searchKey:{
                  keyword:'',
                  status:''
              },
            //   分页相关
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
            editstatus:{
                status:'',
                adopt_id:''
            },
            choose:[
                {
                    status:'审批中',
                    label:'审批中'
                },
                {
                    status:'审批通过',
                    label:'审批通过'
                },
                {
                    status:'审批不通过',
                    label:'审批不通过'
                }
            ],
            adopt_id:'',
            status:'',
            pets_id:''
        }
    },
    created(){
        this.fetchList()
    },

    methods:{
        // 页面数据渲染
        fetchList(){
            this.func.ajaxPost(this.api.recordInit,
            {
                current: this.current,
                size: this.size
                },res => {
                    this.myData = res.data;
            });
        },

        // 打开编辑弹窗
        edit(index,row){
            this.editStatus = true;
            this.adopt_id = row.adopt_id
            this.pets_id = row.pets_id
        },

        // 关闭弹窗
        handleClose(done) {
            done()
            this.status = this.status
        },

        // 查询
        search(searchKey){
            console.log(searchKey)
            this.func.ajaxPost(this.api.allRecord,
                {  
                    keyword:searchKey.keyword,
                    status:searchKey.status
                },res => {
                this.myData = res.data;
                this.myData.list = res.data;
            });
        },

        // 将查询条件清空
        reset(){
            this.searchKey = {},
            this.fetchList()
        },

        // 取消修改
        calcleUpdate(){
            this.editStatus = false;
            this.fetchList()
            this.status = ''
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

        // 修改状态
        sureUpdate(){
            let that = this
            this.func.ajaxPost(this.api.updateStatus,
            {
                adopt_id: this.adopt_id,
                status: this.status,
                pets_id:this.pets_id
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"修改成功",duraion:3000,onClose:function(){
                        that.editStatus = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.fetchList()
                        })
                    }});
                    
                    this.fetchList()
                }
            });
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
.choseBox{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 200px;
}
.pagination-wrapper {
    float: right;
    padding: 10px;
}
.myinput{
    width: 250px;
}
</style>