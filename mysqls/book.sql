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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `created_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `updated_by` varchar(255) DEFAULT NULL COMMENT '最后操作人',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) NOT NULL COMMENT '书名',
  `category_id` int(11) NOT NULL COMMENT '分类ID',
  `author_id` int(11) NOT NULL COMMENT '作者ID',
  `fetch_url` varchar(255) DEFAULT NULL COMMENT '爬取URL',
  `crawl_rule_id` int(11) DEFAULT NULL COMMENT '爬取规则ID',
  `cover` varchar(255) DEFAULT NULL COMMENT '书本封面',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_442a5ea5578b765050e626a603` (`crawl_rule_id`),
  KEY `book_category_id` (`category_id`),
  KEY `book_author_id` (`author_id`),
  CONSTRAINT `book_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `book_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `crawl_rule_id` FOREIGN KEY (`crawl_rule_id`) REFERENCES `crawl_rule` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (NULL,'2024-05-29 09:07:35.000000','adminuser202@email.com','2024-06-05 17:30:04.565046','admin@mail.com',1,'吞噬星空2',1,1,'https://www.tangsanbooks.com/xs/tunshixingkong2',NULL,'http://localhost:7001/static/255449ef-76ab-4639-90b8-0d203c263c79-login-bg.png'),(NULL,'2024-06-11 10:36:59.077779','admin@mail.com','2024-06-13 18:42:34.594642','admin@mail.com',7,'斗罗大陆Ⅳ终极斗罗',2,2,'https://www.tangsanbooks.com/xs/zhongjidouluo',NULL,NULL),(NULL,'2024-06-13 18:43:44.518270','admin@mail.com','2024-06-13 18:43:44.518270',NULL,8,'神印王座',1,2,'https://www.tangsanbooks.com/xs/shenyinwangzuo',NULL,NULL),(NULL,'2024-06-13 18:44:30.756700','admin@mail.com','2024-06-13 18:44:30.756700',NULL,9,'冰火魔厨',1,2,'https://www.tangsanbooks.com/xs/binghuomochu',NULL,NULL);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13 18:46:21
