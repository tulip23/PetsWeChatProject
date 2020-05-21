let express = require('express');
let userAuthority = require('../controls/userAuthority');
let userInfo = require('../controls/userInfo');
let petsInfo = require('../controls/petsInfo');
let petsKeep = require('../controls/petsKeep');
let petsRise= require('../controls/petsRise');
let userRise= require('../controls/userRise');
let petsService= require('../controls/petsService');
let appPetsInfo = require('../controls/appPetsInfo');
let applogin = require('../controls/applogin');
let petsRecord = require('../controls/petsRecord');
let appComments = require('../controls/appComments');
let post = require('../controls/post');
let api = require('../api');
let upload = require('../utils/upload')
let video = require('../utils/video')
let appsendAdopt = require('../controls/appsendAdopt')
let uploadVideo = require('../controls/uploadVideo')
let chat = require('../controls/chat')
let appService = require('../controls/appService')
let logger = require('../log/logger')
let record = require('../controls/record')
let appMyRaise = require('../controls/appMyRaise')
let myPosts = require('../controls/myPosts')
let router = express.Router();

// userAuthority权限管理页面
router.get(api.userList, userAuthority.fetchAll);
router.post(api.deleteUser,userAuthority.deleteUser);
router.post(api.addUser,userAuthority.addUser);
router.post(api.searchKeyword,userAuthority.searchKeyword);
router.post(api.updateUser,userAuthority.updateUser);
router.post(api.changePage,userAuthority.changePage);
router.post(api.userLogin,userAuthority.login);
router.post(api.logout,userAuthority.logout);
router.post(api.checkRoles,userAuthority.checkRoles);
router.post(api.searchAllInfo,userAuthority.searchAllInfo);
router.post(api.searchAllRoles,userAuthority.searchAllRoles);


// 上传图片
router.post(api.uploadPhoto,upload.single('logo'), userAuthority.uploadPhoto);
router.post(api.myInfo,userAuthority.myInfo);
router.post(api.updateMyself,userAuthority.updateMyself);

// 帖子页面
router.post(api.myPost,myPosts.myPost);
router.post(api.searchOnePost,myPosts.searchOnePost);


// userInfo用户信息管理页面
router.post(api.userInfo, userInfo.searchAll);
router.post(api.searchUser, userInfo.searchUser);

// 宠物信息页面
router.post(api.petsInformation, petsInfo.petsInfo);
router.post(api.searchPetsInfo, petsInfo.searchPetsInfo);
router.post(api.updatePetsInfo, petsInfo.updatePetsInfo);
router.post(api.deletePets, petsInfo.deletePets);
router.post(api.addPetsInfo, petsInfo.addPetsInfo);
router.post(api.updatePetMedical, petsInfo.updatePetMedical);

// 宠物寄养信息管理
router.post(api.searchKeepPets, petsKeep.searchKeepPets);
router.post(api.searchKeepInfo, petsKeep.searchKeepInfo);

// 宠物领养信息管理
router.post(api.searchRisePets, petsRise.searchRisePets);
router.post(api.searchRiseInfo, petsRise.searchRiseInfo);

// 宠物服务信息管理
router.post(api.searchServicePets, petsService.searchServicePets);
router.post(api.searchServiceInfo, petsService.searchServiceInfo);

// 用户领养宠物信息管理
router.post(api.searchUserRaise, userRise.searchUserRaise);
router.post(api.searchUserInfo, userRise.searchUserInfo);
router.post(api.searchRecord, petsRecord.searchRecord);

// record
router.post(api.recordInit, record.recordInit);
router.post(api.allRecord, record.allRecord);
router.post(api.updateStatus, record.updateStatus);


// trace
router.post(api.tracePets, record.tracePets);
router.post(api.myRecord, record.myRecord);




// ----------------微信小程序接口------------------

