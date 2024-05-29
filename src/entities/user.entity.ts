import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity";
import CrudBaseEntity from "./tools/base-entity";
import { BookComment } from "./book-comment.entity";
import { BookReply } from "./book-reply.entity";
import { BookCommentAction } from "./book-comment-action.entity";
import { BookReplyAction } from "./book-reply-action.entity";
import { ChapterComment } from "./chapter-comment.entity";
import { ChapterReply } from "./chapter-reply.entity";
import { ChapterCommentAction } from "./chapter-comment-action.entity";
import { ChapterReplyAction } from "./chapter-reply-action.entity";

@Entity("user")
export class User extends CrudBaseEntity {
  @PrimaryGeneratedColumn({ comment: "ID" })
  id!: number;

  @Column({ name: "username", type: "varchar", length: 32, comment: "用户名" })
  username!: string;

  @Column({ type: "varchar", length: 255, comment: "密码" })
  password!: string;

  @Column({ type: "varchar", length: 32, comment: "用户昵称" })
  nickname!: string;

  @Column({ type: "varchar", length: 1, nullable: true, comment: "性别" })
  sex?: string;

  @Column({ type: "varchar", length: 11, nullable: true, comment: "联系方式" })
  tel?: string;

  @Column({ type: "varchar", length: 64, nullable: true, comment: "电子邮箱" })
  email?: string;

  @Column({ type: "varchar", length: 255, nullable: true, comment: "联系地址" })
  address?: string;

  @Column({ type: "int", nullable: true, default: 1, comment: "状态" })
  status?: number;

  @Column({ type: "int", nullable: true, comment: "角色ID" })
  role_id?: number;

  @ManyToOne(() => Role)
  @JoinColumn({
    name: "role_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "role_id",
  })
  role?: Role;

  @Column({ type: "int", nullable: true, default: 0, comment: "是否超管" })
  is_super?: number;

  @OneToMany(() => BookComment, (comment) => comment.user)
  book_comments?: BookComment[];

  @OneToMany(() => BookReply, (reply) => reply.user)
  book_replies?: BookReply[];

  @OneToMany(() => BookCommentAction, (action) => action.user)
  book_comment_actions?: BookCommentAction[];

  @OneToMany(() => BookReplyAction, (action) => action.user)
  book_reply_actions?: BookReplyAction[];

  @OneToMany(() => ChapterComment, (comment) => comment.user)
  chapter_comments?: ChapterComment[];

  @OneToMany(() => ChapterReply, (reply) => reply.user)
  chapter_replies?: ChapterReply[];

  @OneToMany(() => ChapterCommentAction, (action) => action.user)
  chapter_comment_actions?: ChapterCommentAction[];

  @OneToMany(() => ChapterReplyAction, (action) => action.user)
  chapter_reply_actions?: ChapterReplyAction[];
}
