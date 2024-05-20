-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `no` VARCHAR(10) NOT NULL COMMENT "Chapter No.",
  `title` VARCHAR(255) NOT NULL COMMENT "Chapter TIME",
  `content` text DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL COMMENT 'chapter url',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Created User',
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Updated User',
  PRIMARY KEY (`id`),
  KEY `chapter_ibfk_1` (`book_id`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='book chapter'