// 首页接口
router.get(api.fontPetsInfo, appPetsInfo.fontPetsInfo);
router.get(api.adoptInfo, appPetsInfo.adoptInfo);
router.post(api.petsDetail, appPetsInfo.petsDetail);
router.post(api.adoptDetail, appPetsInfo.adoptDetail);
router.post(api.demandAdopt, appPetsInfo.demandAdopt);
router.post(api.addMyNumber, appPetsInfo.addMyNumber);
router.post(api.addAdoptNumber, appPetsInfo.addAdoptNumber);


// 搜索页面的接口
router.post(api.searchPets, appPetsInfo.searchPets);

// 登录接口
router.post(api.appLogin, applogin.appLogin);
router.post(api.verifyLogin, applogin.verifyLogin);
router.post(api.loginUser, applogin.loginUser);
router.post(api.chatLogin, applogin.chatLogin);

// 社区页面
router.post(api.comments, appComments.comments);
router.post(api.onePosts, appComments.onePosts);
router.post(api.addThumbs, appComments.addThumbs);
router.post(api.addComments, appComments.addComments);
router.get(api.allPosts, post.allPosts);
router.post(api.addLike, post.addLike);
router.post(api.uploadImage,upload.array('logo'), post.uploadImage);
router.get(api.selectPost, post.selectPost);
router.post(api.sendComment, post.sendComment);
router.post(api.addBrowse, appComments.addBrowse);
router.post(api.myComments, appComments.myComments);
router.post(api.addOthers, appComments.addOthers);



// 发布领养页面
router.post(api.initUser, appsendAdopt.initUser);
router.post(api.addAdopt, appsendAdopt.addAdopt);


// 领养签到页面
router.post(api.uploadVideo,video.single('logo'),uploadVideo.uploadVideo);
router.post(api.uploadNumber,uploadVideo.uploadNumber);
router.post(api.signRecord,uploadVideo.signRecord);

// 我的页面接口
router.post(api.addMoney, appsendAdopt.addMoney);
router.post(api.raiseRecord, appMyRaise.raiseRecord);
router.post(api.raiseApply, appMyRaise.raiseApply);
router.post(api.postRecord, appMyRaise.postRecord);
router.post(api.applyForPets, appMyRaise.applyForPets);
router.post(api.myUserId, appService.myUserId);
router.post(api.serviceRecord, appService.serviceRecord);
router.post(api.delPost, post.delPost);
router.post(api.initComments, post.initComments);
router.post(api.delComments, post.delComments);
router.post(api.KeepsRecord, appService.KeepsRecord);



router.post(api.updateUserInfo, appsendAdopt.updateUserInfo);

// 聊天室
router.get(api.talk, chat.talk);

// 服务页面
router.post(api.updateMoney, appService.updateMoney);
router.post(api.insertKeep, appService.insertKeep);
router.post(api.insertWash, appService.insertWash);

// 发布送养
router.post(api.sendRaise, appsendAdopt.sendRaise);
router.post(api.insertInfo, appsendAdopt.insertInfo);
router.post(api.sendImages,upload.array('logo'),appsendAdopt.sendImages);
router.get(api.selectMaxVideo, uploadVideo.selectMaxVideo);
router.post(api.uploadRaiseVideo,video.single('logo'),uploadVideo.uploadRaiseVideo);
// 修改头像
router.post(api.updateImage,upload.single('logo'),appsendAdopt.updateImage);

// 查找最大的user_id
router.get(api.selectMaxId, applogin.selectMaxId);
router.post(api.selectUser, applogin.selectUser);
router.post(api.welogin, applogin.welogin);

// 短信验证码
router.post(api.sendMessage, applogin.sendMessage);
// 短信登录
router.post(api.messageLogin, applogin.messageLogin);

// 修改密码
router.post(api.forgetPassword, applogin.forgetPassword);

// 宠物最大值
router.get(api.selectMaxPets, appsendAdopt.selectMaxPets);


module.exports = router;