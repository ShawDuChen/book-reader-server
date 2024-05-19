-- Active: 1716033677212@@127.0.0.1@3306@book_reader
CREATE TABLE `dict_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `value` varchar(32) NOT NULL COMMENT 'Data Value',
  `label` varchar(32) NOT NULL COMMENT 'Data Label',
  `dict_type` int(11) NOT NULL COMMENT 'Dictionary ID',
  `status` int(1) DEFAULT '1' COMMENT 'Dictionary Status',
  `remark` varchar(512) DEFAULT NULL COMMENT 'Remark',
  `created_at` datetime DEFAULT NULL COMMENT 'Create Time',
  `created_by` varchar(255) DEFAULT NULL COMMENT 'Create User',
  `updated_at` datetime DEFAULT NULL COMMENT 'Update Time',
  `updated_by` varchar(255) DEFAULT NULL COMMENT 'Update User',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_id` (`id`) USING HASH COMMENT 'id索引',
  KEY `dict_type_id` (`dict_type`),
  CONSTRAINT `dict_type_id` FOREIGN KEY (`dict_type`) REFERENCES `dictionary` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Dictionary Datas'