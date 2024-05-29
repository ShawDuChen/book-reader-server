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

export enum ActionType {
  "LIKE" = "LIKE",
  "DISLIKE" = "DISLIKE",
}

@Entity("book_comment_action")
export class BookCommentAction extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "enum", enum: ActionType, comment: "操作行为" })
  action!: ActionType;

  @Column({ type: "int", comment: "关联评论ID" })
  comment_id!: number;

  @ManyToOne(() => BookComment)
  @JoinColumn({
    name: "comment_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_book_comment_action_comment_id",
  })
  comment?: BookComment;

  @Column({ type: "int", comment: "操作行为人" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_book_comment_action_user_id",
  })
  user?: User;
}
