import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DateTimeTransformer } from "./date-time-transformer";

export default class CrudBaseEntity {
  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注" })
  remark?: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    nullable: true,
    comment: "创建日期",
    transformer: new DateTimeTransformer(),
  })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "创建人" })
  created_by?: string;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
    nullable: true,
    comment: "更新日期",
    transformer: new DateTimeTransformer(),
  })
  updated_at?: string;

  @Column({ type: "varchar", nullable: true, comment: "最后操作人" })
  updated_by?: string;
}
