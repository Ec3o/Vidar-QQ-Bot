      -- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Database Name:v1d4r_b10g
-- Table structure for table `blogs`
--
-- USE v1d4r_b10g;
DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blogs`
(
    `id`       int NOT NULL AUTO_INCREMENT,
    `blog`     varchar(200) DEFAULT NULL,
    `nickname` varchar(50)  DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `blogs_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK
TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs`
VALUES (1, 'https://l0tus.vip', 'l0tus'),
       (2, 'https://r1esbyfe.top/', 'R1esbyfe'),
       (3, 'http://ma5hr00m.top', 'ma5hr00m'),
       (4, 'https://rippleqaq.github.io', 'ripple'),
       (5, 'https://blog.hiirachan.moe', 'Doddy'),
       (6, 'https://im.daidr.me', 'daidr'),
       (7, 'https://baimeow.cn', 'BaiMeow'),
       (8, 'http://www.luelueking.com', '1ue'),
       (9, 'https://www.cnblogs.com/biyifei', 'feifei'),
       (10, 'https://www.jian.pl', '简'),
       (11, 'https://ba1van4.icu', 'ba1van4'),
       (12, 'https://y01and3.github.io/', 'yolande'),
       (13, 'https://blog.t0hka.top/', 't0hka'),
       (14, 'https://hakuya.work', 'h4kuy4'),
       (15, 'https://www.bilibili.com/video/BV1GJ411x7h7/', 'kabuto'),
       (16, 'https://clingm.top', 'tr0uble'),
       (17, 'https://potat0.cc/', 'Potat0'),
       (18, 'https://blog.m1dsummer.top', 'Summer'),
       (19, 'https://cjovi.icu', 'chuj'),
       (20, 'https://4nsw3r.top/', '4nsw3r'),
       (21, 'https://0wl-alt.github.io', '0wl'),
       (22, 'https://homeboyc.cn/', 'At0m'),
       (23, 'https://chenmofeijin.top', 'ChenMoFeiJin'),
       (24, 'https://blog.mjclouds.com/', 'Klrin'),
       (25, 'https://ek1ng.com', 'ek1ng'),
       (26, 'https://lee-tc.github.io/', 'latt1ce'),
       (27, 'https://twitter.com/LAttic1ng', 'Ac4ae0'),
       (28, 'https://4kr.top', 'Akira'),
       (29, 'https://fl0.top/', 'qz'),
       (30, 'https://github.com/Liki4', 'Liki4'),
       (31, 'https://github.com/0x4qE', '0x4qE'),
       (32, 'https://www.xi4oyu.top/', 'xi4oyu'),
       (33, 'https://r3n0.top', 'R3n0'),
       (34, 'https://d1g.club', 'd1gg12'),
       (35, 'https://altonhe.github.io/', 'Trotsky'),
       (36, 'http://aw.gamison.top', 'Gamison'),
       (37, 'http://poi.ac', 'Tinmix'),
       (38, 'https://wr-web.github.io', 'RT'),
       (39, 'https://wzyxv1n.top/', 'wenzhuan'),
       (40, 'https://cosmos.red', 'Cosmos'),
       (41, 'https://blog.xyzz.ml:444/', 'Y'),
       (42, 'https://annevi.cn', 'Annevi'),
       (43, 'http://logong.vip', 'logong'),
       (44, 'https://harmless.blue/', 'Kevin'),
       (45, 'https://danisjiang.com', '幼稚园'),
       (46, 'https://r000setta.github.io', 'lostflower'),
       (47, 'http://www.roc826.cn/', 'Roc826'),
       (48, 'https://www.zhouweitong.site', 'ObjectNotFound'),
       (49, 'https://blog.wz22.cc', 'Moesang'),
       (50, 'https://github.red/', 'E99p1ant'),
       (51, 'http://michaelsblog.top/', 'Michael'),
       (52, 'http://r4u.top/', 'r4u'),
       (53, 'https://blog.0e1.top', 'Li4n0'),
       (54, 'http://ch1p.top', 'Ch1p'),
       (55, 'https://www.intmian.com', 'mian'),
       (56, 'https://migoooo.github.io/', 'MiGo'),
       (57, 'https://brownfly.github.io', 'BrownFly'),
       (58, 'https://blog.ar1s.top', 'Aris'),
       (59, 'https://chenxy.me', 'hsiaoxychen'),
       (60, 'https://blog.lou00.top', 'Lou00'),
       (61, 'https://github.com/Last-Order', 'Sora'),
       (62, 'http://0x2f.xyz', 'fantasyqt'),
       (63, 'https://vvv-347.space', 'vvv_347'),
       (64, 'https://veritas501.space', 'veritas501'),
       (65, 'https://jianshu.com/u/ad5c1e097b84', 'LuckyCat'),
       (66, 'https://cyris.moe/', 'Cyris'),
       (67, 'https://b0lv42.github.io/', 'b0lv42'),
       (68, 'https://ngc7292.github.io/', 'ngc7293'),
       (69, 'https://www.ckj123.com', 'ckj123'),
       (70, 'https://processor.pub/', 'Processor'),
       (71, 'http://heartsky.info', 'HeartSky'),
       (72, 'https://lorexxar.cn/', 'LoRexxar'),
       (73, 'https://lightless.me/', 'lightless'),
       (74, 'https://github.com/deadwind4', '逆风'),
       (75, 'https://mxgcccc4.github.io/', '陈斩仙'),
       (76, 'https://3riccc.github.io', 'Eric'),
       (77, 'https://mysid.top', 'mysid'),
       (78, 'https://ec3o.fun', 'Ec3o'),
       (79, 'https://csharpermantle.github.io/', 'mantle'),
       (80, 'https://www.yizishun.com/', '1sez'),
       (81, 'https://srf27.icu/', 'srf27'),
       (82, 'http://naclwww.xyz/', 'nacl'),
       (83, 'http://l1nk.icu/', 'l1nk'),
       (84, 'http://sh4ll0t.github.io/', 'sh4ll0t'),
       (85, 'http://addr3s5.top/', 'addr3s5'),
       (86, 'https://k1r4ca.top/', 'k1r4ca'),
       (87, 'https://z1nax5.github.io/', 'M1aoo0bin'),
       (88, 'http://fc04db.github.io/', 'fc04db'),
       (89, 'https://blog.woshiluo.com/', 'woshiluo'),
       (90, 'https://ch405.live', 'Ch405');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK
TABLES;

--
-- Table structure for table `flag`
--

DROP TABLE IF EXISTS `flag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flag`
(
    `id`   int NOT NULL AUTO_INCREMENT,
    `flag` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `flag_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flag`
--

LOCK
TABLES `flag` WRITE;
/*!40000 ALTER TABLE `flag` DISABLE KEYS */;
INSERT INTO `flag`
VALUES (1, 'VidarTeam{Welcome_To_The_Web_World_XD}');
/*!40000 ALTER TABLE `flag` ENABLE KEYS */;
UNLOCK
TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-10  1:55:28