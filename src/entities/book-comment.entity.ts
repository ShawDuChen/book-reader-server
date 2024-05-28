import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { User } from "./user.entity";
import { Book } from "./book.entity";
import { BookReply } from "./book-reply.entity";

@Entity("book_comment")
export class BookComment extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "评论内容" })
  content!: string;

  @Column({ type: "int", comment: "评论人ID" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "user_comment_id",
  })
  user?: User;

  @Column({ type: "int", comment: "评论书籍ID" })
  book_id!: number;

  @ManyToOne(() => Book)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "book_comment_id",
  })
  book?: Book;

  @Column({ type: "int", comment: "点赞数", default: 0, nullable: true })
  like_count?: number;

  @Column({ type: "int", comment: "点踩数", default: 0, nullable: true })
  dislike_count?: number;

  @OneToMany(() => BookReply, (reply) => reply.comment)
  replies?: BookReply[];
}
