import path from "node:path";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Code, Logger } from "./export";

const envConfigPath: Record<string, string> = {
  development: ".env.development",
};

// 启用环境变量配置
config({
  path: envConfigPath[process.env.NODE_ENV || ""] || ".env",
});

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
  database: "book_reader",
  // entities: [path.join(__dirname, "/../**/*.entity.{js,ts}")],
  entities: [Code, Logger],
  entityPrefix: "",
  logging: true,
  synchronize: true,
});

export default dataSource;
