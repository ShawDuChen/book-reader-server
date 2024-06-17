import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";
import CrudBaseEntity from "./tools/base-entity";

@Entity("author")
export class Author extends CrudBaseEntity {
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

  @Column({ type: "varchar", length: 255, nullable: true, comment: "头像" })
  avatar?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "简介" })
  description?: string;
}
