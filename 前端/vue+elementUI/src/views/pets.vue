<template>
    <div id="pets" v-if="isLogin">
        <div class="tableheader">宠物信息管理</div>
        <div id="containerDiv">
            <el-form :inline="true" style="margin-left:20px;" ref="form" v-model="searchPets">
                <!-- <el-form-item>
                    <el-button @click="add" type="info" style="margin-right:50px;">新增宠物</el-button>
                </el-form-item> -->
                <el-form-item label="关键字">
                    <el-input placeholder="请输入宠物名/编号" v-model="searchPets.keyword"></el-input>
                </el-form-item>
                <el-form-item label="品种">
                  <el-select v-model="searchPets.kind" placeholder="全部">
                      <el-option v-for="item in kind"
                      :key="item.kind"
                      :label="item.label"
                      :value="item.kind">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="searchInfo(searchPets)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表单内容 -->
            <el-main>
                <el-table :data="myData.list" stripe border>
                    <el-table-column label="宠物视频" width="160px">
                        <template slot-scope="scope">
                             <video v-if="scope.row.url" :src="scope.row.url" controls class="myvideo"></video>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pets_id" label="宠物编号"></el-table-column>
                    <el-table-column prop="pets_name" label="宠物名"></el-table-column>
                    <el-table-column prop="kind" label="品种"></el-table-column>
                    <el-table-column prop="species" label="类别"></el-table-column>
                    <el-table-column prop="color" label="毛发颜色"></el-table-column>
                    <el-table-column prop="pet_age" label="年龄"></el-table-column>
                    <el-table-column prop="pet_gender" label="性别"></el-table-column>
                    <el-table-column prop="health" label="健康状况"></el-table-column>
                    <el-table-column prop="medical_history" label="有无病史">
                        <template slot-scope="scope">
                            <el-button type="text" @click="open(scope.$index,scope.row)"><u>查看</u></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="edit(scope.$index,scope.row)"><u>编辑</u></el-button>
                            <el-button type="text" @click="deletePets(scope.row,scope.$index)"><u>删除</u></el-button>
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


            <!-- 编辑宠物信息 -->
            <el-dialog :visible.sync="editPetsInfo" title="编辑宠物信息" center :before-close="handleClose" width="50%" custom-class="customWidth">
                <div class="choseBox">
                    <el-form ref="form" label-width="150px" v-model="editPets" :inline="true">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="宠物编号">
                                    <el-input v-model="editPets.pets_id"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="宠物名">
                                    <el-input v-model="editPets.pets_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="品种">
                                    <el-select v-model="editPets.kind">
                                        <el-option v-for="item in kind"
                                        :key="item.kind"
                                        :label="item.label"
                                        :value="item.kind">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="类别">
                                    <el-input v-model="editPets.species"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="毛发颜色">
                                    <el-input v-model="editPets.color"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="年龄">
                                    <el-input v-model="editPets.pet_age"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别">
                                    <el-input v-model="editPets.pet_gender"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="健康状况">
                                    <el-input v-model="editPets.health"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="bottomDiv">
                            <el-button class="cancle" @click="calcleUpdate">取消</el-button>
                            <el-button type="info" @click="saveEdit(editPets)">保存</el-button>
                        </div>
                    </el-form>
                </div>
            </el-dialog>

            <!-- 新增宠物信息 -->
            <el-dialog :visible.sync="addPetsINfo" :before-close="handleClose" width="50%" center title="新增宠物" custom-class="customWidth">
                <div class="choseBox">
                    <el-form ref="form" label-width="150px" v-model="addPets" :inline="true">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item>
                                    <el-button type="primary" style="margin-left:100px">上传宠物照</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="宠物编号">
                                    <el-input v-model="addPets.pets_id"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="宠物名">
                                    <el-input v-model="addPets.pet_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="品种">
                                    <el-select v-model="addPets.kind">
                                        <el-option v-for="item in kind"
                                        :key="item.kind"
                                        :label="item.label"
                                        :value="item.kind">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="类别">
                                    <el-input v-model="addPets.species"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="毛发颜色">
                                    <el-input v-model="addPets.color"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="年龄">
                                    <el-input v-model="addPets.pet_age"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别">
                                    <el-input v-model="addPets.pet_gender"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="健康状况">
                                    <el-input v-model="addPets.health"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="bottomDiv">
                            <el-button class="cancle" @click="calcleAdd">取消</el-button>
                            <el-button type="info" @click="saveAdd(addPets)">保存</el-button>
                        </div>
                    </el-form>
                </div>
            </el-dialog>

            <!-- 查看有无病史 -->
            <el-dialog :visible.sync="openLook" :before-close="handleClose" width="20%" custom-class="customWidth">
                <div class="contain">
                    <span style="font-size:20px; font-weight:600">{{pTitle}}的病史(可修改)</span>
                    <el-input type="textarea" :rows="10" v-model="history" style="margin-top:10px"></el-input>
                    <el-button style="margin-top:30px;" type="info" @click="closeLook(history)">确定</el-button>
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
                        pets_id:'',
                        kind:'',
                        pet_name:'',
                        color:'',
                        pet_age:'',
                        pet_gender:'',
                        health:'',
                        pet_character:'',
                        medical_history:'',
                        species:'',
                        url:'',
                        video:''
                    }
                ],
                // 分页相关
                current: 1, 
                size: 3,
                total: 3,
                pages: 1,
            },
            current: 1, 
            size: 3,
            total: 3,
            pages: 1,
            searchPets:{
                keyword:'',
                kind:''
            },
            kind:[
                {
                    kind:null,
                    label:'全部'
                },
                {
                    kind:'狗',
                    label:'狗'
                },
                {
                    kind:'猫',
                    label:'猫'
                },
                {
                    kind:'鼠',
                    label:'鼠'
                },
                {
                    kind:'兔',
                    label:'兔'
                }
              ],
            choose:[
                {
                    kind:'狗',
                    label:'狗'
                },
                {
                    kind:'猫',
                    label:'猫'
                },
                {
                    kind:'鼠',
                    label:'鼠'
                },
                {
                    kind:'鸭',
                    label:'鸭'
                },
                {
                    kind:'兔',
                    label:'兔'
                }
              ],
            editPetsInfo:false,
            editPets:{
                pets_id:'',
                pets_name:'',
                kind:'',
                species:'',
                color:'',
                pet_age:'',
                pet_gender:'',
                health:'',
                pet_character:''
            },
            addPetsINfo:false,
            addPets:{
                pets_id:'',
                pet_name:'',
                kind:'',
                species:'',
                color:'',
                pet_age:'',
                pet_gender:'',
                health:'',
                pet_character:''
            },
            openLook:false,
            history:'',
            pTitle:'',
            pics:[
                {
                    url:""
                }
            ],
            pic:'',
            isLogin:false
        }
    },
    created(){
        this.initPets()
        this.iflogin()
    },
    methods:{
        // 页面
        initPets(){
            this.func.ajaxPost(this.api.petsInformation,
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

        // 关闭弹窗
        handleClose(done) {
            done()
        },

        // 搜索宠物信息
        searchInfo(searchPets){
            if(!searchPets.kind &&!searchPets.keyword){
                this.initPets();
            }else{
                this.func.ajaxPost(this.api.searchPetsInfo,
                {  
                    keyword:searchPets.keyword,
                    kind:searchPets.kind
                },res => {
                this.myData.list = res.data;
                this.myData.total = 7
            });
            }
        },

        // 将查询条件清空
        reset(){
            this.searchPets = {},
            this.initPets()
        },

        // 打开编辑弹窗
        edit(index,row){
            this.editPetsInfo = true;
            this.editPets = row
        },

        // 取消更新
        calcleUpdate(){
            this.editPetsInfo = false;
            this.editPets = {}
        },

        // 确认编辑
        saveEdit(editPets){
            let that = this;
            func.ajaxPost(this.api.updatePetsInfo,
            {   pets_id:editPets.pets_id,
                pets_name:editPets.pets_name,
                kind:editPets.kind,
                species:editPets.species,
                color:editPets.color,
                pet_age:editPets.pet_age,
                pet_gender:editPets.pet_gender,
                health:editPets.health,
                pet_character:editPets.pet_character
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"编辑成功",duration:2000,onClose:function(){
                        that.editPetsInfo = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.initPets()
                        })
                    }});
                    
                    this.initPets()
                }else{
                    this.$message({type:"error",message:"编辑失败"})
                } 
            })
        },

        // 删除宠物信息
        deletePets(row,index){
            this.$confirm('是否要删除宠物' + '  ' + row.pets_name + '   ' + '？', {
                type: 'el-alert--warning'
            }).then(() => {
                    func.ajaxPost(this.api.deletePets,{pets_id:row.pets_id},res => {
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

        // 打开新增弹窗
        add(){
            this.addPetsINfo = true;
        },

        //取消新增
        calcleAdd(){
            this.addPets = {}
            this.addPetsINfo = false;
        },

        // 查看有无病史
        open(index,row){
            this.openLook = true;
            this.history = row.medical_history
            this.pets_id = row.pets_id
            this.pTitle = row.pets_name
        },

        // 修改病史
        closeLook(history){
            let that = this;
            func.ajaxPost(this.api.updatePetMedical,
            {  
                pets_id:this.pets_id,
                medical_history:this.history
            },res => {
                if(res && res.status == 200){
                    this.$message({type:"success",message:"编辑成功",duration:2000,onClose:function(){
                        that.openLook = false
                        that.$nextTick(() => {
                            // 再次请求页面数据
                            that.initPets()
                        })
                    }});
                    
                    this.initPets()
                }else{
                    this.$message({type:"error",message:"编辑失败"})
                } 
            })
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
    justify-content: center
}
.pagination-wrapper {
    float: right;
    padding: 10px;
}
.bottomDiv{
    display: flex;
    justify-content: center;
}
.Reason{
    display: flex;
    justify-content: center;
}
.reasonDiv{
    display: inline-block;
    width: 100%;
    height: 60%;
    border: black solid 1px;
    margin-top: 40px;
    padding-top: 10px
}
.contain{
    width: 90%;
    height: 300px;
    text-align: center;
    transform: translateY(-50px);
}
img{
    width: 60px;
    height: 60px;
}
.myvideo{
    width: 150px;
    height: 150px;
}
</style>