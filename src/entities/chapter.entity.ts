import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book.entity";
import CrudBaseEntity from "./tools/base-entity";

@Entity("chapter")
export class Chapter extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "章节编号" })
  no!: string;

  @Column({ type: "varchar", length: 255, comment: "章节标题" })
  title!: string;

  @Column({ type: "text", nullable: true, comment: "章节内容" })
  content?: string;

  @Column({ type: "int", comment: "书本ID" })
  book_id!: number;

  @ManyToOne(() => Book)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_id",
  })
  book?: Book;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "章节URL" })
  url?: string;
}
