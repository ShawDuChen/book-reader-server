import path from "node:path";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Shaw20240506",
  database: "book_reader",
  entities: [path.join(__dirname, "/../**/*.entity.{js,ts}")],
  entityPrefix: "",
  logging: true,
});

export default dataSource;
