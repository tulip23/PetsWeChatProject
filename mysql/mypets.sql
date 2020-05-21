/*
 Navicat Premium Data Transfer

 Source Server         : pets_db
 Source Server Type    : MySQL
 Source Server Version : 50532
 Source Host           : localhost:3306
 Source Schema         : mypets

 Target Server Type    : MySQL
 Target Server Version : 50532
 File Encoding         : 65001

 Date: 12/05/2020 13:52:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for adopt_record
-- ----------------------------
DROP TABLE IF EXISTS `adopt_record`;
CREATE TABLE `adopt_record`  (
  `adopt_id` int(11) DEFAULT NULL,
  `pets_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `raise_id` int(11) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `merry` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `live` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `experience` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of adopt_record
-- ----------------------------
INSERT INTO `adopt_record` VALUES (3, 9, '成成', '133454534543', '2020-03-31 00:00:00', 333, '广东省清远市清新区玄真路31号', 34, 3, '单身', '自住房', '有', '男', '审批通过');
INSERT INTO `adopt_record` VALUES (3, 15, '小城故事', '15767435420', '2020-05-05 00:00:00', 1111, '广东省清远市清新区玄真路31号', 23, 4, '单身', '自住房', '有', '女', '审批通过');
INSERT INTO `adopt_record` VALUES (1111, 17, '小九', '15016687454', '2020-05-09 00:00:00', 1111, '广东省广州市番禺区清河东路319号', 22, 13, '单身', '自住房', '有', '女', '审批通过');
INSERT INTO `adopt_record` VALUES (333, 18, '小涛仔', '15016687454', '2020-05-09 00:00:00', 1111, '广东省广州市番禺区清河东路319号', 22, 14, '单身', '自住房', '有', '女', '审批通过');
INSERT INTO `adopt_record` VALUES (333, 23, '我的', '15016687454', '2020-05-10 00:00:00', 7, '广东省广州市番禺区清河东路319号', 22, 22, '单身', '自住房', '有', '男', '审批通过');
INSERT INTO `adopt_record` VALUES (1111, 24, '小管', '15016687254', '2020-05-10 00:00:00', 333, '广东省广州市番禺区清河东路319号', 22, 23, '单身', '自住房', '有', '男', '申请中');
INSERT INTO `adopt_record` VALUES (3, 24, '啵唧', '13516687454', '2020-05-10 00:00:00', 333, '广东省广州市番禺区清河东路319号', 23, 24, '单身', '自住房', '无', '女', '申请中');
INSERT INTO `adopt_record` VALUES (7, 24, '小小', '15916687454', '2020-05-10 00:00:00', 333, '广东省广州市番禺区清河东路319号', 23, 25, '单身', '自住房', '有', '女', '审批通过');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment_text` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `parent_id` int(11) DEFAULT NULL,
  `createdTime` date DEFAULT NULL,
  `responseName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 93 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (2, 2, 3, '随便就好了', NULL, '2020-03-20', NULL);
INSERT INTO `comments` VALUES (4, 2, 8, '都可以啊', NULL, '2020-03-21', NULL);
INSERT INTO `comments` VALUES (14, 2, 1111, '随便写点什么吧…', NULL, '2020-03-21', NULL);
INSERT INTO `comments` VALUES (15, 2, 1111, 'Amani…', NULL, '2020-03-21', NULL);
INSERT INTO `comments` VALUES (16, 1, 1111, '我来当第一个…', NULL, '2020-03-21', NULL);
INSERT INTO `comments` VALUES (17, 1, 1111, '好漂亮的狗子啊', NULL, '2020-03-21', NULL);
INSERT INTO `comments` VALUES (20, 1, 1111, '涂鸦跳跃', 16, '2020-04-10', NULL);
INSERT INTO `comments` VALUES (25, 27, 1111, '第一个…', NULL, '2020-04-10', NULL);
INSERT INTO `comments` VALUES (26, 27, 1111, '才不是', 25, '2020-04-10', NULL);
INSERT INTO `comments` VALUES (27, 27, 1111, '121', 25, '2020-04-10', NULL);
INSERT INTO `comments` VALUES (34, 27, 1111, '……', 33, '2020-04-10', NULL);
INSERT INTO `comments` VALUES (36, 1, 113, '随便', 16, '2020-04-15', NULL);
INSERT INTO `comments` VALUES (37, 28, 1111, '16号早上', NULL, '2020-04-16', NULL);
INSERT INTO `comments` VALUES (38, 28, 1111, '对啊', 37, '2020-04-16', NULL);
INSERT INTO `comments` VALUES (39, 28, 1111, '嗨靓仔', NULL, '2020-04-19', NULL);
INSERT INTO `comments` VALUES (40, 28, 1111, '啥', 39, '2020-04-25', NULL);
INSERT INTO `comments` VALUES (41, 28, 1111, '这是什么呀', NULL, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (42, 28, 4, '随便说点什么吧~', NULL, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (43, 28, 4, '最靓最靓最靓最靓最靓最靓最靓', 42, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (46, 28, 12, '你一点都不帅呢~', 42, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (47, 28, 12, '我觉得好帅啊~', 42, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (49, 28, 3, '不啊', 42, '2020-04-29', '秋');
INSERT INTO `comments` VALUES (51, 28, 3, '你瞅啥', 39, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (52, 1, 3, '对啊对啊', 17, '2020-04-29', NULL);
INSERT INTO `comments` VALUES (53, 29, 1111, '超可爱的啊', NULL, '2020-05-04', NULL);
INSERT INTO `comments` VALUES (65, 41, 1111, '好看', NULL, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (66, 40, 1111, '好吧', NULL, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (67, 40, 1111, '好吧', NULL, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (68, 40, 1111, '啥呀', NULL, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (69, 40, 1111, '拜托了', 68, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (70, 40, 1111, '为什么…会这样', 68, '2020-05-08', NULL);
INSERT INTO `comments` VALUES (72, 45, 1111, '明天就是10号啦', NULL, '2020-05-09', NULL);
INSERT INTO `comments` VALUES (73, 41, 1111, '周末愉快！', NULL, '2020-05-09', NULL);
INSERT INTO `comments` VALUES (74, 1, 1111, '那就随便吧', 16, '2020-05-09', '随便');
INSERT INTO `comments` VALUES (75, 45, 333, '今天已经是10号啦', 72, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (76, 41, 333, '是什么呀', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (77, 41, 333, '你也愉快啊', 73, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (78, 41, 12, '大家都愉快啊', 73, '2020-05-10', 'test3');
INSERT INTO `comments` VALUES (79, 29, 333, '啊咧这可爱', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (82, 41, 333, '这是什么啊', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (83, 41, 333, '嗯嗯', 73, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (84, 41, 333, '嘻嘻', 73, '2020-05-10', '秋');
INSERT INTO `comments` VALUES (85, 41, 333, '111', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (86, 41, 333, '133', 73, '2020-05-10', '秋');
INSERT INTO `comments` VALUES (87, 41, 333, '？？？', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (88, 41, 333, '？', 76, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (89, 41, 333, '什么呀？', 73, '2020-05-10', '秋');
INSERT INTO `comments` VALUES (90, 41, 333, '靓仔', NULL, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (91, 41, 333, '一点都不靓！', 90, '2020-05-10', NULL);
INSERT INTO `comments` VALUES (92, 41, 333, '超愉快的！', 73, '2020-05-10', '秋');

-- ----------------------------
-- Table structure for images_url
-- ----------------------------
DROP TABLE IF EXISTS `images_url`;
CREATE TABLE `images_url`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` date DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `doc_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of images_url
-- ----------------------------
INSERT INTO `images_url` VALUES (32, '2020-03-24', 'http://image.jt.com/uploads/2020-3-24/logo-1584991663133.jpg', 5);
INSERT INTO `images_url` VALUES (33, '2020-03-24', 'http://image.jt.com/uploads/2020-3-24/logo-1584991664250.jpg', 5);
INSERT INTO `images_url` VALUES (34, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586423327556.jpg', 6);
INSERT INTO `images_url` VALUES (35, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586423328046.jpg', 6);
INSERT INTO `images_url` VALUES (36, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586423792298.jpg', 7);
INSERT INTO `images_url` VALUES (37, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586423792334.jpg', 7);
INSERT INTO `images_url` VALUES (38, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586424379628.jpg', 8);
INSERT INTO `images_url` VALUES (39, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586424379671.jpg', 8);
INSERT INTO `images_url` VALUES (40, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586424601547.jpg', 9);
INSERT INTO `images_url` VALUES (41, '2020-04-09', 'http://image.jt.com/uploads/2020-4-9/logo-1586424601554.jpg', 9);
INSERT INTO `images_url` VALUES (42, '2020-04-16', 'http://image.jt.com/uploads/2020-4-16/logo-1587005926724.jpg', 10);
INSERT INTO `images_url` VALUES (43, '2020-04-16', 'http://image.jt.com/uploads/2020-4-16/logo-1587005926723.jpg', 10);
INSERT INTO `images_url` VALUES (46, '2020-05-04', 'http://image.jt.com/uploads/2020-5-4/logo-1588606928519.jpg', 11);
INSERT INTO `images_url` VALUES (47, '2020-05-04', 'http://image.jt.com/uploads/2020-5-4/logo-1588606928535.jpg', 11);
INSERT INTO `images_url` VALUES (48, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588610954933.jpg', 12);
INSERT INTO `images_url` VALUES (49, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588610954934.jpg', 12);
INSERT INTO `images_url` VALUES (50, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615079238.jpg', 13);
INSERT INTO `images_url` VALUES (51, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615079352.jpg', 13);
INSERT INTO `images_url` VALUES (52, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615393130.jpg', 14);
INSERT INTO `images_url` VALUES (53, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615393172.jpg', 14);
INSERT INTO `images_url` VALUES (54, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615598273.jpg', 15);
INSERT INTO `images_url` VALUES (55, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588615598223.jpg', 15);
INSERT INTO `images_url` VALUES (56, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588620757629.jpeg', 16);
INSERT INTO `images_url` VALUES (57, '2020-05-05', 'http://image.jt.com/uploads/2020-5-5/logo-1588620758007.jpeg', 16);
INSERT INTO `images_url` VALUES (58, '2020-05-07', 'http://image.jt.com/uploads/2020-5-7/logo-1588861508261.jpg', 17);
INSERT INTO `images_url` VALUES (59, '2020-05-07', 'http://image.jt.com/uploads/2020-5-7/logo-1588861508447.jpg', 17);
INSERT INTO `images_url` VALUES (60, '2020-05-08', 'http://image.jt.com/uploads/2020-5-8/logo-1588914333669.jpg', 18);
INSERT INTO `images_url` VALUES (61, '2020-05-08', 'http://image.jt.com/uploads/2020-5-8/logo-1588914333820.jpg', 18);
INSERT INTO `images_url` VALUES (62, '2020-05-08', 'http://image.jt.com/uploads/2020-5-8/logo-1588915172308.jpeg', 19);
INSERT INTO `images_url` VALUES (63, '2020-05-08', 'http://image.jt.com/uploads/2020-5-8/logo-1588915172151.jpg', 19);
INSERT INTO `images_url` VALUES (64, '2020-05-09', 'http://image.jt.com/uploads/2020-5-9/logo-1589039837335.jpg', 20);
INSERT INTO `images_url` VALUES (65, '2020-05-09', 'http://image.jt.com/uploads/2020-5-9/logo-1589039837426.jpg', 20);
INSERT INTO `images_url` VALUES (66, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589048780594.jpg', 21);
INSERT INTO `images_url` VALUES (67, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589048780713.jpg', 21);
INSERT INTO `images_url` VALUES (68, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589052905328.jpg', 22);
INSERT INTO `images_url` VALUES (69, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589052905331.jpg', 22);
INSERT INTO `images_url` VALUES (70, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589053071725.jpg', 23);
INSERT INTO `images_url` VALUES (71, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589053071894.jpg', 23);
INSERT INTO `images_url` VALUES (72, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589055146060.jpg', 24);
INSERT INTO `images_url` VALUES (73, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589055145954.jpg', 24);
INSERT INTO `images_url` VALUES (74, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589055240553.jpg', 25);
INSERT INTO `images_url` VALUES (75, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589055240839.jpg', 25);
INSERT INTO `images_url` VALUES (76, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589067504946.jpg', 26);
INSERT INTO `images_url` VALUES (77, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589067505140.jpg', 26);
INSERT INTO `images_url` VALUES (78, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589067681676.jpg', 27);
INSERT INTO `images_url` VALUES (79, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589067681870.jpg', 27);
INSERT INTO `images_url` VALUES (80, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589073967632.jpg', 28);
INSERT INTO `images_url` VALUES (81, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589073968008.jpg', 28);
INSERT INTO `images_url` VALUES (82, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589074274984.jpg', 29);
INSERT INTO `images_url` VALUES (83, '2020-05-10', 'http://image.jt.com/uploads/2020-5-10/logo-1589074275849.jpg', 29);

-- ----------------------------
-- Table structure for loves
-- ----------------------------
DROP TABLE IF EXISTS `loves`;
CREATE TABLE `loves`  (
  `id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `post_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for pets_info
-- ----------------------------
DROP TABLE IF EXISTS `pets_info`;
CREATE TABLE `pets_info`  (
  `pets_id` int(10) DEFAULT NULL,
  `kind` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `species` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `color` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pet_age` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pet_gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `health` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `medical_history` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `conditions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pets_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `doc_id` int(10) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pets_info
-- ----------------------------
INSERT INTO `pets_info` VALUES (9, '狗', '金毛', '黄色', '10个月', '雄', '优', '无', '不能随便丢弃', '工作原因无法照顾', 8, 'even', NULL, 9);
INSERT INTO `pets_info` VALUES (10, '鼠', '哈士奇', '黑白', '1岁', '雄', '优', '无', '不能中途弃养', NULL, 9, 'yy', NULL, 4);
INSERT INTO `pets_info` VALUES (11, '狗', '金毛', '金色', '1岁', '雌', '优', '无', '要照顾好', '兔子到处拉粑粑，受不了了', 10, 'doge', 9, 9);
INSERT INTO `pets_info` VALUES (12, '狗', '拉布拉多', '白色', '3个月', '雌', '优', '无', '不要丢了', '工作原因', 11, '小秒', 8, 7);
INSERT INTO `pets_info` VALUES (13, '狗', '拉布拉多', '白色', '半个月', '雌', '优', '无', '不养了送回来', '生了好多狗子', 13, '5454', 12, 7);
INSERT INTO `pets_info` VALUES (15, '猫', '狸花猫', '花色', '1岁半', '雌', '优', '无', '不养了送回来', '要搬家了', 16, '毛毛', 15, 2);
INSERT INTO `pets_info` VALUES (16, '猫', '不祥', '白色', '1岁', '雌', '优', '无', '不养了送回来', '不想养了', 17, '小tests', 17, 3);
INSERT INTO `pets_info` VALUES (17, '狗', '法斗', '白色', '1岁', '雄', '优', '无', '不养了要送回来', '工作原因要搬家', 18, '58', 18, 10);
INSERT INTO `pets_info` VALUES (18, '猫', '狸花猫', '花色', '1岁', '雌', '优', '无', '不养了一定要送回来', '猫咪太多了', 19, '米儿', 19, 11);
INSERT INTO `pets_info` VALUES (19, '兔', '白兔', '白色', '1岁', '雌', '优', '', '不养了送回来不能吃掉', '没空养了', 20, '随便叫', 20, 12);
INSERT INTO `pets_info` VALUES (20, '狗', '金毛', '白色', '22', '雌', '优', '无', '1111111', '不666666', 21, '随便啦！！！', 23, 13);
INSERT INTO `pets_info` VALUES (21, '狗', '金毛', '白色', '1岁', '雌', '优', '无', '12121212', '121212121', 22, '111111111', 24, 14);
INSERT INTO `pets_info` VALUES (22, '鼠', '仓鼠', '花色', '半个月', '雌', '优', '无', '121212', '12121', 23, '510', 26, 15);
INSERT INTO `pets_info` VALUES (23, '兔', '白兔', '白色', '岁', '雌', '优', '无', '124243', '12434', 24, '12121', 27, 16);
INSERT INTO `pets_info` VALUES (24, '鼠', '仓鼠', '花色', '22', '雌', '优', '无', '不养了送回来', '不养了', 25, '10号', 28, 17);

-- ----------------------------
-- Table structure for pets_keep
-- ----------------------------
DROP TABLE IF EXISTS `pets_keep`;
CREATE TABLE `pets_keep`  (
  `user_id` int(10) NOT NULL,
  `begin_time` date NOT NULL,
  `end_time` date NOT NULL,
  `shape` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `kind` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telephone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pets_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pets_keep
-- ----------------------------
INSERT INTO `pets_keep` VALUES (9, '2020-02-19', '2020-02-26', '大型', '狗', '134534543', '350', 1, NULL, NULL, NULL, '匹配中');
INSERT INTO `pets_keep` VALUES (8, '2020-02-20', '2020-02-26', '小型', '狗', '123434455', '300', 2, NULL, NULL, NULL, '待寄养');
INSERT INTO `pets_keep` VALUES (7, '2020-02-21', '2020-02-23', '中型', '狗', '134358435', '150', 3, NULL, NULL, NULL, '寄养中');
INSERT INTO `pets_keep` VALUES (6, '2020-02-20', '2020-02-27', '小型', '猫', '145465656', '350', 4, NULL, NULL, NULL, '已送回');
INSERT INTO `pets_keep` VALUES (5, '2020-02-28', '2020-02-29', '小型', '鸭', '134454545', '100', 5, NULL, NULL, NULL, '匹配中');
INSERT INTO `pets_keep` VALUES (10, '2020-03-29', '2020-03-30', '大型', '狗', '12345345435', '50', 9, '随便', '', '十', '匹配中');
INSERT INTO `pets_keep` VALUES (1111, '2020-04-16', '2020-04-18', '中型', '狗', '15016687454', '80', 10, '16', '', 'jing', '匹配中');
INSERT INTO `pets_keep` VALUES (1111, '2020-05-09', '2020-05-12', '大型', '狗', '15016687454', '150', 11, '小春', '', '陈陈陈', '匹配中');
INSERT INTO `pets_keep` VALUES (333, '2020-05-10', '2020-05-11', '大型', '狗', '15016687454', '50', 12, '小狗子', '', '小测试', '匹配中');
INSERT INTO `pets_keep` VALUES (333, '2020-05-10', '2020-06-10', '中型', '狗', '15016687454', '1240', 13, '随便啦啦啦啦', '', '112', '匹配中');
INSERT INTO `pets_keep` VALUES (333, '2020-05-10', '2020-05-13', '大型', '狗', '15016687454', '150', 14, '明明', '', '名字', '匹配中');

-- ----------------------------
-- Table structure for pets_service
-- ----------------------------
DROP TABLE IF EXISTS `pets_service`;
CREATE TABLE `pets_service`  (
  `user_id` int(10) NOT NULL,
  `service_time` date DEFAULT NULL,
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telephone` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pets_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shape` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `service` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `kind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pets_service
-- ----------------------------
INSERT INTO `pets_service` VALUES (8, '2020-02-20', '新增', '13243434', '小面', '小型', '100', '洗澡', 1, NULL, NULL, '广东省清远市清新区玄真路31号', '匹配中');
INSERT INTO `pets_service` VALUES (9, '2020-02-27', '春', '10099112', '田田', '中型', '100', '洗澡', 2, NULL, NULL, '广东省清远市清新区玄真路31号', '匹配中');
INSERT INTO `pets_service` VALUES (10, '2020-03-29', '1211', '154354543', '啊咧', NULL, '1500', '绝育', 6, '狗', '雄', '广东省清远市清新区玄真路31号', '匹配中');
INSERT INTO `pets_service` VALUES (10, '2020-03-29', '十', '14645654654', '十一', NULL, '40', '修剪', 7, NULL, NULL, '广东省清远市清新区玄真路31号', '匹配中');
INSERT INTO `pets_service` VALUES (10, '2020-03-29', '十', '1345465654', '十一', NULL, '40', '修剪', 12, NULL, NULL, '广东省清远市清新区玄真路31号', '已匹配');
INSERT INTO `pets_service` VALUES (2222, '2020-03-30', 'try', '144564565465', '试试看', '中型', '40', '修剪', 15, NULL, NULL, '广东省清远市清新区玄真路31号', '匹配中');
INSERT INTO `pets_service` VALUES (1111, '2020-04-16', 'yi', '15016687444', '17', '中型', '40', '修剪', 16, NULL, NULL, '广东省广州市番禺区清河东路319号', '匹配中');
INSERT INTO `pets_service` VALUES (1111, '2020-04-16', 'cheng', '15016687444', '18', NULL, '1000', '绝育', 17, '猫', '雌', '广东省广州市番禺区清河东路319号', '已匹配');
INSERT INTO `pets_service` VALUES (3, '2020-05-06', '小管家', '15016687454', '5566', '大型', '50', '修剪', 18, NULL, NULL, '广东省广州市番禺区清河东路319号', '匹配中');
INSERT INTO `pets_service` VALUES (333, '2020-05-10', '1111', '15016687454', '111111', '大型', '50', '修剪', 19, NULL, NULL, '广东省广州市番禺区清河东路319号', '匹配中');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `user_id` int(11) DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `created` date DEFAULT NULL,
  `browse` int(11) DEFAULT NULL,
  `good` int(255) DEFAULT NULL,
  `likeNumber` int(255) DEFAULT NULL,
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, '这是啥', '2020-03-19', 457, 2, 106, 1, NULL);
INSERT INTO `posts` VALUES (2, '试试看', '2020-03-25', 454, 1, 233, 2, NULL);
INSERT INTO `posts` VALUES (10, '？？', '2020-03-24', 15, 2, 0, 27, NULL);
INSERT INTO `posts` VALUES (1111, '今天是16号', '2020-04-16', 159, 1, 1, 28, 6);
INSERT INTO `posts` VALUES (1111, '我的狗子可爱吗？', '2020-05-04', 10, 1, 1, 29, 11);
INSERT INTO `posts` VALUES (3, '随便啦', '2020-05-05', 32, 2, 0, 40, NULL);
INSERT INTO `posts` VALUES (3, 'subian', '2020-05-05', 18, 2, 0, 41, 16);
INSERT INTO `posts` VALUES (1111, '今天是9号', '2020-05-09', 3, 1, 1, 45, NULL);
INSERT INTO `posts` VALUES (333, '12', '2020-05-10', 2, 2, 0, 48, 25);
INSERT INTO `posts` VALUES (333, '今天是10号', '2020-05-10', 0, 2, 0, 49, NULL);
INSERT INTO `posts` VALUES (333, '想要养宠物', '2020-05-10', 3, 2, 0, 50, 29);

-- ----------------------------
-- Table structure for trace_record
-- ----------------------------
DROP TABLE IF EXISTS `trace_record`;
CREATE TABLE `trace_record`  (
  `adopt_id` int(10) NOT NULL,
  `time` date DEFAULT NULL,
  `number` int(20) DEFAULT NULL,
  `pets_id` int(10) DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of trace_record
-- ----------------------------
INSERT INTO `trace_record` VALUES (1111, '2020-04-24', 3, NULL, 'http://image.jt.com/videos/2020-4-24/logo-1587672492353.mp4', 5);
INSERT INTO `trace_record` VALUES (333, '2020-05-10', 1, NULL, 'http://image.jt.com/videos/2020-5-10/logo-1589055833002.mp4', 6);
INSERT INTO `trace_record` VALUES (333, '2020-05-10', 2, NULL, 'http://image.jt.com/videos/2020-5-10/logo-1589074189327.mp4', 7);
INSERT INTO `trace_record` VALUES (333, '2020-05-10', 3, NULL, 'http://image.jt.com/videos/2020-5-10/logo-1589075257771.mp4', 8);
INSERT INTO `trace_record` VALUES (333, '2020-05-10', 3, NULL, 'http://image.jt.com/videos/2020-5-10/logo-1589075272838.mp4', 9);
INSERT INTO `trace_record` VALUES (333, '2020-05-10', 3, NULL, 'http://image.jt.com/videos/2020-5-10/logo-1589075274908.mp4', 10);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `wechaturl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `money` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1111, '小管', 'super', '$2a$10$qfn7wWKAyzuG79/5Do2viOYBu1s/3HpsT6WCdRs3lzqQjteOO.IFy', '普通用户', 1, '广东省广州市番禺区清河东路319号', 22, '女', '15016687254', 'http://image.jt.com/uploads/2020-5-9/logo-1589036534317.jpeg', 9860);
INSERT INTO `user` VALUES (2222, '新增', 'new', '$2a$10$hwR9eMfgibA/vzQiiLYMyuYdGV8ixSPEsPFwDGYmK2ihFVY7/TxiK', '普通管理员', 2, '广东省广州市番禺区清河东路319号', 22, '女', '15016687444', 'http://image.jt.com/wechat/we1.jpeg', 9690);
INSERT INTO `user` VALUES (333, 'test3', 'ddd', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '普通用户', 3, '广东省广州市番禺区清河东路319号', 23, '女', '15016687454', 'http://image.jt.com/uploads/2020-5-10/logo-1589074436672.jpeg', 8558);
INSERT INTO `user` VALUES (1, '不鸭', 'aaa', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '超级管理员', 4, '广东省广州市番禺区清河东路319号', 23, '女', '15767435420', 'http://image.jt.com/wechat/w4.jpg', 10000);
INSERT INTO `user` VALUES (2, '小刘鸭仔', 'bbb', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '普通管理员', 5, '广东省广州市番禺区清河东路319号', 24, '女', '14016687454', 'http://image.jt.com/wechat/20180220165946_RiGPS.jpeg', 10000);
INSERT INTO `user` VALUES (3, '啵唧', 'ccc', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '普通用户', 6, '广东省广州市番禺区清河东路319号', 24, '男', '13516687454', 'http://image.jt.com/uploads/2020-5-5/logo-1588626471633.jpeg', 9950);
INSERT INTO `user` VALUES (4, '靓仔', 'dd', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '普通管理员', 7, '广东省广州市番禺区清河东路319号', 26, '男', '13616687454', 'http://image.jt.com/wechat/20160309205408_SeLmZ.jpeg', 10000);
INSERT INTO `user` VALUES (5, '小白鸭', 'ee', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '超级管理员', 8, '广东省广州市番禺区清河东路319号', 33, '男', '13716687454', 'http://image.jt.com/wechat/20160310124014_xZeuY.jpeg', 10000);
INSERT INTO `user` VALUES (6, '鸭仔', 'yaya', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '超级管理员', 9, '广东省广州市番禺区清河东路319号', 43, '男', '18816687454', 'http://image.jt.com/wechat/20170905223723_HxKPF.thumb.700_0.jpeg', 10000);
INSERT INTO `user` VALUES (7, '小小', 'gg', '$2a$10$b4RbCPY25B7EqHM3NoPkue3t.thRCFp0GJgJFRKDCEHWTkw7VH3FO', '普通用户', 10, '广东省广州市番禺区清河东路319号', 24, '女', '15916687454', 'http://image.jt.com/wechat/20180925010133_weppo.jpeg', 10000);
INSERT INTO `user` VALUES (8, '新增', 'newcreate', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '超级管理员', 11, '广东省广州市番禺区清河东路319号', 25, '男', '15816687454', 'http://image.jt.com/wechat/w6.jpg', 10000);
INSERT INTO `user` VALUES (9, '春', 'spring', '$2a$10$1G/XlNqyZHtP0WsudPr09.mx.DYy6jWW4HuFug1ptyidN/G3P.o02', '超级管理员', 12, '广东省广州市番禺区清河东路319号', 34, '女', '13416687454', 'http://image.jt.com/wechat/w7.jpg', 10000);
INSERT INTO `user` VALUES (10, '十', 'ten', '$2a$10$TXzpE536XxIwugc7hL/XQOw9p15VbYT9PVZnURcwO9PFByrwbxNoa', '超级管理员', 13, '广东省广州市番禺区清河东路319号', 33, '女', '15016688454', 'http://image.jt.com/wechat/we1.jpeg', 9770);
INSERT INTO `user` VALUES (11, '肥仔', 'fat', '$2a$10$JD5epn4cAizmEUMX0.jTauJOcSk3NwlpTnBdnJO5lgadOXy3ofAy2', '普通管理员', 14, '广东省广州市番禺区清河东路319号', 25, '女', '13616787454', 'http://image.jt.com/wechat/cemP2VOWW4fPk.jpg', 10000);
INSERT INTO `user` VALUES (12, '秋', 'autumn', '$2a$10$mJcKNhXmzX3sPVmdWB.HQe77Xema1E7oJWsJTLJmz5Y2Zpb/lFzam', '普通用户', 15, '广东省广州市番禺区清河东路319号', 27, '男', '15976687454', 'http://image.jt.com/wechat/w4.jpg', 10000);
INSERT INTO `user` VALUES (113, '随便', 'tests', '$2a$10$kX8gmBvZvhYqz9OOQE.lz.16GbZeZhSpc2zvys7EBUYmfB2dSqJ/a', '超级管理员', 30, '广东省广州市番禺区清河东路319号', 22, '女', '15767435422', 'http://image.jt.com/uploads/2020-4-15/logo-1586881896893.jpg', NULL);
INSERT INTO `user` VALUES (2223, 'lucky dog', NULL, NULL, NULL, 44, NULL, NULL, NULL, NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLE53PEAXficYkxRCUQNMEK0M4Zzcrm3wIGx8TfEghWCQNia8T4pfia7Ngp8iaiabbGsnfEByn8TF44dIQ/132', NULL);
INSERT INTO `user` VALUES (2224, 'lucky dog', NULL, NULL, NULL, 45, NULL, NULL, NULL, NULL, 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLE53PEAXficYkxRCUQNMEK0M4Zzcrm3wIGx8TfEghWCQNia8T4pfia7Ngp8iaiabbGsnfEByn8TF44dIQ/132', NULL);

-- ----------------------------
-- Table structure for user_adopt
-- ----------------------------
DROP TABLE IF EXISTS `user_adopt`;
CREATE TABLE `user_adopt`  (
  `experience` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  `merry` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `live` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `time` date DEFAULT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `kind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `demand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `species` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_adopt
-- ----------------------------
INSERT INTO `user_adopt` VALUES ('有经验', 1111, '单身', '自住房', '领养中', '2020-03-03', '想要养狗子', '狗', 236, '可亲自上门领取宠物', '没有病史', 1, '金毛', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 1, '已婚', '自住房', '领养中', '2020-03-02', '想要养猫咪', '猫', 22, '可自费托运宠物', '没有病史', 2, '缅因猫', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 2, '已婚', '自住房', '领养中', '2020-03-02', '想要一只小白兔', '兔', 222, '可不用打疫苗', '没有病史', 3, '白兔', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 3, '已婚', '自住房', '领养中', '2020-02-13', '想要一只小猫咪', '猫', 132, '宠物的生活用品已备好', '已打疫苗', 4, '俄罗斯蓝猫', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 4, '已婚', '合租', '领养中', '2020-02-12', '想要领养一只雌的仓鼠', '鼠', 343, '宠物可随时入住', '已结扎', 5, '仓鼠', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 5, '已婚', '合租', '领养中', '2020-02-21', '想要领养狗狗', '狗', 54, '可随时入住，并自费托运', '已结扎', 6, '柯基', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 7, '单身', '自住房', '领养中', '2020-02-07', '想要领养一只金毛', '狗', 566, '不负责宠物托运费', '没有咬过人', 7, '金毛', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 8, '已婚', '自住房', '领养中', '2020-02-14', '想要领养一只狗子陪伴爸妈', '狗', 76, '不亲自上门领', '没有病史', 8, '阿拉斯加', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 9, '单身', '自住房', '领养中', '2020-02-10', '想要领养一只猫咪', '猫', 78, '有经验养宠物，请放心', '没有病史', 9, '埃及猫', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 10, '已婚', '自住房', '领养中', '2020-02-23', '想要一只柯基', '狗', 546, '可随时入住', '没有要求', 10, '柯基', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 11, '已婚', '合租', '领养中', '2020-02-13', '想要一只兔子', '兔', 34, '随时入住', '没有要求', 11, '白兔', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 10, '恋爱中', '整租房', '领养中', '2020-03-24', '想要仓鼠', '鼠', 0, '可亲自上门领取仓鼠', '没有病史', 13, '仓鼠', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 1111, '单身', '整租房', '领养中', '2020-04-16', '宠物太多了', '猫', 2, '打疫苗了', '上门自取', 14, '狸花猫', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 1111, '单身', '自住房', '领养中', '2020-05-09', '喜欢小动物', '狗', 0, '可上门自取宠物', '没有病史', 15, '金毛', NULL);
INSERT INTO `user_adopt` VALUES ('有经验', 333, '单身', '自住房', '领养中', '2020-05-10', '喜欢狗子', '狗', 0, '可上门自取', '没有病史', 16, '金毛', '广东省广州市番禺区清河东路319号');
INSERT INTO `user_adopt` VALUES ('有经验', 333, '单身', '自住房', '领养中', '2020-05-10', '喜欢动物', '狗', 0, '可上门取', '没有病史', 17, '金毛', '广东省广州市');

-- ----------------------------
-- Table structure for user_raise
-- ----------------------------
DROP TABLE IF EXISTS `user_raise`;
CREATE TABLE `user_raise`  (
  `user_id` int(10) NOT NULL,
  `pets_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` date NOT NULL,
  `kind` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `url2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `species` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `doc_id` int(11) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `petsInfo_userRise`(`pets_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_raise
-- ----------------------------
INSERT INTO `user_raise` VALUES (1111, '13', '2020-04-09', '狗', '狗妈咪生了很多狗子', '送养中', 'http://image.jt.com/dogs/timg12.jpg', 0, '金毛', 10, 'http://image.jt.com/dogs/timg12.jpg', 12, '广东省广州市番禺区清河东路319号', '15016687414', 'dog');
INSERT INTO `user_raise` VALUES (1111, '12', '2020-04-16', '狗', '工作原因', '送养中', NULL, 0, '金毛', 15, NULL, 10, '广东省广州市番禺区清河东路319号', '150166888888', '随便4444');
INSERT INTO `user_raise` VALUES (1111, '15', '2020-05-05', '猫', '要搬家了', '审批通过', NULL, 0, '狸花猫', 19, NULL, 15, '广东省清远市清新区玄真路31号', '13432702726', '咪咪咪');
INSERT INTO `user_raise` VALUES (3, '16', '2020-05-07', '猫', '不想养了', '送养中', NULL, 0, '不祥', 20, NULL, 17, '广东省广