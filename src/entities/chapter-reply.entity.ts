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
import { ChapterReplyAction } from "./chapter-reply-action.entity";
import { ChapterComment } from "./chapter-comment.entity";

@Entity("chapter_reply")
export class ChapterReply extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ type: "varchar", length: 255, comment: "回复内容" })
  content!: string;

  @Column({ type: "int", comment: "评论ID" })
  comment_id!: number;

  @ManyToOne(() => ChapterComment)
  @JoinColumn({
    name: "comment_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "chapter_reply_id",
  })
  comment?: ChapterComment;

  @Column({ type: "int", comment: "回复人ID" })
  user_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "user_chapter_reply_id",
  })
  user?: User;

  @OneToMany(() => ChapterReplyAction, (action) => action.reply)
  actions?: ChapterReplyAction[];
}
