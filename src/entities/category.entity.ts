import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "分类名称" })
  name!: string;

  @Column({ type: "varchar", length: 255, comment: "分类标识" })
  identify!: string;

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
