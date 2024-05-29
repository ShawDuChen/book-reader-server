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
import { BookCommentAction } from "./book-comment-action.entity";

export enum CommentStatus {
  pending = 0,
  fulfilled = 1,
  rejected = 2,
}

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
    foreignKeyConstraintName: "user_book_comment_id",
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

  @Column({
    type: "enum",
    comment: "审核状态",
    default: CommentStatus.pending,
    enum: CommentStatus,
  })
  status?: CommentStatus;

  @OneToMany(() => BookReply, (reply) => reply.comment)
  replies?: BookReply[];

  @OneToMany(() => BookCommentAction, (action) => action.comment)
  actions?: BookCommentAction[];
}
