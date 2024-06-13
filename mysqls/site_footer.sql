-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: book_reader
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `site_footer`
--

DROP TABLE IF EXISTS `site_footer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `site_footer` (
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `created_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `updated_by` varchar(255) DEFAULT NULL COMMENT '最后操作人',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `link` varchar(255) DEFAULT NULL COMMENT '外连接',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `type` enum('ABOUT','CONTACT','NEWS','SOCIAL') NOT NULL COMMENT '类型',
  `sub_type` enum('PLATFORM','COMPANY','PAPER') DEFAULT NULL COMMENT '子类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_footer`
--

/*!40000 ALTER TABLE `site_footer` DISABLE KEYS */;
INSERT INTO `site_footer` VALUES (NULL,'2024-06-04 16:40:58.321413','admin@mail.com','2024-06-04 16:40:58.321413',NULL,1,'关于我们',NULL,'通过不断的创新以推进AI制药技术的边界，让更多疾病有药可医，让更多生命重获健康','ABOUT',NULL),(NULL,'2024-06-04 16:41:41.126977','admin@mail.com','2024-06-04 16:41:41.126977',NULL,3,'+91 999 9999 9999',NULL,NULL,'CONTACT',NULL),(NULL,'2024-06-04 16:41:46.908885','admin@mail.com','2024-06-04 16:41:46.908885',NULL,4,'+91 999 9999 9999',NULL,NULL,'CONTACT',NULL),(NULL,'2024-06-04 16:42:11.163628','admin@mail.com','2024-06-04 16:42:11.163628',NULL,5,'核心技术',NULL,NULL,'NEWS','PLATFORM'),(NULL,'2024-06-04 16:42:37.342149','admin@mail.com','2024-06-04 16:42:37.342149',NULL,6,'AI新药研发平台','https://baidu.com',NULL,'NEWS','PLATFORM'),(NULL,'2024-06-04 16:42:54.244726','admin@mail.com','2024-06-04 16:42:54.244726',NULL,7,'公司荣誉','https://baidu.com',NULL,'NEWS','COMPANY'),(NULL,'2024-06-04 16:43:15.592021','admin@mail.com','2024-06-04 16:43:15.592021',NULL,8,'原研创新技术','https://baidu.com',NULL,'NEWS','PLATFORM'),(NULL,'2024-06-04 16:43:29.369908','admin@mail.com','2024-06-04 16:43:29.369908',NULL,9,'技术合作方','https://baidu.com',NULL,'NEWS','COMPANY'),(NULL,'2024-06-04 16:44:18.299369','admin@mail.com','2024-06-04 16:44:18.299369',NULL,10,'药物管线','',NULL,'NEWS','COMPANY'),(NULL,'2024-06-04 16:44:31.517587','admin@mail.com','2024-06-04 16:44:31.517587',NULL,11,'设计服务管线','https://baidu.com',NULL,'NEWS','COMPANY'),(NULL,'2024-06-04 16:44:41.050677','admin@mail.com','2024-06-04 16:44:41.050677',NULL,12,'新闻',NULL,NULL,'NEWS','PAPER'),(NULL,'2024-06-04 16:44:54.340580','admin@mail.com','2024-06-04 16:44:54.340580',NULL,13,'媒体报道','https://baidu.com',NULL,'NEWS','PAPER'),(NULL,'2024-06-04 16:45:03.616645','admin@mail.com','2024-06-04 16:45:03.616645',NULL,14,'新闻','https://baidu.com',NULL,'NEWS','PAPER'),(NULL,'2024-06-04 16:45:52.935424','admin@mail.com','2024-06-04 16:45:52.935424',NULL,15,'微信公众号 了解药品咨询','https://baidu.com',NULL,'SOCIAL',NULL),(NULL,'2024-06-04 16:46:02.679488','admin@mail.com','2024-06-04 16:46:02.679488',NULL,16,'订阅数据库','https://baidu.com',NULL,'SOCIAL',NULL);
/*!40000 ALTER TABLE `site_footer` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13 18:39:27
