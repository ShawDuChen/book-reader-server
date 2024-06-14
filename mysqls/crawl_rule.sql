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
-- Table structure for table `crawl_rule`
--

DROP TABLE IF EXISTS `crawl_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crawl_rule` (
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建日期',
  `created_by` varchar(255) DEFAULT NULL COMMENT '创建人',
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新日期',
  `updated_by` varchar(255) DEFAULT NULL COMMENT '最后操作人',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(32) NOT NULL COMMENT '规则名称',
  `website_url` varchar(255) NOT NULL COMMENT '站点地址',
  `list_selector` varchar(64) NOT NULL COMMENT '列表选择器',
  `content_selector` varchar(64) NOT NULL COMMENT '内容选择器',
  `booksId` int(11) DEFAULT NULL COMMENT 'ID',
  `status` int(11) DEFAULT '1' COMMENT '状态:1-可用;0-不可用;',
  PRIMARY KEY (`id`),
  KEY `FK_2fac7654ca44cc18c7307f658d3` (`booksId`),
  CONSTRAINT `FK_2fac7654ca44cc18c7307f658d3` FOREIGN KEY (`booksId`) REFERENCES `book` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crawl_rule`
--

/*!40000 ALTER TABLE `crawl_rule` DISABLE KEYS */;
INSERT INTO `crawl_rule` VALUES ('可用','2024-05-30 09:05:56.548397','adminuser202@email.com','2024-06-14 10:57:10.479890',NULL,1,'TangSanBooks','https://www.tangsanbooks.com','.list-chapter li a','.article .article-box',NULL,1),('可用','2024-06-14 09:48:44.078625','admin@mail.com','2024-06-14 10:57:10.488390',NULL,3,'科幻小说网','http://www.kehuan.net.cn','.book dl a','#container .text',NULL,1),('不可用；章节内容爬取存在分页，不全（废弃不用）','2024-06-14 10:00:51.946686','admin@mail.com','2024-06-14 11:24:16.889998',NULL,4,'书吧小说网','https://www.eyeonsolutions.org','#list-chapterAll dd a','.book .readcontent',NULL,0),('可用','2024-06-14 10:54:31.237355','admin@mail.com','2024-06-14 10:57:10.489517',NULL,5,'明智屋小说网','https://www.mingzw.net','#section-free li a','#novel-detail .contents',NULL,1),('不可用；应该是单页面，内容无法抓取；','2024-06-14 11:05:07.368183','admin@mail.com','2024-06-14 11:24:16.899204',NULL,6,'网阅小说网','https://m.beiwobook.cc','.ranking-list-box a','#chapter_content',NULL,0),('不可用；内容页是有分页的逻辑；','2024-06-14 11:20:33.138102','admin@mail.com','2024-06-14 11:24:16.899709',NULL,7,'顶点小说网','https://m.118book.com','#chapterlist a','#chaptercontent',NULL,0),('可用；遇到emoji问题，并解决；','2024-06-14 11:28:19.917055','admin@mail.com','2024-06-14 11:46:37.966975',NULL,8,'鲲弩小说网','https://www.kunnu.com','.book-list li a','#nr1',NULL,1),('不可用；非服务端渲染无法抓取','2024-06-14 11:50:55.031778','admin@mail.com','2024-06-14 11:52:24.526650',NULL,9,'快书小说网','http://www.bookso.net','.listmain dd a','#content',NULL,0),('可用','2024-06-14 13:13:55.756189','admin@mail.com','2024-06-14 13:15:24.061541',NULL,10,'和图书小说网','https://www.hetushu.com','#dir dd a','#content',NULL,1),('不可用；乱码','2024-06-14 13:17:50.675949','admin@mail.com','2024-06-14 13:19:31.252789',NULL,11,'好书小说网','http://www.haoshu6.com','.listmain dd a','#content',NULL,0),('可用；将request替换为fetch','2024-06-14 13:21:02.935579','admin@mail.com','2024-06-14 13:30:52.917669',NULL,12,'鬼怪屋小说网','http://www.guiguaiwu.com','.txt-list a','#MyContent',NULL,1),('不可用；乱码','2024-06-14 13:34:47.778173','admin@mail.com','2024-06-14 13:36:29.702085',NULL,13,'五六中文小说网','https://www.56zw.com','#list dd a','#content',NULL,0),('不可用；动态加载无法抓取；','2024-06-14 13:41:22.019397','admin@mail.com','2024-06-14 13:41:46.683699',NULL,14,'满风小说网','https://www.mfxs0.cn','.dirlist a','#chaptercontent',NULL,0),('可用','2024-06-14 13:43:07.075889','admin@mail.com','2024-06-14 13:44:21.518613',NULL,15,'无措小说网','https://www.wucuoxs.com','table td a','#htmlContent',NULL,1),('不可用；内容分页；','2024-06-14 13:47:57.604893','admin@mail.com','2024-06-14 13:48:32.886324',NULL,16,'彩墨网小说网','https://www.caimoge.net/txt/79371.html','#readerlist li a','#content',NULL,0),('不可用；单页面无法抓取','2024-06-14 13:57:12.216366','admin@mail.com','2024-06-14 13:59:26.224839',NULL,17,'大文学小说网','https://www.wcxsw.org','#list dd a','#content',NULL,0),('可用;','2024-06-14 14:07:19.819605','admin@mail.com','2024-06-14 14:09:04.499410',NULL,18,'渣渣小说网','https://www.zztxt.net','.mulu:eq(1) li a','#content',NULL,1);
/*!40000 ALTER TABLE `crawl_rule` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 14:10:04
