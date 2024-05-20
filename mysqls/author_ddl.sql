-- Active: 1715415277331@@127.0.0.1@3306@book_reader
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '作者名',
  `sex` varchar(1) DEFAULT NULL COMMENT '性别',
  `tel` varchar(20) DEFAULT NULL COMMENT '手机号',
  `status` int(1) DEFAULT '1' COMMENT '状态',
  `created_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `created_at` datetime DEFAULT NULL COMMENT '创建人',
  `updated_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作者表'