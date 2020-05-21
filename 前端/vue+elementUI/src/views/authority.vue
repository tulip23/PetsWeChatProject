<template>
    <div id="user" v-if="isLogin">
        <div class="tableheader">用户权限管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchKey">
                <el-form-item>
                    <el-button @click="addUser" type="info" style="margin-right:50px;">新增管理员</el-button>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input placeholder="请输入用户名/编号/账号" v-model="searchKey.keyword"><i slot="suffix" class="el-icon-search"></i></el-input>
                </el-form-item>
                <el-form-item label="权限类型">
                  <el-select v-model="searchKey.role" placeholder="全部">
                      <el-option v-for="item in authority"
                      :key="item.role"
                      :label="item.label"
                      :value="item.role">
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
                    <el-table-column label="用户头像" width="100px">
                        <template  slot-scope="scope">
                            <img :src="scope.row.wechaturl" alt="这是图片">
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_id" label="用户编号"></el-table-column>
                    <el-table-column prop="user_name" label="用户名"></el-table-column>
                    <el-table-column prop="account" label="用户账号"></el-table-column>
                    <el-table-column prop="role" label="权限"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index,scope.row)"><u>编辑</u></el-button>
                            <el-button type="text" @click="del(scope.row,scope.$index)"><u>删除</u></el-button>
                        </template>
                    </el-table-column>
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

            <!-- 新增/用户信息 -->
            <el-dialog :visible.sync="addAuthority" title="新增管理员" center :before-close="handleClose" width="50%" custom-class="customWidth">
                <div class="choseBox">
                    <el-form ref="form" label-width="80px" v-model="adduser">
                        <el-form-item label="用户编号">
                            <el-input v-model="adduser.user_id"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="adduser.user_name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户账号">
                            <el-input v-model="adduser.account"></el-input>
                        </el-form-item>
                        <el-form-item label="权限">
                            <el-select v-model="adduser.role">
                                <el-option v-for="item in choose"
                                :key="item.role"
                                :label="item.label"
                                :value="item.role">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="adduser.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="cancle" @click="addAuthority = false">取消</el-button>
                            <el-button type="info" @click="saveAdd(adduser)">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>

            <!-- 编辑用户信息页面 -->
            <el-dialog :visible.sync="editAuthority" title="编辑用户信息" center :before-close="handleClose" width="50%" custom-class="customWidth">
                <div class="choseBox">
                    <el-form ref="form" label-width="80px" v-model="editUser">
                        <el-form-item label="用户编号">
                            <el-input v-model="editUser.user_id"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="editUser.user_name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户账号">
                            <el-input v-model="editUser.account"></el-input>
                        </el-form-item>
                        <el-form-item label="权限">
                            <el-select v-model="editUser.role">
                                <el-option v-for="item in choose"
                                :key="item.role"
                                :label="item.label"
                                :value="item.role">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="editUser.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="cancle" @click="calcleUpdate">取消</el-button>
                            <el-button type="info" @click="saveEdit(editUser)">保存</el-button>
                        </el-form-item>
                    </el-form>
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
                        user_id:'u01',
                        user_name:'鸭仔',
                        account:'yazai',
                        role:'超管'
                    },
                    {
                        user_id:'u01',
                        user_name:'鸭仔',
                        account:'yazai',
                        role:'超管'
                    },
                    {
                        user_id:'u01',
                        user_name:'鸭仔',
                        account:'yazai',
                        role:'超管'
                    },
                    {
                        user_id:'u01',
                        user_name:'鸭仔',
                        account:'yazai',
                        role:'超管'
                    }
                ],
                current: 1, 
                size: 3,
                total: 3,
                pages: 1
            },

            authority:[
                {
                    role:null,
                    label:'全部'
                },
                {
                    role:'超级管理员',
                    label:'超级管理员'
                },
                {
                    role:'普通管理员',
                    label:'普通管理员'
                },
                {
                    role:'普通用户',
                    label:'普通用户'
                }
              ],
            choose:[
                {
                    role:'超级管理员',
                    label:'超级管理员'
                },
                {
                    role:'普通管理员',
                    label:'普通管理员'
                }
              ],
              addAuthority:false,
              editAuthority:false,
              adduser:{
                  user_id:'',
                  user_name:'',
                  account:'',
                  role:'',
                  password:''
              },
              searchKey:{
                  keyword:'',
                  role:''
              },
              editUser:{
                  user_id:'',
                  user_name:'',
                  account:'',
                  role:'',
                  password:''
              },
            //   分页相关

            current: 1, 
            size: 3,
            total: 3,
            pages: 1,

            // 上传图片时传的参数
            uploadParams:{
                doc_id:''
            },
            isLogin:false,
            myName:'',
            role:'',
            myId:''
        }
    },
    created(){
        this.fetchList()
        this.init()
        this.iflogin()
    },

    methods:{
        // 页面数据渲染
        fetchList(){
            this.func.ajaxPost(this.api.changePage,
            {
                current: this.current,
                size: this.size
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
            that.fetchList(this.current)
        },

        //分页 当前页码数量
        handleSizeChange(val) {
            let that = this
            this.size = val
            that.fetchList(this.size)
        },

        // 获取最大id
        init(){
            func.ajaxGet(this.api.selectPost,res => {
                this.uploadParams.doc_id = res.data[0].doc_id
                console.log(this.uploadParams.doc_id)
            })
        },

        // 删除用户
        del(row,index){
            this.myName = row.user_name
            this.role = row.role
            this.myId = row.user_id
            this.$confirm('是否要删除用户' + '  ' + row.user_name + '   ' + '？', {
                type: 'el-alert--warning'
            }).then(() => {
                if(row.user_id== this.$store.state.user.user_id){
                    this.$message({type:"error",message:"无法删除本人",duration:1000})
                }else if(this.role == '普通用户'){
                    this.func.ajaxPost(this.api.searchAllInfo,
                    {
                        user_id:this.myId
                    },res => {
                            if(res.data.data[0].length !=0 || res.data.data[1].length !=0 ||res.data.data[2].length !=0 ||res.data.data[3].length !=0){
                                this.$message({type:'error',message:'用户有操作记录，不能删除',duration:1000})
                                this.fetchList()
                            }else{
                                func.ajaxPost(this.api.deleteUser,{user_id:row.user_id},res => {
                                    if(res && res.status == 200){
                                        this.myData.list.splice(index, 1);
                                        this.$message({type:"success",message:"删除成功",duration:3000});
                                    }else{
                                        this.$message({type:"error",message:"删除失败"})
                                    } 
                                })
                                this.fetchList()
                            }
                    });
                }else if(this.role == '超级管理员' || this.role == '普通管理员'){
                    this.func.ajaxPost(this.api.searchAllRoles,
                    {
                        user_id:this.myId
                    },res => {
                            if(res.data.data[0].length !=0 || res.data.data[1].length !=0){
                                this.$message({type:'error',message:'用户有操作记录，不能删除',duration:1000})
                                this.fetchList()
                            }else{
                                 func.ajaxPost(this.api.deleteUser,{user_id:row.user_id},res => {
                                    if(res && res.status == 200){
                                        this.myData.list.splice(index, 1);
                                        this.$message({type:"success",message:"删除成功",duration:3000});
                                    }else{
                                        this.$message({type:"error",message:"删除失败"})
                                    } 
                                })
                                 this.fetchList()
                            }
                        });
                }
                }).catch(() => {
                    this.$message.info('已取消操作')
                })
        },

        // 关闭弹窗
        handleClose(done) {
            done()
            this.editUser = {}
        },

        // 新增/编辑用户
        addUser(){
            this.addAuthority = true;
            this.adduser = {}
        },

        // 新增用户
        saveAdd(adduser){
            let that = this;
            func.ajaxPost(this.api.addUser,
            {   user_id:adduser.user_id,
                user_name:adduser.user_name,
                account:adduser.account,
                password:adduser.password,
                role:adduser.role
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"新增成功",duration:2000,onClose:function(){
                        that.addAuthority = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.fetchList()
                        })
                    }});
                    
                    this.fetchList()
                }else{
                    this.$message({type:"error",message:"删除失败"})
                } 
            })
        },

        // 查询用户权限等信息
        search(searchKey){
            this.func.ajaxPost(this.api.searchKeyword,
            {  
                keyword:searchKey.keyword,
                role:searchKey.role
            },res => {
                this.myData.list = res.data;
                this.myData.total = 7
            });
        },

        // 将查询条件清空
        reset(){
            this.searchKey = {},
            this.fetchList()
        },

        // 打开编辑弹窗
        edit(index,row){
            this.editAuthority = true;
            this.editUser = row
        },
        
        // 更新用户信息
        saveEdit(editUser){
            let that = this;
            func.ajaxPost(this.api.updateUser,
            {   user_id:editUser.user_id,
                user_name:editUser.user_name,
                account:editUser.account,
                password:editUser.password,
                role:editUser.role
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"编辑成功",duration:2000,onClose:function(){
                        that.editAuthority = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.fetchList()
                        })
                    }});
                    this.fetchList()
                }else{
                    this.$message({type:"error",message:"删除失败"})
                } 
            })
        },

        // 取消修改
        calcleUpdate(){
            this.editAuthority = false;
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
</style>