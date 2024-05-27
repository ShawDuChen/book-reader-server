import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./book.entity";

@Entity("author")
export class Author {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "作者名称" })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "性别" })
  sex?: string;

  @Column({ type: "varchar", length: 11, nullable: true, comment: "联系电话" })
  tel?: string;

  @Column({ type: "int", nullable: true, default: 1, comment: "状态" })
  status?: number;

  @OneToMany(() => Book, (book) => book.author)
  books?: Book[];

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
