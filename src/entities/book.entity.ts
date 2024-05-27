import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Chapter } from "./chapter.entity";
import { Author } from "./author.entity";

@Entity("book")
export class Book {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "书名" })
  name!: string;

  @Column({ type: "int", comment: "分类ID" })
  category_id!: number;

  @OneToOne(() => Category)
  @JoinColumn({
    name: "category_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "category_id",
  })
  category?: Category;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters?: Chapter[];

  @Column({ type: "int", comment: "作者ID" })
  author_id!: number;

  @OneToOne(() => Author)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "author_id",
  })
  author?: Author;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "爬取URL" })
  fetch_url?: string;

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
