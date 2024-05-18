-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) NOT NULL COMMENT 'Book Name',
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Create User',
  `updated_at` datetime DEFAULT NULL COMMENT 'Update Time',
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Update User',
  PRIMARY KEY (`id`),
  KEY `book_category` (`category_id`),
  CONSTRAINT `book_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='book'