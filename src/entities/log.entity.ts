import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("logger")
export class Logger {
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

  @Column({ type: "varchar", length: 255, nullable: true, comment: "备注" })
  remark?: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    nullable: true,
    comment: "创建日期",
  })
  created_at?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "创建人" })
  created_by?: string;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
    nullable: true,
    comment: "更新日期",
  })
  updated_at?: string;

  @Column({ type: "varchar", nullable: true, comment: "最后操作人" })
  updated_by?: string;
}
