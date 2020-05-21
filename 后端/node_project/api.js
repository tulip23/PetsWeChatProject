let path = '/api';

module.exports = {
    // userAuthority
    userList: path + '/userAuthority/list',
    deleteUser: path + '/userAuthority/delete',
    addUser: path + '/userAuthority/addUser',
    searchKeyword: path + '/userAuthority/searchKeyword',
    updateUser: path +'/userAuthority/updateUser',
    changePage: path +'/userAuthority/changePage',
    logout: path + '/userAuthority/logout',
    myInfo: path + '/userAuthority/myInfo',
    updateMyself: path + '/userAuthority/updateMyself',
    searchAllInfo: path + '/userAuthority/searchAllInfo',
    searchAllRoles: path + '/userAuthority/searchAllRoles',
    
    // 帖子
    myPost: path + '/myPosts/myPost',
    searchOnePost: path + '/myPosts/searchOnePost',
    
    
    // 上传图片
    uploadPhoto : path + '/userAuthority/uploadPhoto',

    // 判断权限登录
    checkRoles: path + '/userAuthority/checkRoles',

    // 登录
    userLogin: path +'/userAuthority/login',
    
    // userInfo
    userInfo: path + '/userInfo/searchInfo',
    searchUser: path + '/userInfo/searchUser',
    
    // petsInfo
    petsInformation: path + '/petsInfo/petsInfo',
    searchPetsInfo: path + '/petsInfo/searchPetsInfo',
    updatePetsInfo: path + '/petsInfo/updatePetsInfo',
    deletePets: path + '/petsInfo/deletePets',
    addPetsInfo: path + '/petsInfo/addPetsInfo',
    updatePetMedical: path + '/petsInfo/updatePetMedical',
    
    // petsKeep
    searchKeepPets: path + '/petsKeep/searchKeepPets',
    searchKeepInfo: path + '/petsKeep/searchKeepInfo',

    // petsRise
    searchRisePets: path + '/petsRise/searchRisePets',
    searchRiseInfo: path + '/petsRise/searchRiseInfo',

    // petsService
    searchServicePets: path + '/petsService/searchServicePets',
    searchServiceInfo: path + '/petsService/searchServiceInfo',

    // userRise
    searchUserRaise: path + '/userRise/searchUserRaise',
    searchUserInfo: path + '/userRise/searchUserInfo',
    searchRecord: path + '/petsRecord/searchRecord',

    // record
    recordInit: path + '/record/recordInit',
    allRecord: path + '/record/allRecord',
    updateStatus: path + '/record/updateStatus',

    // trace
    tracePets: path + '/record/tracePets',
    myRecord: path + '/record/myRecord',
    
    // -----------------------微信小程序接口------------------
    // 首页接口
    fontPetsInfo: path + '/appPetsInfo/fontPetsInfo',
    adoptInfo: path + '/appPetsInfo/adoptInfo',
    petsDetail: path + '/appPetsInfo/petsDetail',
    adoptDetail: path + '/appPetsInfo/adoptDetail',
    demandAdopt: path + '/appPetsInfo/demandAdopt',
    addMyNumber: path + '/appPetsInfo/addMyNumber',
    addAdoptNumber: path + '/appPetsInfo/addAdoptNumber',
    
    
    
    // 搜索页面接口
    searchPets: path + '/appPetsInfo/searchPets',
    
    // 登录接口
    appLogin: path + '/applogin/appLogin',
    verifyLogin: path + '/applogin/verifyLogin',
    loginUser: path + '/applogin/loginUser',
    chatLogin: path + '/applogin/chatLogin',
    selectUser: path + '/applogin/selectUser',
    welogin: path + '/applogin/welogin',
    
    // 短信验证
    sendMessage: path + '/applogin/sendMessage',
    // 短信登录
    messageLogin: path + '/applogin/messageLogin',
    
    // 社区页面
    comments: path + '/appComments/comments',
    allPosts: path + '/posts/allPosts',
    addLike: path + '/posts/addLike',
    onePosts: path + '/appComments/onePosts',
    addThumbs: path + '/appComments/addThumbs',
    addComments: path + '/appComments/addComments',
    uploadImage: path + '/posts/uploadImage',
    selectPost: path + '/posts/selectPost',
    sendComment: path + '/posts/sendComment',
    addBrowse: path + '/appComments/addBrowse',
    myComments: path + '/appComments/myComments',
    addOthers: path + '/appComments/addOthers',
    
    
    // 发布领养页面
    initUser: path + '/appsendAdopt/initUser',
    addAdopt: path + '/appsendAdopt/addAdopt',

    // 领养签到
    uploadVideo: path + '/uploadVideo/uploadVideo',
    uploadNumber: path + '/uploadVideo/uploadNumber',
    signRecord: path + '/uploadVideo/signRecord',
    uploadRaiseVideo: path + '/uploadVideo/uploadRaiseVideo',
    selectMaxVideo: path + '/uploadVideo/selectMaxVideo',
    
    
    // 我的页面
    addMoney: path + '/appsendAdopt/addMoney',
    updateImage: path + '/appsendAdopt/updateImage',
    raiseRecord: path + '/appMyRaise/raiseRecord',
    raiseApply: path + '/appMyRaise/raiseApply',
    postRecord: path + '/appMyRaise/postRecord',
    applyForPets: path + '/appMyRaise/applyForPets',
    myUserId: path + '/appService/myUserId',
    serviceRecord: path + '/appService/serviceRecord',
    delPost: path + '/post/delPost',
    initComments: path + '/post/initComments',
    delComments: path + '/post/delComments',
    KeepsRecord: path + '/appService/KeepsRecord',
    updateUserInfo: path + '/appsendAdopt/updateUserInfo',
    
    // 聊天室
    talk: path + '/chat/talk',

    // 服务页面
    updateMoney: path + '/appService/updateMoney',
    insertKeep: path + '/appService/insertKeep',
    insertWash: path + '/appService/insertWash',

    // 发布送养 
    sendRaise: path + '/appsendAdopt/sendRaise',
    insertInfo: path + '/appsendAdopt/insertInfo',
    sendImages: path + '/appsendAdopt/sendImages',
    

    // 查找最大的user_id
    selectMaxId: path + '/applogin/selectMaxId',

    // 修改密码
    forgetPassword: path + '/applogin/forgetPassword',

    // 宠物id
    selectMaxPets: path + '/appsendAdopt/selectMaxPets',
    
    
    
    
    
};