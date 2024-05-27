import path from "node:path";
import { DataSource, EntityTarget } from "typeorm";
import { config } from "dotenv";
import { CodeColumn } from "./typing";

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
  entities: [path.join(__dirname, "/../**/*.entity.{js,ts}")],
  entityPrefix: "",
  logging: true,
  synchronize: true,
});

export function getMetaColumns<T = unknown>(
  entity: EntityTarget<T>,
): CodeColumn[] {
  if (!entity) return [];
  const meta = dataSource.getMetadata(entity);
  const columns: CodeColumn[] = meta.columns.map((column) => ({
    dataIndex: column.propertyName,
    title: column.comment || column.propertyName,
    searchable: !column.isNullable,
    changed: !column.isNullable,
    type: (column.type || "string") as string,
  }));
  return columns;
}

export default dataSource;
