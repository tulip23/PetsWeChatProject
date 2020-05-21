// 使用axios模块进行ajax请求，写法是promise的链式模式
let host = '/api';

export default {
    // 权限管理页面
    userList: host + '/user/list',
    deleteUser: host + '/user/delete',
    addUser: host + '/user/addUser',
    searchKeyword: host+'/user/keyword',
    updateUser: host+'/user/updateUser',
    changePage: host+'/user/changePage',
    userLogin: host + '/user/login',
    logout: host + '/userAuthority/logout',
    checkRoles: host + '/userAuthority/checkRoles',
    myInfo: host + '/userAuthority/myInfo',
    updateMyself: host + '/userAuthority/updateMyself',

    // 帖子
    
    delPost: host + '/post/delPost',

    // 社区
    myPost: host + '/myPosts/myPost',
    searchOnePost: host + '/myPosts/searchOnePost',
    
    // 用户信息管理页面
    userInfo: host + '/userInfo/searchInfo',
    searchUser: host + '/userInfo/searchUser',
    

    // 宠物信息管理页面
    petsInformation: host + '/petsInfo/petsInfo',
    searchPetsInfo: host + '/petsInfo/searchPetsInfo',
    updatePetsInfo: host + '/petsInfo/updatePetsInfo',
    deletePets: host + '/petsInfo/deletePets',
    addPetsInfo: host + '/petsInfo/addPetsInfo',
    updatePetMedical: host + '/petsInfo/updatePetMedical',

    // 宠物寄养信息管理
    searchKeepPets: host + '/petsKeep/searchKeepPets',
    searchKeepInfo: host + '/petsKeep/searchKeepInfo',

    // 宠物领养信息管理
    searchRisePets: host + '/petsRise/searchRisePets',
    searchRiseInfo: host + '/petsRise/searchRiseInfo',

    // 宠物服务信息管理
    searchServicePets: host + '/petsService/searchServicePets',
    searchServiceInfo: host + '/petsService/searchServiceInfo', 

    // 用户领养宠物信息管理
    searchUserRise: host + '/userRise/searchUserRise',
    searchUserInfo: host + '/userRise/searchUserInfo', 

    searchRecord: host + '/petsRecord/searchRecord', 

    // 忘记密码
    sendMessage: host + '/applogin/searchRecord',
    forgetPassword: host + '/applogin/forgetPassword', 

    // 上传头像
    selectPost: host + '/posts/selectPost',
    uploadPhoto: host+'/userAuthority/uploadPhoto',

    // 领养记录
    recordInit: host+'/record/recordInit',
    allRecord: host+'/record/allRecord',
    
    // 宠物追踪
    tracePets: host+'/record/tracePets',
    myRecord: host+'/record/myRecord',
    updateStatus: host+'/record/updateStatus',
    
}