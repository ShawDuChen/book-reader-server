import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { BookComment } from "./book-comment.entity";
import { User } from "./user.entity";

@Entity("book_reply")
export class BookReply extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "回复内容" })
  content!: string;

  @Column({ type: "int", comment: "评论ID" })
  comment_id!: number;

  @ManyToOne(() => BookComment)
  @JoinColumn({
    name: "comment_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "comment_id",
  })
  comment?: BookComment;

  @Column({ type: "int", comment: "回复人ID" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "user_reply_id",
  })
  user?: User;
}
