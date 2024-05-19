-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) NOT NULL COMMENT 'Dictionary Name',
  `identify` varchar(32) NOT NULL COMMENT 'Dictionary Identify',
  `status` int(1) DEFAULT '1' COMMENT 'Dictionary Status',
  `remark` varchar(512) DEFAULT NULL COMMENT 'Remark',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Create User',
  `updated_at` datetime DEFAULT NULL COMMENT 'Update Time',
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Update User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='Dictionary'