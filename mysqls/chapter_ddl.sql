-- Active: 1715415277331@@127.0.0.1@3306@book_reader
CREATE TABLE `chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `book_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chapter_ibfk_1` (`book_id`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COMMENT='book chapter'