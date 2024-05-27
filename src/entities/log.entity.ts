import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";

@Entity("logger")
export class Logger extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "请求方法" })
  method!: string;

  @Column({ type: "varchar", length: 255, comment: "请求URL" })
  url!: string;

  @Column({ type: "int", comment: "状态" })
  status!: number;

  @Column({ type: "text", nullable: true, comment: "请求体" })
  request_body?: string;

  @Column({ type: "text", nullable: true, comment: "响应体" })
  response_body?: string;
}
