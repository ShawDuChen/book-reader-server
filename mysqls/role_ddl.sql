-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(255) NOT NULL COMMENT 'Role Name',
  `authorities` varchar(1024) DEFAULT NULL COMMENT 'Authorities',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Create User',
  `updated_at` datetime DEFAULT NULL COMMENT 'Update Time',
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Update User',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='Role'