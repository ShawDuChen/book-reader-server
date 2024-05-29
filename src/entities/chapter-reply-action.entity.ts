import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CrudBaseEntity from "./tools/base-entity";
import { ChapterReply } from "./chapter-reply.entity";
import { User } from "./user.entity";

export enum ActionType {
  "LIKE" = "LIKE",
  "DISLIKE" = "DISLIKE",
}

@Entity("chapter_reply_action")
export class ChapterReplyAction extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "enum", enum: ActionType, comment: "操作行为" })
  action!: ActionType;

  @Column({ type: "int", comment: "关联评论ID" })
  reply_id!: number;

  @ManyToOne(() => ChapterReply)
  @JoinColumn({
    name: "reply_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_chapter_reply_action_reply_id",
  })
  reply?: ChapterReply;

  @Column({ type: "int", comment: "操作行为人" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_chapter_reply_action_user_id",
  })
  user?: User;
}
