import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";

@Entity("code")
export class Code extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "表名称" })
  name!: string;

  @Column({ type: "text", nullable: true, comment: "表列数据" })
  columns?: string;
}
