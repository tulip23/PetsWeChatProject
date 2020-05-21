<template>
    <div id="user" v-if="isLogin">
        <div class="tableheader">{{myName}} 的个人中心</div>
        <div id="containerDiv">
            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column prop="user_name" label="用户名"></el-table-column>
                    <el-table-column prop="account" label="账号"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column prop="address" width="200" label="住址"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="gender" label="性别"></el-table-column>
                    <el-table-column prop="role" label="权限"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index,scope.row)"><u>修改信息</u></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </div>

                    <!-- 编辑用户信息页面 -->
        <el-dialog :visible.sync="editAuthority" title="编辑用户信息" center :before-close="handleClose" width="30%" custom-class="customWidth">
            <div class="choseBox">
                <el-form ref="form" label-width="80px" v-model="editInfo">
                    <el-form-item label="用户名">
                        <el-input v-model="editInfo.user_name"></el-input>
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="editInfo.account"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="editInfo.age"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="editInfo.gender">
                            <el-option v-for="item in choose"
                            :key="item.gender"
                            :label="item.label"
                            :value="item.gender">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="editInfo.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="editInfo.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="editInfo.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="two">
                            <el-button class="cancle" @click="calcleUpdate">取消</el-button>
                            <el-button type="info" @click="saveEdit(editInfo)">保存</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
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
            myName:'',
            editAuthority:false,
            editInfo:{
                user_id:'',
                user_name:'',
                account:'',
                telephone:'',
                address:'',
                age:'',
                gender:'',
                password:''
            },
            choose:[
                {
                    gender:'女',
                    label:'女'
                },
                {
                    gender:'男',
                    label:'男'
                }
              ],
            isLogin:false,
            user_id:''
        }
    },
    created(){
        this.iflogin()
    },
    methods:{
        // 判断是否登录
        iflogin(){
            if(this.$store.state.user != null){
                this.isLogin = true
                this.user_id= this.$store.state.user.user_id
                this.myName = this.$store.state.user.user_name
                this.initMyself()
            }else{
                this.isLogin = false
            }
        },
        // 页面渲染
        initMyself(){
            this.func.ajaxPost(this.api.myInfo,
            {
                user_id:this.user_id
            },res => {
                this.myData.list = res.data;
            });
        },

        // 打开弹窗
        edit(index,row){
            this.editAuthority = true;
            this.editInfo = row
        },

         // 更新用户信息
        saveEdit(editInfo){
            let that = this;
            func.ajaxPost(this.api.updateMyself,
            {
                user_id: editInfo.user_id,
                user_name:editInfo.user_name,
                account:editInfo.account,
                telephone:editInfo.telephone,
                password:editInfo.password,
                address:editInfo.address,
                age:editInfo.age,
                gender:editInfo.gender
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"编辑成功",duration:2000,onClose:function(){
                        that.editAuthority = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.initMyself()
                            that.myName = editInfo.user_name
                        })
                    }});
                }else{
                    this.$message({type:"error",message:"删除失败"})
                } 
            })
        },

        // 取消修改
        calcleUpdate(){
            this.editAuthority = false;
            this.initMyself()
        },

        // 关闭弹窗
        handleClose(done) {
            done()
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
.two{
    display: flex;
    justify-content: center;
}
</style>