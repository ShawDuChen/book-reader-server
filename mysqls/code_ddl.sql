-- Active: 1715415277331@@127.0.0.1@3306@book_reader
CREATE TABLE `code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '表名',
  `columns` TEXT DEFAULT NULL COMMENT '表列JOSN数据',
  `remark` VARCHAR(255) DEFAULT NULL COMMENT '备注',
  `created_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `created_at` datetime DEFAULT NULL COMMENT '创建人',
  `updated_by` varchar(100) DEFAULT NULL COMMENT '更新人',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_uindex` (`id`),
  UNIQUE KEY `name_no_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='代码生成表'