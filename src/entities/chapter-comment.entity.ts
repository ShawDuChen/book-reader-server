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
import { ChapterReply } from "./chapter-reply.entity";
import { ChapterCommentAction } from "./chapter-comment-action.entity";
import { Chapter } from "./chapter.entity";

export enum CommentStatus {
  pending = 0,
  fulfilled = 1,
  rejected = 2,
}

@Entity("chapter_comment")
export class ChapterComment extends CrudBaseEntity {
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
    foreignKeyConstraintName: "user_chapter_comment_id",
  })
  user?: User;

  @Column({ type: "int", comment: "评论章节ID" })
  chapter_id!: number;

  @ManyToOne(() => Chapter)
  @JoinColumn({
    name: "book_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "chapter_comment_id",
  })
  chapter?: Chapter;

  @Column({
    type: "enum",
    comment: "审核状态",
    default: CommentStatus.pending,
    enum: CommentStatus,
  })
  status?: CommentStatus;

  @OneToMany(() => ChapterReply, (reply) => reply.comment)
  replies?: ChapterReply[];

  @OneToMany(() => ChapterCommentAction, (action) => action.comment)
  actions?: ChapterCommentAction[];
}
