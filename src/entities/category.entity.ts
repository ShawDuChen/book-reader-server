import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import CrudBaseEntity from "./tools/base-entity";

@Entity("category")
export class Category extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "分类名称" })
  name!: string;

  @Column({ type: "varchar", length: 255, comment: "分类标识" })
  identify!: string;
}
