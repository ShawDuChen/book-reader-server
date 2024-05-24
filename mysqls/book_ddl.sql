-- Active: 1715415277331@@127.0.0.1@3306@book_reader
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) NOT NULL COMMENT 'Book Name',
  `category_id` int(11) DEFAULT NULL COMMENT 'Category ID',
  `author_id` int(11) NOT NULL COMMENT 'Author ID',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Create User',
  `updated_at` datetime DEFAULT NULL COMMENT 'Update Time',
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Update User',
  `fetch_url` varchar(255) DEFAULT NULL COMMENT 'fetch book url',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `book_category` (`category_id`),
  KEY `book_author` (`author_id`),
  CONSTRAINT `book_author` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  CONSTRAINT `book_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='book'