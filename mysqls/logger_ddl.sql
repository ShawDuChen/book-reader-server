-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `logger` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `method` varchar(32) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `request_body` text,
  `response_body` text,
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Created User',
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Updated User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COMMENT='logger'